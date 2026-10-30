import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

vi.mock("../services/userService", () => ({
    getProfile: vi.fn(), updateProfile: vi.fn(), updatePreferences: vi.fn(), changePassword: vi.fn(), deleteAccount: vi.fn(),
}));
vi.mock("../services/authService", () => ({ login: vi.fn(), register: vi.fn() }));
vi.mock("../services/contentService", () => ({ generateContent: vi.fn() }));
vi.mock("../services/historyService", () => ({ getHistory: vi.fn(), deleteHistoryItem: vi.fn(), clearHistory: vi.fn() }));

import * as userService from "../services/userService";
import * as authService from "../services/authService";
import * as contentService from "../services/contentService";
import * as historyService from "../services/historyService";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import App from "../App";

const USER = {
    id: "u1", name: "Archie Jain", email: "archie@example.com", avatar: "", createdAt: "2026-01-15T00:00:00Z",
    preferences: { theme: "light", defaultPlatform: "linkedin", defaultTone: "luxury", defaultLanguage: "Hindi", defaultContentType: "seo" },
};
const STATS = { totalGenerations: 2, lastGeneratedAt: "2026-10-01T00:00:00Z" };

function renderApp(route, { loggedIn = true } = {}) {
    if (loggedIn) localStorage.setItem("token", "test-token");
    return render(
        <MemoryRouter initialEntries={[route]}>
            <AuthProvider><ThemeProvider><App /><Toaster /></ThemeProvider></AuthProvider>
        </MemoryRouter>
    );
}
const png = () => new File([new Uint8Array([137, 80, 78, 71])], "photo.png", { type: "image/png" });

beforeEach(() => {
    vi.resetAllMocks();
    userService.getProfile.mockResolvedValue({ user: USER, stats: STATS });
});

describe("auth", () => {
    test("protected pages redirect to login when logged out", async () => {
        renderApp("/dashboard", { loggedIn: false });
        expect(await screen.findByRole("heading", { name: "Log in" })).toBeInTheDocument();
    });

    test("login trims the email, stores the token and opens the dashboard", async () => {
        authService.login.mockResolvedValue({ token: "abc", user: USER });
        renderApp("/login", { loggedIn: false });
        const user = userEvent.setup();
        await user.type(screen.getByLabelText("Email"), "  archie@example.com ");
        await user.type(screen.getByLabelText("Password"), "secret123");
        await user.click(screen.getByRole("button", { name: "Log in" }));
        expect(authService.login).toHaveBeenCalledWith({ email: "archie@example.com", password: "secret123" });
        expect(await screen.findByRole("heading", { name: /Hi Archie/ })).toBeInTheDocument();
        expect(localStorage.getItem("token")).toBe("abc");
    });

    test("a failed login shows the server's message", async () => {
        authService.login.mockRejectedValue({ response: { data: { message: "Invalid email or password" } } });
        renderApp("/login", { loggedIn: false });
        const user = userEvent.setup();
        await user.type(screen.getByLabelText("Email"), "a@b.co");
        await user.type(screen.getByLabelText("Password"), "wrongwrong");
        await user.click(screen.getByRole("button", { name: "Log in" }));
        expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
    });
});

describe("dashboard", () => {
    test("starts from the defaults saved in settings, and generate needs an image", async () => {
        renderApp("/dashboard");
        await screen.findByRole("heading", { name: /Hi Archie/ });
        expect(screen.getByRole("button", { name: "LinkedIn" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "Luxury" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "Hindi" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "SEO" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: /Generate seo/i })).toBeDisabled();
    });

    test("rejects unsupported files before any request is made", async () => {
        renderApp("/dashboard");
        await screen.findByRole("heading", { name: /Hi Archie/ });
        const user = userEvent.setup({ applyAccept: false });
        await user.upload(screen.getByLabelText("Choose an image"), new File(["x"], "anim.gif", { type: "image/gif" }));
        expect(await screen.findByText("Use a JPG, PNG, or WEBP image.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Generate/ })).toBeDisabled();
    });

    test("generates, keeps showing the generated type when the selector changes, and regenerates", async () => {
        contentService.generateContent.mockResolvedValue({
            contentType: "seo", createdAt: "2026-10-30T00:00:00Z",
            generatedContent: { title: "My SEO title", metaDescription: "A description", keywords: ["alpha", "beta"], altText: "Alt text here" },
        });
        renderApp("/dashboard");
        await screen.findByRole("heading", { name: /Hi Archie/ });
        const user = userEvent.setup();
        await user.upload(screen.getByLabelText("Choose an image"), png());
        await user.click(screen.getByRole("button", { name: /Generate seo/i }));

        expect(await screen.findByText("My SEO title")).toBeInTheDocument();
        const form = contentService.generateContent.mock.calls[0][0];
        expect(Object.fromEntries([...form.entries()].filter(([k]) => k !== "image" && k !== "thumbnail"))).toEqual({
            platform: "linkedin", tone: "luxury", language: "Hindi", contentType: "seo",
        });
        expect(form.get("image").name).toBe("photo.png");

        // Regression: switching the selector must not re-render the old result as another type.
        await user.click(screen.getByRole("button", { name: "Blog post" }));
        expect(screen.getByRole("heading", { name: "SEO" })).toBeInTheDocument();
        expect(screen.getByText("Alt text here")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /Regenerate/ }));
        await waitFor(() => expect(contentService.generateContent).toHaveBeenCalledTimes(2));
    });

    test("shows the server error when generation fails", async () => {
        contentService.generateContent.mockRejectedValue({ response: { data: { message: "The AI service is busy." } } });
        renderApp("/dashboard");
        await screen.findByRole("heading", { name: /Hi Archie/ });
        const user = userEvent.setup();
        await user.upload(screen.getByLabelText("Choose an image"), png());
        await user.click(screen.getByRole("button", { name: /Generate/ }));
        expect(await screen.findByText("The AI service is busy.")).toBeInTheDocument();
    });
});

describe("history", () => {
    const item = (id, text) => ({ _id: id, contentType: "caption", platform: "instagram", tone: "friendly", language: "English", createdAt: "2026-10-01T10:00:00Z", thumbnail: "", generatedContent: { caption: text, hashtags: ["#a"] } });

    test("lists items, expands details and deletes after confirmation", async () => {
        historyService.getHistory.mockResolvedValue({ history: [item("1", "First caption"), item("2", "Second caption")], total: 2, page: 1, pages: 1 });
        historyService.deleteHistoryItem.mockResolvedValue({ success: true });
        renderApp("/history");
        expect(await screen.findByText("First caption")).toBeInTheDocument();

        const user = userEvent.setup();
        await user.click(screen.getAllByRole("button", { name: "View details" })[0]);
        expect(screen.getByText("#a")).toBeInTheDocument();

        await user.click(screen.getAllByRole("button", { name: "Delete this item" })[0]);
        await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Delete" }));
        expect(historyService.deleteHistoryItem).toHaveBeenCalledWith("1");
        await waitFor(() => expect(screen.queryByText("First caption")).not.toBeInTheDocument());
        expect(screen.getByText("Second caption")).toBeInTheDocument();
    });

    test("filtering asks the API for that content type", async () => {
        historyService.getHistory.mockResolvedValue({ history: [], total: 0, page: 1, pages: 1 });
        renderApp("/history");
        const user = userEvent.setup();
        await screen.findByText("No generations yet");
        await user.click(screen.getByRole("button", { name: "Blog post" }));
        await waitFor(() => expect(historyService.getHistory).toHaveBeenLastCalledWith(expect.objectContaining({ contentType: "blog", page: 1 })));
        expect(await screen.findByText("Nothing here yet")).toBeInTheDocument();
    });

    test("a failed load offers a retry", async () => {
        historyService.getHistory.mockRejectedValueOnce(new Error("down")).mockResolvedValueOnce({ history: [item("1", "Back again")], total: 1, page: 1, pages: 1 });
        renderApp("/history");
        const user = userEvent.setup();
        await user.click(await screen.findByRole("button", { name: "Try again" }));
        expect(await screen.findByText("Back again")).toBeInTheDocument();
    });
});

describe("profile", () => {
    test("shows details and stats; saving is only possible after a change", async () => {
        userService.updateProfile.mockResolvedValue({ user: { ...USER, name: "Archie J" } });
        renderApp("/profile");
        const input = await screen.findByLabelText("Full name");
        expect(input).toHaveValue("Archie Jain");
        expect(screen.getByLabelText("Email")).toBeDisabled();
        expect(screen.getByText("2")).toBeInTheDocument(); // generation count
        const save = screen.getByRole("button", { name: "Save changes" });
        expect(save).toBeDisabled();

        const user = userEvent.setup();
        await user.clear(input);
        await user.type(input, "  Archie J ");
        await user.click(save);
        expect(userService.updateProfile).toHaveBeenCalledWith({ name: "Archie J" });
        expect(await screen.findByText("Profile updated")).toBeInTheDocument();
    });

    test("rejects an unsupported profile photo", async () => {
        renderApp("/profile");
        await screen.findByLabelText("Full name");
        const user = userEvent.setup({ applyAccept: false });
        await user.upload(screen.getByLabelText("Choose a profile photo"), new File(["x"], "doc.pdf", { type: "application/pdf" }));
        expect(await screen.findByText("Use a JPG, PNG, or WEBP image.")).toBeInTheDocument();
        expect(userService.updateProfile).not.toHaveBeenCalled();
    });
});

describe("settings", () => {
    test("saves generation defaults", async () => {
        userService.updatePreferences.mockResolvedValue({ user: { ...USER, preferences: { ...USER.preferences, defaultTone: "persuasive" } } });
        renderApp("/settings");
        const user = userEvent.setup();
        const tone = await screen.findByLabelText("Tone");
        expect(tone).toHaveValue("luxury");
        const save = screen.getByRole("button", { name: "Save defaults" });
        expect(save).toBeDisabled();
        await user.selectOptions(tone, "persuasive");
        await user.click(save);
        expect(userService.updatePreferences).toHaveBeenCalledWith({ defaultContentType: "seo", defaultPlatform: "linkedin", defaultTone: "persuasive", defaultLanguage: "Hindi" });
    });

    test("theme switch applies instantly and is saved to the account", async () => {
        userService.updatePreferences.mockResolvedValue({ user: { ...USER, preferences: { ...USER.preferences, theme: "dark" } } });
        renderApp("/settings");
        const user = userEvent.setup();
        await screen.findByLabelText("Tone");
        await user.click(screen.getByRole("button", { name: "Dark" }));
        expect(document.documentElement).toHaveClass("dark");
        expect(userService.updatePreferences).toHaveBeenCalledWith({ theme: "dark" });
        await user.click(screen.getByRole("button", { name: "Light" }));
        expect(document.documentElement).not.toHaveClass("dark");
    });

    test("password change validates locally, then calls the API", async () => {
        userService.changePassword.mockResolvedValue({ success: true });
        renderApp("/settings");
        const user = userEvent.setup();
        await user.type(await screen.findByLabelText("Current password"), "oldpass1");
        await user.type(screen.getByLabelText("New password"), "newpass99");
        await user.type(screen.getByLabelText("Confirm new password"), "different");
        await user.click(screen.getByRole("button", { name: "Change password" }));
        expect(await screen.findByText("The new passwords do not match.")).toBeInTheDocument();
        expect(userService.changePassword).not.toHaveBeenCalled();

        await user.clear(screen.getByLabelText("Confirm new password"));
        await user.type(screen.getByLabelText("Confirm new password"), "newpass99");
        await user.click(screen.getByRole("button", { name: "Change password" }));
        expect(userService.changePassword).toHaveBeenCalledWith({ currentPassword: "oldpass1", newPassword: "newpass99" });
        expect(await screen.findByText("Password changed")).toBeInTheDocument();
        expect(screen.getByLabelText("Current password")).toHaveValue("");
    });

    test("a wrong current password shows the error and keeps the user signed in", async () => {
        userService.changePassword.mockRejectedValue({ response: { status: 400, data: { message: "Current password is incorrect" } } });
        renderApp("/settings");
        const user = userEvent.setup();
        await user.type(await screen.findByLabelText("Current password"), "nope-nope");
        await user.type(screen.getByLabelText("New password"), "newpass99");
        await user.type(screen.getByLabelText("Confirm new password"), "newpass99");
        await user.click(screen.getByRole("button", { name: "Change password" }));
        expect(await screen.findByText("Current password is incorrect")).toBeInTheDocument();
        expect(localStorage.getItem("token")).toBe("test-token");
    });

    test("deleting the account needs the password, then signs out and returns home", async () => {
        userService.deleteAccount.mockResolvedValue({ success: true });
        renderApp("/settings");
        const user = userEvent.setup();
        await screen.findByLabelText("Tone");
        await user.click(screen.getByRole("button", { name: "Delete my account" }));
        const dialog = screen.getByRole("dialog");
        const confirm = within(dialog).getByRole("button", { name: "Delete account" });
        expect(confirm).toBeDisabled(); // password is required first
        await user.type(within(dialog).getByLabelText("Password"), "secret123");
        await user.click(confirm);
        expect(userService.deleteAccount).toHaveBeenCalledWith("secret123");
        expect(await screen.findByRole("heading", { name: /One image in/ })).toBeInTheDocument();
        expect(localStorage.getItem("token")).toBeNull();
    });

    test("clearing history is confirmed, then empties the count", async () => {
        historyService.clearHistory.mockResolvedValue({ success: true });
        renderApp("/settings");
        const user = userEvent.setup();
        await screen.findByLabelText("Tone");
        await user.click(screen.getByRole("button", { name: "Clear history" }));
        await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Clear history" }));
        expect(historyService.clearHistory).toHaveBeenCalled();
        await waitFor(() => expect(screen.getByRole("button", { name: "Clear history" })).toBeDisabled());
    });
});
