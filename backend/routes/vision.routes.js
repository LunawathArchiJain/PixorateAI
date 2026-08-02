import express from "express";

import upload from "../middleware/upload.middleware.js";
import { analyzeImage } from "../services/vision.service.js";

const router = express.Router();
router.post("/", upload.single("image"), async (req,res)=>{
    try {
        const result = await analyzeImage(req.file.path);
        res.json(result);
    } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }
);

export default router;