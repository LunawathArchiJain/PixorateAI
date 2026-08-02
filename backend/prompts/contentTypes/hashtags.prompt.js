export default (data) => `
Generate highly relevant hashtags.

Platform:
${data.platform}

Tone:
${data.tone}

Scene:
${JSON.stringify(data.scene,null,2)}

Knowledge:
${data.context}

Requirements:

Generate 25 hashtags.

Generate ONLY

{
"hashtags":[]
}

Return JSON:
`;