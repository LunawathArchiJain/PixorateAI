// Test environment: must be set before any app module is imported.
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret";
process.env.GEMINI_API_KEY = "test-key";
process.env.MONGO_URI = "mongodb://127.0.0.1:27017/test";
process.env.GEMINI_MODEL = "primary-model";
process.env.GEMINI_FALLBACK_MODEL = "fallback-model";

import { mock } from "node:test";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** A tiny stand-in for a Mongoose query: chainable and awaitable. */
export const query = (value) => {
    const q = { select: () => q, sort: () => q, skip: () => q, limit: () => q, lean: () => q, then: (res, rej) => Promise.resolve(value).then(res, rej) };
    return q;
};

export const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(64)]);

export const makeUser = async (overrides = {}) => ({
    _id: "64b000000000000000000001",
    name: "Archie",
    email: "archie@example.com",
    avatar: "",
    password: await bcrypt.hash("secret123", 4),
    preferences: {},
    createdAt: new Date("2026-01-01"),
    set(path, value) { this.preferences[path.replace("preferences.", "")] = value; },
    save: async function () { return this; },
    ...overrides,
});

export const tokenFor = (id = "64b000000000000000000001") => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

export async function startServer() {
    const { default: app } = await import("../app.js");
    const server = app.listen(0);
    const base = `http://127.0.0.1:${server.address().port}`;
    const call = async (method, path, { body, token, form } = {}) => {
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        let payload;
        if (form) payload = form;
        else if (body !== undefined) { headers["Content-Type"] = "application/json"; payload = JSON.stringify(body); }
        const res = await fetch(base + path, { method, headers, body: payload });
        return { status: res.status, json: await res.json().catch(() => null) };
    };
    return { call, close: () => new Promise((r) => server.close(r)) };
}

export { mock };
