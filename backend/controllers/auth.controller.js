import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { serializeUser } from "../utils/serializeUser.js";
import httpError from "../utils/httpError.js";

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (await User.findOne({ email })) throw httpError(409, "Email already registered");

        const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
        return res.status(201).json({
            success: true,
            message: "Registration successful",
            token: signToken(user._id),
            user: serializeUser(user),
        });
    } catch (error) {
        return next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        // Same message for "no such user" and "wrong password" so accounts cannot be probed.
        if (!user || !(await bcrypt.compare(password, user.password))) throw httpError(401, "Invalid email or password");

        return res.json({
            success: true,
            message: "Login successful",
            token: signToken(user._id),
            user: serializeUser(user),
        });
    } catch (error) {
        return next(error);
    }
};
