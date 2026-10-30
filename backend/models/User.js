import mongoose from "mongoose";
import { PLATFORMS, TONES, LANGUAGES, CONTENT_TYPES, THEMES } from "../config/options.js";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 60 },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        // Stores the bcrypt hash. Excluded from queries unless explicitly selected.
        password: { type: String, required: true, select: false },
        // Empty, an http(s) URL, or a small data URL.
        avatar: { type: String, default: "" },
        preferences: {
            theme: { type: String, enum: THEMES, default: "light" },
            defaultPlatform: { type: String, enum: PLATFORMS, default: "instagram" },
            defaultTone: { type: String, enum: TONES, default: "professional" },
            defaultLanguage: { type: String, enum: LANGUAGES, default: "English" },
            defaultContentType: { type: String, enum: CONTENT_TYPES, default: "caption" },
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
