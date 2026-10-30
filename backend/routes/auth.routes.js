import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

// Trim + lowercase first, then validate. (normalizeEmail() would strip dots from Gmail addresses
// and lock out existing accounts; validating before trimming rejects autofilled "name@x.com ".)
const email = body("email")
    .customSanitizer((value) => String(value ?? "").trim().toLowerCase())
    .isEmail()
    .withMessage("Enter a valid email");

router.post(
    "/register",
    authLimiter,
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 60 }).withMessage("Name must be 60 characters or fewer"),
    email,
    body("password").isString().isLength({ min: 6, max: 128 }).withMessage("Password must be 6-128 characters"),
    validate,
    register
);

router.post("/login", authLimiter, email, body("password").notEmpty().withMessage("Password is required"), validate, login);

export default router;
