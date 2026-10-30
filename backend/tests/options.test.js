import "./helpers.js";
import test from "node:test";
import assert from "node:assert/strict";
import { PLATFORMS, TONES, LANGUAGES, CONTENT_TYPES } from "../config/options.js";
import { buildPrompt, normalizeGenerationOptions } from "../services/prompt.service.js";

test("every platform x tone x content type builds a complete prompt", () => {
    let count = 0;
    for (const platform of PLATFORMS) for (const tone of TONES) for (const contentType of CONTENT_TYPES) {
        const prompt = buildPrompt({ platform, tone, language: "Hindi", contentType });
        assert.ok(prompt.includes("SELECTED LANGUAGE: Hindi"));
        assert.ok(!prompt.includes("undefined"), `undefined leaked into ${platform}/${tone}/${contentType}`);
        assert.ok(!prompt.includes("[object Object]"));
        count += 1;
    }
    assert.equal(count, PLATFORMS.length * TONES.length * CONTENT_TYPES.length);
});

test("hashtag counts follow the platform", () => {
    assert.match(buildPrompt({ platform: "twitter", contentType: "caption" }), /1-3 relevant hashtags/);
    assert.match(buildPrompt({ platform: "instagram", contentType: "hashtags" }), /15-25 relevant hashtags/);
});

test("options are validated case-insensitively and bad values are rejected with 400", () => {
    assert.deepEqual(normalizeGenerationOptions({ platform: "Instagram", tone: "GENZ", language: "hindi", contentType: "SEO" }),
        { platform: "instagram", tone: "genZ", language: "Hindi", contentType: "seo" });
    for (const bad of [{ platform: "myspace" }, { tone: "angry" }, { language: "Klingon" }, { contentType: "poem" }, { platform: "../../.env" }]) {
        assert.throws(() => normalizeGenerationOptions(bad), (e) => e.status === 400);
    }
});

test("frontend option lists match the backend exactly", async () => {
    const fe = await import("../../frontend/src/constants/options.js");
    const ids = (list) => list.map((item) => item.id ?? item);
    assert.deepEqual(ids(fe.PLATFORMS), PLATFORMS);
    assert.deepEqual(ids(fe.TONES), TONES);
    assert.deepEqual(ids(fe.LANGUAGES), LANGUAGES);
    assert.deepEqual(ids(fe.CONTENT_TYPES), CONTENT_TYPES);
});
