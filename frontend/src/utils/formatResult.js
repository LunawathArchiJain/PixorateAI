const lines = (title, value) => (value && String(value).trim() ? [`${title}`, String(value).trim(), ""] : []);
const list = (title, values) => (values?.length ? [`${title}`, values.join(" "), ""] : []);

/** Plain-text version of a result, used by Copy and Download. */
export function resultToText(type, d = {}) {
    const parts = {
        caption: () => [...lines("Caption", d.caption), ...list("Hashtags", d.hashtags), ...lines("Call to action", d.callToAction), ...lines("Scene", d.sceneDescription)],
        blog: () => [...lines("Title", d.title), ...lines("Introduction", d.introduction), ...lines("Body", d.body), ...lines("Conclusion", d.conclusion)],
        script: () => [...lines("Title", d.title), ...lines("Hook", d.hook), ...lines("Script", d.script), ...lines("Call to action", d.callToAction)],
        hashtags: () => list("Hashtags", d.hashtags),
        summary: () => [...lines("Summary", d.summary), ...(d.keyPoints?.length ? ["Key points", ...d.keyPoints.map((p) => `- ${p}`), ""] : []), ...lines("Scene", d.sceneDescription)],
        seo: () => [...lines("SEO title", d.title), ...lines("Meta description", d.metaDescription), ...list("Keywords", d.keywords), ...lines("Alt text", d.altText)],
        rewrite: () => lines("Rewritten text", d.rewrittenText),
        translate: () => lines("Translated text", d.translatedText),
    };
    return (parts[type]?.() ?? [JSON.stringify(d, null, 2)]).join("\n").trim();
}
