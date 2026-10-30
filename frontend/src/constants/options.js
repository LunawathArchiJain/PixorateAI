// Mirrors backend/config/options.js. `npm test` in the backend fails if the ids drift apart.

export const CONTENT_TYPES = [
    { id: "caption", label: "Caption", hint: "Hook, caption, hashtags and a call to action" },
    { id: "blog", label: "Blog post", hint: "Title, introduction, body and conclusion" },
    { id: "script", label: "Video script", hint: "Hook, script and a closing call to action" },
    { id: "hashtags", label: "Hashtags", hint: "A focused set for the chosen platform" },
    { id: "summary", label: "Summary", hint: "A short description with key points" },
    { id: "translate", label: "Translation", hint: "Translates any text found in the image" },
    { id: "rewrite", label: "Rewrite", hint: "Rewrites any text found in the image" },
    { id: "seo", label: "SEO", hint: "Title, meta description, keywords, alt text" },
];

export const PLATFORMS = [
    { id: "instagram", label: "Instagram" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "twitter", label: "X (Twitter)" },
    { id: "facebook", label: "Facebook" },
    { id: "youtube", label: "YouTube" },
    { id: "pinterest", label: "Pinterest" },
    { id: "website", label: "Website" },
    { id: "product", label: "Product" },
];

export const TONES = [
    { id: "professional", label: "Professional" },
    { id: "friendly", label: "Friendly" },
    { id: "casual", label: "Casual" },
    { id: "marketing", label: "Marketing" },
    { id: "persuasive", label: "Persuasive" },
    { id: "funny", label: "Funny" },
    { id: "storytelling", label: "Storytelling" },
    { id: "genZ", label: "Gen Z" },
    { id: "luxury", label: "Luxury" },
    { id: "minimal", label: "Minimal" },
];

export const LANGUAGES = ["English", "Hindi", "Telugu", "Spanish", "French"];

export const DEFAULT_OPTIONS = {
    contentType: "caption",
    platform: "instagram",
    tone: "professional",
    language: "English",
};

export const labelOf = (list, id) => list.find((item) => item.id === id)?.label ?? id;

export const MAX_IMAGE_MB = 5;
