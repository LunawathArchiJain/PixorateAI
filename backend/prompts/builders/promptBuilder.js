import fs from "fs";

import captionPrompt from "../actions/caption.prompt.js";
import blogPrompt from "../actions/blog.prompt.js";
import scriptPrompt from "../actions/script.prompt.js";
import hashtagsPrompt from "../actions/hashtags.prompt.js";
import summaryPrompt from "../actions/summary.prompt.js";
import rewritePrompt from "../actions/rewrite.prompt.js";
import translatePrompt from "../actions/translate.prompt.js";
import seoPrompt from "../actions/seo.prompt.js";

const systemPrompt = fs.readFileSync(
    "./prompts/systemPrompt.txt",
    "utf8"
);

export const buildPrompt = (contentType, data) => {

    let actionPrompt;

    switch (contentType) {

        case "blog":
            actionPrompt = blogPrompt(data);
            break;

        case "script":
            actionPrompt = scriptPrompt(data);
            break;

        case "hashtags":
            actionPrompt = hashtagsPrompt(data);
            break;

        case "summary":
            actionPrompt = summaryPrompt(data);
            break;

        case "rewrite":
            actionPrompt = rewritePrompt(data);
            break;

        case "translate":
            actionPrompt = translatePrompt(data);
            break;

        case "seo":
            actionPrompt = seoPrompt(data);
            break;

        case "caption":
        default:
            actionPrompt = captionPrompt(data);
    }

    return `${systemPrompt}\n\n${actionPrompt}`;
};