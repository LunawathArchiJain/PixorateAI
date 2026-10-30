import express from "express";
import upload from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { generateLimiter } from "../middleware/rateLimit.middleware.js";
import { generate } from "../controllers/generate.controller.js";

const router = express.Router();

router.post("/", authMiddleware, generateLimiter, upload.single("image"), generate);

export default router;
