export default (data) => `
Generate a short video script.

Platform:
${data.platform}

Tone:
${data.tone}

Language:
IMPORTANT:
Write the ENTIRE response ONLY in ${data.language}.

Do NOT use English unless the selected language is Eng

Scene:
${JSON.stringify(data.scene,null,2)}

OCR:
${data.ocr.text || "None"}

Knowledge:
${data.context}

Requirements:

- Hook
- Main Content
- Ending
- Call To Action

Generate ONLY

{
"hook":"",
"scene1":"",
"scene2":"",
"ending":""
}

Return ONLY JSON.
`;