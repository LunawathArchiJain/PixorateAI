import { query, makeUser, tokenFor, startServer, mock, PNG } from "./helpers.js";
import test, { before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

const { default: User } = await import("../models/User.js");
const { default: GeneratedContent } = await import("../models/GeneratedContent.js");
const { default: ai } = await import("../config/gemini.js");

let api;
before(async () => { api = await startServer(); });
after(async () => { await api.close(); });
afterEach(() => mock.restoreAll());

const authed = async (overrides) => {
    const user = await makeUser(overrides);
    mock.method(User, "findById", () => query(user));
    return { user, token: tokenFor() };
};
const imageForm = (fields = {}, bytes = PNG, type = "image/png") => {
    const form = new FormData();
    form.append("image", new Blob([bytes], { type }), "photo.png");
    for (const [key, value] of Object.entries(fields)) form.append(key, value);
    return form;
};
const geminiReturns = (text) => mock.method(ai.models, "generateContent", async () => ({ text }));

test("health, options and JSON 404", async () => {
    assert.equal((await api.call("GET", "/api/health")).json.status, "ok");
    const options = await api.call("GET", "/api/options");
    assert.ok(options.json.tones.includes("genZ"));
    const missing = await api.call("GET", "/api/nope");
    assert.equal(missing.status, 404);
    assert.equal(missing.json.success, false);
});

test("register: validation messages, duplicates, success", async () => {
    let r = await api.call("POST", "/api/auth/register", { body: { name: "A", email: "bad", password: "123456" } });
    assert.equal(r.status, 400);
    assert.equal(r.json.message, "Enter a valid email"); // frontend shows `message`

    r = await api.call("POST", "/api/auth/register", { body: { name: "A", email: "a@b.co", password: "123" } });
    assert.equal(r.status, 400);

    mock.method(User, "findOne", async () => ({ _id: "x" }));
    r = await api.call("POST", "/api/auth/register", { body: { name: "A", email: "a@b.co", password: "123456" } });
    assert.equal(r.status, 409);
    mock.restoreAll();

    mock.method(User, "findOne", async () => null);
    const create = mock.method(User, "create", async (doc) => ({ ...(await makeUser()), ...doc }));
    r = await api.call("POST", "/api/auth/register", { body: { name: "Archie", email: "Archie.X@Example.com ", password: "123456" } });
    assert.equal(r.status, 201);
    assert.equal(create.mock.calls[0].arguments[0].email, "archie.x@example.com"); // lowercased, dots kept
    assert.notEqual(create.mock.calls[0].arguments[0].password, "123456"); // hashed
    assert.ok(r.json.token);
    assert.equal(r.json.user.password, undefined);
});

test("login: generic error for unknown user and wrong password, token on success", async () => {
    mock.method(User, "findOne", () => query(null));
    let r = await api.call("POST", "/api/auth/login", { body: { email: "x@y.co", password: "secret123" } });
    assert.equal(r.status, 401);
    assert.equal(r.json.message, "Invalid email or password");
    mock.restoreAll();

    mock.method(User, "findOne", () => query(makeUser()));
    r = await api.call("POST", "/api/auth/login", { body: { email: "archie@example.com", password: "wrong-password" } });
    assert.equal(r.status, 401);
    assert.equal(r.json.message, "Invalid email or password");
    mock.restoreAll();

    const user = await makeUser();
    mock.method(User, "findOne", () => query(user));
    r = await api.call("POST", "/api/auth/login", { body: { email: "archie@example.com", password: "secret123" } });
    assert.equal(r.status, 200);
    assert.equal(jwt.verify(r.json.token, process.env.JWT_SECRET).id, user._id);
    assert.equal(r.json.user.preferences.theme, "light");
});

test("protected routes reject missing, garbage and expired tokens", async () => {
    assert.equal((await api.call("GET", "/api/user/profile")).status, 401);
    assert.equal((await api.call("GET", "/api/history", { token: "garbage" })).status, 401);
    const expired = jwt.sign({ id: "x" }, process.env.JWT_SECRET, { expiresIn: -10 });
    const r = await api.call("GET", "/api/history", { token: expired });
    assert.equal(r.status, 401);
    assert.match(r.json.message, /expired/);
});

test("profile: stats, name/avatar validation and update", async () => {
    const { token } = await authed();
    mock.method(GeneratedContent, "countDocuments", async () => 7);
    mock.method(GeneratedContent, "findOne", () => query({ createdAt: new Date("2026-02-02") }));
    let r = await api.call("GET", "/api/user/profile", { token });
    assert.equal(r.status, 200);
    assert.equal(r.json.stats.totalGenerations, 7);
    assert.equal(r.json.user.password, undefined);

    assert.equal((await api.call("PUT", "/api/user/profile", { token, body: {} })).status, 400);
    assert.equal((await api.call("PUT", "/api/user/profile", { token, body: { name: "   " } })).status, 400);
    assert.equal((await api.call("PUT", "/api/user/profile", { token, body: { avatar: "javascript:alert(1)" } })).status, 400);
    assert.equal((await api.call("PUT", "/api/user/profile", { token, body: { avatar: "data:text/html;base64,AAAA" } })).status, 400);

    r = await api.call("PUT", "/api/user/profile", { token, body: { name: "New Name", avatar: "https://example.com/me.png" } });
    assert.equal(r.status, 200);
    assert.equal(r.json.user.name, "New Name");
    assert.equal(r.json.user.avatar, "https://example.com/me.png");

    r = await api.call("PUT", "/api/user/profile", { token, body: { avatar: "data:image/jpeg;base64,/9j/4AAQ" } });
    assert.equal(r.status, 200);
    r = await api.call("PUT", "/api/user/profile", { token, body: { avatar: "" } }); // removing the avatar
    assert.equal(r.status, 200);
});

test("preferences: only known values are accepted", async () => {
    const { token } = await authed();
    assert.equal((await api.call("PUT", "/api/user/preferences", { token, body: { theme: "neon" } })).status, 400);
    assert.equal((await api.call("PUT", "/api/user/preferences", { token, body: { defaultTone: "angry" } })).status, 400);
    const r = await api.call("PUT", "/api/user/preferences", { token, body: { theme: "dark", defaultTone: "luxury", defaultPlatform: "linkedin" } });
    assert.equal(r.status, 200);
    assert.equal(r.json.user.preferences.theme, "dark");
    assert.equal(r.json.user.preferences.defaultTone, "luxury");
});

test("password change: checks current password and rejects reuse", async () => {
    const { token } = await authed();
    mock.method(User, "findById", (id) => { const q = query(makeUser()); return q; });
    let r = await api.call("PUT", "/api/user/password", { token, body: { currentPassword: "nope-nope", newPassword: "newpass123" } });
    assert.equal(r.status, 400);
    assert.equal(r.json.message, "Current password is incorrect"); // 400, not 401, so the UI does not log the user out
    r = await api.call("PUT", "/api/user/password", { token, body: { currentPassword: "secret123", newPassword: "secret123" } });
    assert.equal(r.status, 400);
    r = await api.call("PUT", "/api/user/password", { token, body: { currentPassword: "secret123", newPassword: "abc" } });
    assert.equal(r.status, 400);
    r = await api.call("PUT", "/api/user/password", { token, body: { currentPassword: "secret123", newPassword: "brand-new-pass" } });
    assert.equal(r.status, 200);
});

test("delete account requires the password and removes history", async () => {
    const { token } = await authed();
    const delHistory = mock.method(GeneratedContent, "deleteMany", async () => ({ deletedCount: 3 }));
    const delUser = mock.method(User, "deleteOne", async () => ({}));
    let r = await api.call("DELETE", "/api/user/account", { token, body: { password: "wrong-password" } });
    assert.equal(r.status, 400);
    assert.equal(delUser.mock.callCount(), 0);
    r = await api.call("DELETE", "/api/user/account", { token, body: { password: "secret123" } });
    assert.equal(r.status, 200);
    assert.equal(delHistory.mock.callCount(), 1);
    assert.equal(delUser.mock.callCount(), 1);
});

test("generate: input validation", async () => {
    const { token } = await authed();
    let r = await api.call("POST", "/api/generate", { token, form: (() => { const f = new FormData(); f.append("tone", "genZ"); return f; })() });
    assert.equal(r.status, 400);
    assert.match(r.json.message, /upload an image/i);

    r = await api.call("POST", "/api/generate", { token, form: imageForm({ tone: "angry" }) });
    assert.equal(r.status, 400);
    assert.match(r.json.message, /Unsupported tone/);

    r = await api.call("POST", "/api/generate", { token, form: imageForm({}, Buffer.from("this is not an image at all"), "image/png") });
    assert.equal(r.status, 400); // faked mimetype is caught by the magic-byte check
    assert.match(r.json.message, /not a valid/);

    r = await api.call("POST", "/api/generate", { token, form: imageForm({}, PNG, "application/pdf") });
    assert.equal(r.status, 400);

    r = await api.call("POST", "/api/generate", { form: imageForm() });
    assert.equal(r.status, 401);
});

test("generate: success saves history and normalises the model output", async () => {
    const { token } = await authed();
    const create = mock.method(GeneratedContent, "create", async (doc) => ({ _id: "gen1", createdAt: new Date(), ...doc }));
    const gemini = geminiReturns('```json\n{"sceneDescription":"A cup","caption":"Morning fuel","hashtags":["coffee","#Latte Art"],"emojiSuggestions":["☕"],"callToAction":"Try it"}\n```');
    const thumb = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
    const r = await api.call("POST", "/api/generate", { token, form: imageForm({ platform: "instagram", tone: "genZ", language: "Hindi", contentType: "caption", thumbnail: thumb }) });
    assert.equal(r.status, 200);
    assert.deepEqual(r.json.generatedContent.hashtags, ["#coffee", "#LatteArt"]); // '#' added, spaces removed
    assert.equal(r.json.contentType, "caption");
    assert.equal(r.json.generationId, "gen1");
    const saved = create.mock.calls[0].arguments[0];
    assert.equal(saved.tone, "genZ");
    assert.equal(saved.thumbnail, thumb);
    assert.equal(saved.imageName, "photo.png");
    const call = gemini.mock.calls[0].arguments[0];
    assert.equal(call.model, "primary-model");
    assert.equal(call.contents[0].parts[0].inlineData.mimeType, "image/png");
    assert.match(call.contents[0].parts[1].text, /SELECTED LANGUAGE: Hindi/);
});

test("generate: script/summary replies are coerced to the shape the UI renders", async () => {
    const { token } = await authed();
    mock.method(GeneratedContent, "create", async (doc) => ({ _id: "g", createdAt: new Date(), ...doc }));
    geminiReturns(JSON.stringify({ title: "T", hook: "H", script: ["Scene 1", "Scene 2"], callToAction: "C" }));
    const r = await api.call("POST", "/api/generate", { token, form: imageForm({ contentType: "script" }) });
    assert.equal(r.status, 200);
    assert.equal(r.json.generatedContent.script, "Scene 1\nScene 2");
});

test("generate: still returns content when saving history fails", async () => {
    const { token } = await authed();
    mock.method(GeneratedContent, "create", async () => { throw new Error("db down"); });
    mock.method(console, "error", () => {});
    geminiReturns(JSON.stringify({ hashtags: ["a", "b"] }));
    const r = await api.call("POST", "/api/generate", { token, form: imageForm({ contentType: "hashtags" }) });
    assert.equal(r.status, 200);
    assert.equal(r.json.generationId, null);
});

test("generate: falls back to the second model when the first is retired (404)", async () => {
    const { token } = await authed();
    mock.method(GeneratedContent, "create", async (doc) => ({ _id: "g", createdAt: new Date(), ...doc }));
    mock.method(console, "error", () => {});
    const gemini = mock.method(ai.models, "generateContent", async ({ model }) => {
        if (model === "primary-model") throw Object.assign(new Error("This model is no longer available."), { status: 404 });
        return { text: JSON.stringify({ summary: "ok", sceneDescription: "s", keyPoints: ["k"] }) };
    });
    const r = await api.call("POST", "/api/generate", { token, form: imageForm({ contentType: "summary" }) });
    assert.equal(r.status, 200);
    assert.deepEqual(gemini.mock.calls.map((c) => c.arguments[0].model), ["primary-model", "fallback-model"]);
});

test("generate: transient 503 is retried before moving on", async () => {
    const { token } = await authed();
    mock.method(GeneratedContent, "create", async (doc) => ({ _id: "g", createdAt: new Date(), ...doc }));
    mock.method(console, "error", () => {});
    let n = 0;
    mock.method(ai.models, "generateContent", async () => {
        if (++n === 1) throw Object.assign(new Error("overloaded"), { status: 503 });
        return { text: JSON.stringify({ rewrittenText: "Hello" }) };
    });
    const r = await api.call("POST", "/api/generate", { token, form: imageForm({ contentType: "rewrite" }) });
    assert.equal(r.status, 200);
    assert.equal(n, 2);
});

test("generate: quota, blocked, bad-key and garbage replies map to clear errors", async () => {
    const { token } = await authed();
    mock.method(console, "error", () => {});
    const run = (contentType = "caption") => api.call("POST", "/api/generate", { token, form: imageForm({ contentType }) });

    mock.method(ai.models, "generateContent", async () => { throw Object.assign(new Error("quota"), { status: 429 }); });
    let r = await run();
    assert.equal(r.status, 429);
    mock.restoreAll(); await authed(); mock.method(console, "error", () => {});

    mock.method(ai.models, "generateContent", async () => { throw Object.assign(new Error("API key not valid"), { status: 400 }); });
    r = await run();
    assert.equal(r.status, 502);
    assert.match(r.json.message, /GEMINI_API_KEY/);
    mock.restoreAll(); await authed(); mock.method(console, "error", () => {});

    mock.method(ai.models, "generateContent", async () => ({ text: "", promptFeedback: { blockReason: "SAFETY" } }));
    r = await run();
    assert.equal(r.status, 422);
    mock.restoreAll(); await authed(); mock.method(console, "error", () => {});

    geminiReturns("I am sorry, I cannot help with that.");
    r = await run();
    assert.equal(r.status, 502);
    mock.restoreAll(); await authed(); mock.method(console, "error", () => {});

    geminiReturns(JSON.stringify({ caption: "" })); // valid JSON but empty content
    r = await run();
    assert.equal(r.status, 502);
    assert.match(r.json.message, /empty/);
});

test("history: list, filter validation, delete one, clear all", async () => {
    const { token } = await authed();
    const find = mock.method(GeneratedContent, "find", () => query([{ _id: "1", contentType: "caption" }]));
    mock.method(GeneratedContent, "countDocuments", async () => 41);
    let r = await api.call("GET", "/api/history?limit=20&page=2&contentType=caption", { token });
    assert.equal(r.status, 200);
    assert.equal(r.json.total, 41);
    assert.equal(r.json.pages, 3);
    assert.deepEqual(find.mock.calls[0].arguments[0], { user: "64b000000000000000000001", contentType: "caption" });
    assert.equal((await api.call("GET", "/api/history?contentType=poem", { token })).status, 400);

    assert.equal((await api.call("DELETE", "/api/history/not-an-id", { token })).status, 400);
    const del = mock.method(GeneratedContent, "findOneAndDelete", async () => null);
    assert.equal((await api.call("DELETE", "/api/history/64b0000000000000000000aa", { token })).status, 404);
    del.mock.restore();
    const del2 = mock.method(GeneratedContent, "findOneAndDelete", async () => ({ _id: "1" }));
    assert.equal((await api.call("DELETE", "/api/history/64b0000000000000000000aa", { token })).status, 200);
    // deletion is always scoped to the logged-in user
    assert.deepEqual(del2.mock.calls[0].arguments[0].user, "64b000000000000000000001");

    mock.method(GeneratedContent, "deleteMany", async () => ({ deletedCount: 5 }));
    r = await api.call("DELETE", "/api/history", { token });
    assert.equal(r.json.deletedCount, 5);
});
