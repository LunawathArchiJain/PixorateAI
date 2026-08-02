import express from "express";
import { body } from "express-validator";

import {
    register,
    login,
} from "../controllers/auth.controller.js";

const router = express.Router();

/*
    Register
*/

router.post(
    "/register",
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Enter a valid email"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must contain at least 6 characters"),
    ],
    register
);

/*
    Login
*/

router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .withMessage("Enter a valid email"),

        body("password")
            .notEmpty()
            .withMessage("Password is required"),
    ],
    login
);

export default router;