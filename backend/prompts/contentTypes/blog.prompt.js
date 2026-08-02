export default (data) => `
Write a complete blog article.

Platform:
${data.platform}

Tone:
${data.tone}

Language:

IMPORTANT:
Write the ENTIRE response ONLY in ${data.language}.

Do NOT use English unless the selected language is English.

Image Analysis:
${JSON.stringify(data.scene,null,2)}

OCR:
${data.ocr.text || "No text"}

Retrieved Knowledge:
${data.context}

Requirements:

- Attractive title
- Introduction
- Body
- Conclusion
- SEO optimized
- Human readable

Generate ONLY

{
"title":"",
"introduction":"",
"body":"",
"conclusion":""
}

Return ONLY JSON.
`;