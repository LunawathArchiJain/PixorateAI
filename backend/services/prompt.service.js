import fs from "fs";
import path from "path";

import captionPrompt from "../prompts/contentTypes/caption.prompt.js";
import blogPrompt from "../prompts/contentTypes/blog.prompt.js";
import seoPrompt from "../prompts/contentTypes/seo.prompt.js";
import scriptPrompt from "../prompts/contentTypes/script.prompt.js";
import hashtagsPrompt from "../prompts/contentTypes/hashtags.prompt.js";
import rewritePrompt from "../prompts/contentTypes/rewrite.prompt.js";
import summaryPrompt from "../prompts/contentTypes/summary.prompt.js";
import translatePrompt from "../prompts/contentTypes/translate.prompt.js";

const loadText = (folder, file) => {
    return fs.readFileSync(
        path.join(process.cwd(),"prompts",folder,`${file}.txt`),
        "utf8"
    );
};

export const buildPrompt = (data)=>{

    const systemPrompt = fs.readFileSync(
        path.join(process.cwd(),"prompts","systemPrompt.txt"),
        "utf8"
    );

    const platformPrompt = loadText(
        "platforms",
        data.platform
    );

    const tonePrompt = loadText(
        "tones",
        data.tone
    );

    let taskPrompt="";

    switch(data.contentType){

        case "caption":
            taskPrompt=captionPrompt(data);
            break;

        case "blog":
            taskPrompt=blogPrompt(data);
            break;

        case "seo":
            taskPrompt=seoPrompt(data);
            break;

        case "script":
            taskPrompt=scriptPrompt(data);
            break;

        case "hashtags":
            taskPrompt=hashtagsPrompt(data);
            break;

        case "summary":
            taskPrompt=summaryPrompt(data);
            break;

        case "rewrite":
            taskPrompt=rewritePrompt(data);
            break;

        case "translate":
            taskPrompt=translatePrompt(data);
            break;

        default:
            taskPrompt=captionPrompt(data);

    }

    return `
${systemPrompt}

=====================================

PLATFORM

${platformPrompt}

=====================================

TONE

${tonePrompt}

=====================================

${taskPrompt}
`;
}