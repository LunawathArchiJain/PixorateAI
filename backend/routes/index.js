import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import historyRoutes from "./history.routes.js";
import generateRoutes from "./generate.routes.js";
import uploadRoutes from "./upload.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/history", historyRoutes);
router.use("/upload", uploadRoutes);
router.use("/generate", generateRoutes);

export default router;