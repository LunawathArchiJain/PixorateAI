import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import toast from "react-hot-toast";

afterEach(() => {
    cleanup();
    toast.remove();
    localStorage.clear();
    document.documentElement.classList.remove("dark");
});

// jsdom lacks these browser APIs.
globalThis.URL.createObjectURL = () => "blob:test";
globalThis.URL.revokeObjectURL = () => {};
Element.prototype.scrollIntoView = () => {};
window.matchMedia ??= (query) => ({
    matches: false, media: query, onchange: null,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false,
});
