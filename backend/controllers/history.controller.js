import mongoose from "mongoose";
import GeneratedContent from "../models/GeneratedContent.js";
import { CONTENT_TYPES } from "../config/options.js";
import httpError from "../utils/httpError.js";

/** GET /api/history?limit=20&page=1&contentType=caption */
export const getHistory = async (req, res, next) => {
    try {
        const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 20, 1), 100);
        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
        const filter = { user: req.user._id };
        if (req.query.contentType) {
            if (!CONTENT_TYPES.includes(req.query.contentType)) throw httpError(400, "Unsupported content type filter.");
            filter.contentType = req.query.contentType;
        }

        const [history, total] = await Promise.all([
            GeneratedContent.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)
                .select("imageName thumbnail platform tone language contentType generatedContent createdAt"),
            GeneratedContent.countDocuments(filter),
        ]);
        return res.json({ success: true, count: history.length, total, page, pages: Math.max(Math.ceil(total / limit), 1), history });
    } catch (error) {
        return next(error);
    }
};

/** DELETE /api/history/:id */
export const deleteHistoryItem = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) throw httpError(400, "Invalid history id.");
        const removed = await GeneratedContent.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!removed) throw httpError(404, "History item not found.");
        return res.json({ success: true, message: "History item deleted." });
    } catch (error) {
        return next(error);
    }
};

/** DELETE /api/history */
export const clearHistory = async (req, res, next) => {
    try {
        const { deletedCount } = await GeneratedContent.deleteMany({ user: req.user._id });
        return res.json({ success: true, message: "History cleared.", deletedCount });
    } catch (error) {
        return next(error);
    }
};
