/**
 * Single source of truth for every selectable option.
 * The frontend mirrors these in frontend/src/constants/options.js;
 * `npm test` fails if the two lists drift apart.
 */
export const PLATFORMS = ["instagram", "linkedin", "twitter", "facebook", "youtube", "pinterest", "website", "product"];
export const TONES = ["professional", "friendly", "casual", "marketing", "persuasive", "funny", "storytelling", "genZ", "luxury", "minimal"];
export const LANGUAGES = ["English", "Hindi", "Telugu", "Spanish", "French"];
export const CONTENT_TYPES = ["caption", "blog", "script", "hashtags", "summary", "translate", "rewrite", "seo"];
export const THEMES = ["light", "dark"];

/** How many hashtags each platform expects: [min, max] inside a caption, and for the hashtag-only content type. */
export const HASHTAG_RULES = {
    instagram: { caption: [8, 15], list: [15, 25] },
    facebook: { caption: [3, 6], list: [5, 10] },
    linkedin: { caption: [3, 5], list: [5, 8] },
    twitter: { caption: [1, 3], list: [3, 5] },
    youtube: { caption: [8, 12], list: [10, 15] },
    pinterest: { caption: [3, 5], list: [8, 12] },
    website: { caption: [5, 8], list: [10, 15] },
    product: { caption: [5, 8], list: [10, 15] },
};
