import fs from "fs";
import mime from "mime-types";
import ai from "../config/gemini.js";

export const generateWithGemini = async (imagePath, prompt) => {
    try {

        // Read image
        const imageBuffer = fs.readFileSync(imagePath);

        const mimeType =
            mime.lookup(imagePath) || "image/jpeg";

        const imageBase64 =
            imageBuffer.toString("base64");

        // Gemini API
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType,
                                data: imageBase64
                            }
                        },
                        {
                            text: prompt
                        }
                    ]
                }
            ],
            config: {
                temperature: 0.7,
                responseMimeType: "application/json"
            }
        });

        console.log("========== GEMINI RESPONSE ==========");
        console.log(response.text);
        console.log("=====================================");

        let output = response.text.trim();

        output = output
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(output);

    } catch (error) {

        console.error("Gemini Service Error:");
        console.error(error);

        throw new Error("Gemini content generation failed.");
    }
};