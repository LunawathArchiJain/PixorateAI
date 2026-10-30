export default (data) => `
Summarize the uploaded image and any readable text.
Platform: ${data.platform}
Tone: ${data.tone}
Language: Write all user-facing text in ${data.language}.
Keep the summary under 120 words, describe only visible details, and do not invent facts.
Return only valid JSON with this shape: {"sceneDescription":"","summary":"","keyPoints":[]}
`;
