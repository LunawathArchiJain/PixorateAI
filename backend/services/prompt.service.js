import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import captionPrompt from "../prompts/contentTypes/caption.prompt.js";
import blogPrompt from "../prompts/contentTypes/blog.prompt.js";
import seoPrompt from "../prompts/contentTypes/seo.prompt.js";
import scriptPrompt from "../prompts/contentTypes/script.prompt.js";
import hashtagsPrompt from "../prompts/contentTypes/hashtags.prompt.js";
import rewritePrompt from "../prompts/contentTypes/rewrite.prompt.js";
import summaryPrompt from "../prompts/contentTypes/summary.prompt.js";
import translatePrompt from "../prompts/contentTypes/translate.prompt.js";
import { PLATFORMS, TONES, LANGUAGES, CONTENT_TYPES, HASHTAG_RULES } from "../config/options.js";
import httpError from "../utils/httpError.js";

const PROMPTS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../prompts");
const TASKS = {
    caption: captionPrompt,
    blog: blogPrompt,
    seo: seoPrompt,
    script: scriptPrompt,
    hashtags: hashtagsPrompt,
    summary: summaryPrompt,
    rewrite: rewritePrompt,
    translate: translatePrompt,
};

const read = (...parts) => fs.readFileSync(path.join(PROMPTS_DIR, ...parts), "utf8").replace(/\r\n/g, "\n").trim();

// Loaded once at startup. If any option is missing its prompt file the server refuses to start,
// instead of failing later for one unlucky user.
const SYSTEM = read("systemPrompt.txt");
const PLATFORM_TEXT = Object.fromEntries(PLATFORMS.map((id) => [id, read("platforms", `${id}.txt`)]));
const TONE_TEXT = Object.fromEntries(TONES.map((id) => [id, read("tones", `${id}.txt`)]));
for (const type of CONTENT_TYPES) {
    if (!TASKS[type]) throw new Error(`No prompt builder registered for content type "${type}".`);
}

const pick = (list, value, label) => {
    const match = list.find((item) => item.toLowerCase() === String(value).trim().toLowerCase());
    if (!match) throw httpError(400, `Unsupported ${label}: ${value}. Allowed: ${list.join(", ")}.`);
    return match;
};

/** Validates the four user selections (applying defaults) and returns their canonical spelling. */
export function normalizeGenerationOptions(input = {}) {
    return {
        platform: pick(PLATFORMS, input.platform || "instagram", "platform"),
        tone: pick(TONES, input.tone || "professional", "tone"),
        language: pick(LANGUAGES, input.language || "English", "language"),
        contentType: pick(CONTENT_TYPES, input.contentType || "caption", "content type"),
    };
}

/** Assembles the full Gemini prompt for a set of (already valid or raw) selections. */
export function buildPrompt(data = {}) {
    const options = normalizeGenerationOptions(data);
    const task = TASKS[options.contentType]({ ...options, hashtagRange: HASHTAG_RULES[options.platform] });
    return [
        SYSTEM,
        `SELECTED PLATFORM (${options.platform})\n${PLATFORM_TEXT[options.platform]}`,
        `SELECTED TONE (${options.tone})\n${TONE_TEXT[options.tone]}`,
        `SELECTED LANGUAGE: ${options.language}`,
        `SELECTED CONTENT TYPE: ${options.contentType}`,
        task,
    ].join("\n\n---\n\n");
}
