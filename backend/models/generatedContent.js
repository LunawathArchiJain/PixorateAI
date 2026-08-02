import mongoose from "mongoose";

const generatedContentSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        imagePath: {
            type: String,
            required: true
        },

        platform: {
            type: String,
            required: true
        },

        tone: {
            type: String,
            required: true
        },

        language: {
            type: String,
            default: "English"
        },

        contentType: {
            type: String,
            default: "caption"
        },

        generatedContent: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }

    },
    {
        timestamps: true
    }
);

const GeneratedContent =
    mongoose.models.GeneratedContent ||
    mongoose.model("GeneratedContent", generatedContentSchema);

export default GeneratedContent;