import jwt from "jsonwebtoken";
import User from "../models/User.js";
import httpError from "../utils/httpError.js";

export default async function authMiddleware(req, _res, next) {
    try {
        const header = req.headers.authorization || "";
        if (!header.startsWith("Bearer ")) throw httpError(401, "Please log in to continue.");

        let decoded;
        try {
            decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
        } catch (error) {
            throw httpError(
                401,
                error.name === "TokenExpiredError"
                    ? "Your session has expired. Please log in again."
                    : "Invalid session. Please log in again."
            );
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) throw httpError(401, "Account not found. Please log in again.");

        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
}
