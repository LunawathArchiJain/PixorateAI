import httpError from "../utils/httpError.js";

const text = (value) => {
    if (Array.isArray(value)) return value.map(text).filter(Boolean).join("\n");
    if (value && typeof value === "object") return Object.values(value).map(text).filter(Boolean).join("\n");
    return value == null ? "" : String(value).trim();
};
const list = (value) => (Array.isArray(value) ? value : typeof value === "string" ? value.split(/[,\n]/) : []).map(text).filter(Boolean);
const tags = (value) => [...new Set(list(value).map((tag) => `#${tag.replace(/^#+/, "").replace(/\s+/g, "")}`).filter((tag) => tag.length > 1))];

// For each content type: the exact shape the frontend renders, and which field must not be empty.
const SHAPES = {
    caption: (r) => ({ sceneDescription: text(r.sceneDescription), caption: text(r.caption), hashtags: tags(r.hashtags), emojiSuggestions: list(r.emojiSuggestions), callToAction: text(r.callToAction) }),
    blog: (r) => ({ title: text(r.title), introduction: text(r.introduction), body: text(r.body), conclusion: text(r.conclusion) }),
    script: (r) => ({ title: text(r.title), hook: text(r.hook), script: text(r.script), callToAction: text(r.callToAction) }),
    hashtags: (r) => ({ hashtags: tags(r.hashtags) }),
    summary: (r) => ({ sceneDescription: text(r.sceneDescription), summary: text(r.summary), keyPoints: list(r.keyPoints) }),
    seo: (r) => ({ title: text(r.title), metaDescription: text(r.metaDescription), keywords: list(r.keywords), altText: text(r.altText) }),
    rewrite: (r) => ({ rewrittenText: text(r.rewrittenText) }),
    translate: (r) => ({ translatedText: text(r.translatedText) }),
};
const REQUIRED = { caption: "caption", blog: "body", script: "script", hashtags: "hashtags", summary: "summary", seo: "metaDescription", rewrite: "rewrittenText", translate: "translatedText" };

/** Coerces Gemini's JSON into the contract the UI expects, so a slightly-off reply can never crash the page. */
export function normalizeResult(contentType, raw) {
    const source = Array.isArray(raw) ? raw[0] : raw;
    if (!source || typeof source !== "object") throw httpError(502, "The AI returned an unreadable response. Please try again.");
    const shaped = SHAPES[contentType](source);
    const required = shaped[REQUIRED[contentType]];
    if (!required || (Array.isArray(required) && required.length === 0)) {
        throw httpError(502, "The AI returned an empty result. Please try again.");
    }
    return shaped;
}
