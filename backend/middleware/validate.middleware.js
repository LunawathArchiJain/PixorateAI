import { validationResult } from "express-validator";

/** Turns express-validator results into one consistent 400 response with a readable `message`. */
export default function validate(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) return next();
    const errors = result.array().map((error) => ({ field: error.path, message: error.msg }));
    return res.status(400).json({ success: false, message: errors[0].message, errors });
}
