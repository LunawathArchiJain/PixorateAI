import GeneratedContent from "../models/GeneratedContent.js";
import { buildPrompt, normalizeGenerationOptions } from "../services/prompt.service.js";
import { generateWithGemini } from "../services/gemini.service.js";
import { normalizeResult } from "../services/result.service.js";
import { cleanThumbnail, detectImageType } from "../utils/image.js";
import httpError from "../utils/httpError.js";

export const generate = async (req, res, next) => {
    try {
        if (!req.file) throw httpError(400, "Please upload an image.");
        const options = normalizeGenerationOptions(req.body);

        const mimeType = detectImageType(req.file.buffer);
        if (!mimeType) throw httpError(400, "The file is not a valid JPG, PNG, or WEBP image.");

        const raw = await generateWithGemini({ buffer: req.file.buffer, mimeType, prompt: buildPrompt(options) });
        const generatedContent = normalizeResult(options.contentType, raw);

        // A failed save should not throw away content the user already waited for.
        let saved = null;
        try {
            saved = await GeneratedContent.create({
                user: req.user._id,
                imageName: String(req.file.originalname || "").slice(0, 120),
                thumbnail: cleanThumbnail(req.body.thumbnail) || "",
                ...options,
                generatedContent,
            });
        } catch (saveError) {
            console.error("Could not save generation history:", saveError.message);
        }

        return res.status(200).json({
            success: true,
            generationId: saved?._id ?? null,
            contentType: options.contentType,
            generatedContent,
            createdAt: saved?.createdAt ?? new Date().toISOString(),
        });
    } catch (error) {
        return next(error);
    }
};
