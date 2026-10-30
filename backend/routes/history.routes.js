import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getHistory, deleteHistoryItem, clearHistory } from "../controllers/history.controller.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getHistory);
router.delete("/", clearHistory);
router.delete("/:id", deleteHistoryItem);

export default router;
