export default (data) => `
Summarize the uploaded image.

Platform:
${data.platform}

Tone:
${data.tone}

IMPORTANT:
Write the ENTIRE response ONLY in ${data.language}.

Do NOT use English unless the selected language is English.

Image Analysis:
${JSON.stringify(data.scene || {}, null, 2)}

OCR:
${data.ocr?.text || "No text detected"}

Requirements:

Keep summary under 120 words.

Generate ONLY

{
"summary":""
}

Return JSON:
`;