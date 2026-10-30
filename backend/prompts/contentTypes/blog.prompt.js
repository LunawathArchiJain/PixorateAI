export default (data) => `
Write a helpful blog article inspired by the uploaded image.
Platform: ${data.platform}
Tone: ${data.tone}
Language: Write all user-facing text in ${data.language}.
Include a compelling title, introduction, structured body, and conclusion. Do not claim facts that cannot be inferred from the image.
Return only valid JSON: {"title":"","introduction":"","body":"","conclusion":""}
`;
