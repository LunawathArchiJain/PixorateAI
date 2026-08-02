import fs from "fs";
import path from "path";

export const loadKnowledge = (baseFolder) => {

    const documents = [];
    const categories = fs.readdirSync(baseFolder);

    categories.forEach(category => {
        const categoryPath = path.join(baseFolder, category);
        const files = fs.readdirSync(categoryPath);
        files.forEach(file => {
            if (!file.endsWith(".md")) return;
            const filePath = path.join(categoryPath, file);
            const content = fs.readFileSync(filePath, "utf-8");
            documents.push({
                category,
                filename: file,
                content
            });
        });
    });
    return documents;
};