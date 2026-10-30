export default (data) => `
Create a platform-appropriate caption based on the uploaded image.
Platform: ${data.platform}
Tone: ${data.tone}
Language: Write all user-facing text in ${data.language}.
Start with a strong hook where appropriate. Never describe objects or events that are not visible. Include a clear CTA if it fits.
Hashtags: provide ${data.hashtagRange.caption[0]}-${data.hashtagRange.caption[1]} relevant hashtags, each starting with #.
${data.platform === "twitter" ? "The caption itself must be at most 240 characters so the hashtags still fit in one post.\n" : ""}Return only valid JSON: {"sceneDescription":"","caption":"","hashtags":[],"emojiSuggestions":[],"callToAction":""}
`;
