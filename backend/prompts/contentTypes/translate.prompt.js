export default (data) => `
Translate the OCR text.

Target Language:

IMPORTANT:
Write the ENTIRE response ONLY in ${data.language}.

Do NOT use English unless the selected language is Eng

OCR:

${data.ocr?.text || "No text detected"}

Requirements:

Maintain the original meaning.

Generate ONLY

{
"translatedText":""
}

Return JSON:
`;