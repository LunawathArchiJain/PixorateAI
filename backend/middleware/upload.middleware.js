import multer from "multer";
import httpError from "../utils/httpError.js";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

/** Keeps the image in memory: it is sent to Gemini and never written to disk. */
export default multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024, files: 1, fieldSize: 200 * 1024 },
    fileFilter: (_req, file, cb) =>
        ALLOWED.has(file.mimetype)
            ? cb(null, true)
            : cb(httpError(400, "Only JPG, PNG, and WEBP images are allowed.")),
});
