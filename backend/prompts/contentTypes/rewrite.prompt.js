export default (data) => `
Read any legible text in the uploaded image and rewrite it for clarity in ${data.language}, using a ${data.tone} tone. Preserve the original meaning and do not add facts. If no text is legible, clearly state that in the selected language.
Return only valid JSON: {"rewrittenText":""}
`;
