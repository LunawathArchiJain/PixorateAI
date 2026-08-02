export default (data) => `
Rewrite the detected OCR text.

Tone:
${data.tone}

Language:
IMPORTANT:
Write the ENTIRE response ONLY in ${data.language}.

Do NOT use English unless the selected language is Eng

OCR:

${data.ocr.text}

Knowledge:

${data.context}

Requirements:

Improve readability while preserving meaning.

Return JSON:

{
"rewrittenText":""
}
`;