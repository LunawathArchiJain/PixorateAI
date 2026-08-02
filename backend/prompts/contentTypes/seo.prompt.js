export default (data) => `
Generate SEO metadata.

Scene:
${JSON.stringify(data.scene,null,2)}

OCR:
${data.ocr.text || "None"}

Knowledge:
${data.context}

Requirements:

Generate:

- SEO Title
- Meta Description
- Keywords
- Alt Text

Generate ONLY

{
"title":"",
"metaDescription":"",
"keywords":[],
"altText":""
}

Return ONLY JSON.
`;