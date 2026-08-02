import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    getProfile,
    updateProfile
} from "../controllers/user.controller.js";

const router = express.Router();

// GET PROFILE
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

// UPDATE PROFILE
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

export default router;