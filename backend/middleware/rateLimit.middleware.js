import rateLimit from "express-rate-limit";

const skip = () => process.env.NODE_ENV === "test";
const limiter = (options) =>
    rateLimit({ standardHeaders: true, legacyHeaders: false, skip, ...options });

/** Slows down password guessing on login/register. */
export const authLimiter = limiter({
    windowMs: 15 * 60 * 1000,
    limit: Number(process.env.AUTH_RATE_LIMIT) || 30,
    message: { success: false, message: "Too many attempts. Please wait a few minutes and try again." },
});

/** Protects the paid Gemini quota. Keyed per user (the route runs after authentication). */
export const generateLimiter = limiter({
    windowMs: 10 * 60 * 1000,
    limit: Number(process.env.GENERATE_RATE_LIMIT) || 20,
    keyGenerator: (req) => String(req.user?._id ?? "anonymous"),
    message: { success: false, message: "You are generating too quickly. Please wait a few minutes." },
});
