import fs from "fs";
import GeneratedContent from "../models/generatedContent.js";

import { buildPrompt } from "../services/prompt.service.js";
import { generateWithGemini } from "../services/gemini.service.js";

export const generate = async (req, res) => {
    try {
        // Check image
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            });
        }

        const {
            platform = "instagram",
            tone = "professional",
            language = "English",
            contentType = "caption"
        } = req.body;

        // Build Prompt
        const prompt = buildPrompt({
            platform,
            tone,
            language,
            contentType
        });

        // Generate with Gemini
        const generatedContent = await generateWithGemini(
            req.file.path,
            prompt
        );

        // Save generation
        const savedGeneration = await GeneratedContent.create({
            user: req.user._id,
            imagePath: req.file.path,
            platform,
            tone,
            language,
            contentType,
            generatedContent
        });

        // Delete uploaded image after processing (optional)
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(200).json({
            success: true,
            generationId: savedGeneration._id,
            generatedContent
        });
    } catch (error) {
        console.error("Generate Controller Error:", error);
        // Delete image if an error occurs
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Content generation failed."
        });
    }
};