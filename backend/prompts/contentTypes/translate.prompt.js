export default (data) => `
Read any legible text in the uploaded image and translate it into ${data.language}. If no text is visible, say so in the target language rather than inventing text. Preserve meaning, names, numbers, and formatting where possible.
Return only valid JSON: {"translatedText":""}
`;
