import express from "express";
import { body } from "express-validator";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import { getProfile, updateProfile, updatePreferences, changePassword, deleteAccount } from "../controllers/user.controller.js";
import { PLATFORMS, TONES, LANGUAGES, CONTENT_TYPES, THEMES } from "../config/options.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/profile", getProfile);

router.put(
    "/profile",
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty").isLength({ max: 60 }).withMessage("Name must be 60 characters or fewer"),
    validate,
    updateProfile
);

router.put(
    "/preferences",
    body("theme").optional().isIn(THEMES).withMessage(`Theme must be one of: ${THEMES.join(", ")}`),
    body("defaultPlatform").optional().isIn(PLATFORMS).withMessage("Unsupported default platform"),
    body("defaultTone").optional().isIn(TONES).withMessage("Unsupported default tone"),
    body("defaultLanguage").optional().isIn(LANGUAGES).withMessage("Unsupported default language"),
    body("defaultContentType").optional().isIn(CONTENT_TYPES).withMessage("Unsupported default content type"),
    validate,
    updatePreferences
);

router.put(
    "/password",
    authLimiter,
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword").isString().isLength({ min: 6, max: 128 }).withMessage("New password must be 6-128 characters"),
    body("newPassword").custom((value, { req }) => value !== req.body.currentPassword).withMessage("New password must be different from the current one"),
    validate,
    changePassword
);

router.delete("/account", authLimiter, body("password").notEmpty().withMessage("Password is required"), validate, deleteAccount);

export default router;
