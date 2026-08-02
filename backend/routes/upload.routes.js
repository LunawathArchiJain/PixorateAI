import express from "express";

import upload from "../middleware/upload.middleware.js";

import authMiddleware from "../middleware/auth.middleware.js";

import { uploadImage } from "../controllers/upload.controller.js";

const router = express.Router();

/*
    POST
    /api/upload
*/

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    uploadImage
);

export default router;