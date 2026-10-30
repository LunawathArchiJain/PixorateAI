export default (data) => `
Create a concise, usable video script based on the uploaded image.
Platform: ${data.platform}
Tone: ${data.tone}
Language: Write all user-facing text in ${data.language}.
Describe only visible details; do not invent facts.
Include a compelling title, an opening hook, a short script, and a closing call to action.
Return only valid JSON with exactly this shape:
{"title":"","script":""}
`;
