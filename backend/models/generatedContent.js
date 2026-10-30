import mongoose from "mongoose";

const generatedContentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        // The uploaded image is not stored. Only its original name and a small preview are kept.
        imageName: { type: String, default: "" },
        thumbnail: { type: String, default: "" },
        platform: { type: String, required: true },
        tone: { type: String, required: true },
        language: { type: String, default: "English" },
        contentType: { type: String, default: "caption" },
        generatedContent: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    { timestamps: true }
);

// History is always read per user, newest first, optionally filtered by content type.
// The first index also serves lookups by user alone, so `user` needs no index of its own.
generatedContentSchema.index({ user: 1, createdAt: -1 });
generatedContentSchema.index({ user: 1, contentType: 1, createdAt: -1 });

export default mongoose.models.GeneratedContent || mongoose.model("GeneratedContent", generatedContentSchema);
