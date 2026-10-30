import ai from "../config/gemini.js";
import httpError from "../utils/httpError.js";

const DEFAULT_MODEL = "gemini-3.8-flash";
const DEFAULT_FALLBACK = "gemini-3.5-flash-lite";
const TRANSIENT = new Set([500, 503, 504]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Extracts an HTTP-like status from the different shapes the SDK may throw. */
const statusOf = (error) => {
    const candidate = Number(error?.status ?? error?.statusCode ?? error?.code);
    if (candidate >= 400 && candidate < 600) return candidate;
    const text = String(error?.message || "");
    if (/no longer available|not found|NOT_FOUND/i.test(text)) return 404;
    if (/RESOURCE_EXHAUSTED|quota|rate limit/i.test(text)) return 429;
    if (/UNAVAILABLE|overloaded/i.test(text)) return 503;
    if (/API key|PERMISSION_DENIED|UNAUTHENTICATED/i.test(text)) return 403;
    return 0;
};

/** Parses Gemini's reply even if it is wrapped in code fences or has stray text around the JSON. */
export function parseModelJson(text) {
    const cleaned = String(text || "").replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    if (!cleaned) return null;
    try {
        return JSON.parse(cleaned);
    } catch {
        const start = cleaned.indexOf("{");
        const end = cleaned.lastIndexOf("}");
        if (start === -1 || end <= start) return null;
        try {
            return JSON.parse(cleaned.slice(start, end + 1));
        } catch {
            return null;
        }
    }
}

async function callModel(model, buffer, mimeType, prompt) {
    const response = await ai.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ inlineData: { mimeType, data: buffer.toString("base64") } }, { text: prompt }] }],
        config: { temperature: 0.7, responseMimeType: "application/json" },
    });
    const parsed = parseModelJson(response.text);
    if (parsed) return parsed;
    const blocked = response.promptFeedback?.blockReason || response.candidates?.[0]?.finishReason === "SAFETY";
    throw httpError(
        blocked ? 422 : 502,
        blocked
            ? "The AI could not process this image (blocked by safety filters). Try a different image."
            : "The AI returned an unreadable response. Please try again."
    );
}

/**
 * Sends the image + prompt to Gemini and returns the parsed JSON object.
 * Retries transient errors, then falls back to GEMINI_FALLBACK_MODEL if the primary model is
 * unavailable (404), rate limited (429) or still failing (5xx).
 */
export async function generateWithGemini({ buffer, mimeType, prompt }) {
    const models = [
        ...new Set([process.env.GEMINI_MODEL || DEFAULT_MODEL, process.env.GEMINI_FALLBACK_MODEL || DEFAULT_FALLBACK]),
    ];
    let lastStatus = 0;

    for (const model of models) {
        for (let attempt = 1; attempt <= 2; attempt += 1) {
            try {
                return await callModel(model, buffer, mimeType, prompt);
            } catch (error) {
                if (error.expose) throw error; // our own user-facing error (blocked image, unreadable reply)
                lastStatus = statusOf(error);
                console.error(`Gemini error (model=${model}, attempt=${attempt}, status=${lastStatus}):`, error.message);
                if (TRANSIENT.has(lastStatus) && attempt < 2) {
                    await sleep(process.env.NODE_ENV === "test" ? 0 : 800);
                    continue;
                }
                break; // try the next model
            }
        }
    }

    if (lastStatus === 429) throw httpError(429, "The AI service is busy or over quota. Please try again in a minute.");
    if (lastStatus === 400 || lastStatus === 401 || lastStatus === 403) {
        throw httpError(502, "The AI service rejected the request. Check GEMINI_API_KEY and GEMINI_MODEL on the server.");
    }
    throw httpError(502, "The AI service is unavailable right now. Please try again shortly.");
}
