import bcrypt from "bcrypt";
import User from "../models/User.js";
import GeneratedContent from "../models/GeneratedContent.js";
import { serializeUser } from "../utils/serializeUser.js";
import { isValidAvatar } from "../utils/image.js";
import httpError from "../utils/httpError.js";

/** GET /api/user/profile */
export const getProfile = async (req, res, next) => {
    try {
        const [totalGenerations, latest] = await Promise.all([
            GeneratedContent.countDocuments({ user: req.user._id }),
            GeneratedContent.findOne({ user: req.user._id }).sort({ createdAt: -1 }).select("createdAt"),
        ]);
        return res.json({
            success: true,
            user: serializeUser(req.user),
            stats: { totalGenerations, lastGeneratedAt: latest?.createdAt ?? null },
        });
    } catch (error) {
        return next(error);
    }
};

/** PUT /api/user/profile  { name?, avatar? } */
export const updateProfile = async (req, res, next) => {
    try {
        const { name, avatar } = req.body;
        if (name === undefined && avatar === undefined) throw httpError(400, "Nothing to update.");
        if (avatar !== undefined && !isValidAvatar(avatar)) {
            throw httpError(400, "Avatar must be an http(s) link or a small JPG, PNG, or WEBP image.");
        }

        const user = await User.findById(req.user._id);
        if (!user) throw httpError(404, "User not found");
        if (name !== undefined) user.name = name;
        if (avatar !== undefined) user.avatar = avatar;
        await user.save();

        return res.json({ success: true, message: "Profile updated", user: serializeUser(user) });
    } catch (error) {
        return next(error);
    }
};

/** PUT /api/user/preferences  { theme?, defaultPlatform?, defaultTone?, defaultLanguage?, defaultContentType? } */
export const updatePreferences = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) throw httpError(404, "User not found");
        for (const key of ["theme", "defaultPlatform", "defaultTone", "defaultLanguage", "defaultContentType"]) {
            if (req.body[key] !== undefined) user.set(`preferences.${key}`, req.body[key]);
        }
        await user.save();
        return res.json({ success: true, message: "Preferences saved", user: serializeUser(user) });
    } catch (error) {
        return next(error);
    }
};

/** PUT /api/user/password  { currentPassword, newPassword } */
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select("+password");
        if (!user) throw httpError(404, "User not found");
        if (!(await bcrypt.compare(currentPassword, user.password))) throw httpError(400, "Current password is incorrect");

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.json({ success: true, message: "Password changed" });
    } catch (error) {
        return next(error);
    }
};

/** DELETE /api/user/account  { password } — removes the user and all their history. */
export const deleteAccount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("+password");
        if (!user) throw httpError(404, "User not found");
        if (!(await bcrypt.compare(req.body.password, user.password))) throw httpError(400, "Password is incorrect");

        await GeneratedContent.deleteMany({ user: user._id });
        await User.deleteOne({ _id: user._id });
        return res.json({ success: true, message: "Account deleted" });
    } catch (error) {
        return next(error);
    }
};
