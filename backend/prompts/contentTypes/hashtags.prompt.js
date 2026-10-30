export default (data) => `
Generate ${data.hashtagRange.list[0]}-${data.hashtagRange.list[1]} relevant hashtags for the uploaded image.
Platform: ${data.platform}
Tone: ${data.tone}
Language: ${data.language}
Use specific, relevant tags; avoid misleading or unrelated trending tags. Return each hashtag as a string beginning with #, with no spaces inside a tag.
Return only valid JSON: {"hashtags":[]}
`;
