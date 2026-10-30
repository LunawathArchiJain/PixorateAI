export default (data) => `
Generate useful SEO metadata for content based on the uploaded image.
Platform: ${data.platform}
Tone: ${data.tone}
Language: Write all user-facing text in ${data.language}.
Use relevant, natural keywords. Do not make unsupported claims.
Return only valid JSON: {"title":"","metaDescription":"","keywords":[],"altText":""}
`;
