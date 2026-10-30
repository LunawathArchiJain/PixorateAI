import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import historyRoutes from "./history.routes.js";
import generateRoutes from "./generate.routes.js";
import { PLATFORMS, TONES, LANGUAGES, CONTENT_TYPES, THEMES } from "../config/options.js";

const router = express.Router();

router.get("/options", (_req, res) =>
    res.json({ success: true, platforms: PLATFORMS, tones: TONES, languages: LANGUAGES, contentTypes: CONTENT_TYPES, themes: THEMES })
);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/history", historyRoutes);
router.use("/generate", generateRoutes);

export default router;
