import { useState } from "react";
import toast from "react-hot-toast";
import { FiMoon, FiSun } from "react-icons/fi";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { CONTENT_TYPES, DEFAULT_OPTIONS, LANGUAGES, PLATFORMS, TONES } from "../constants/options";
import { changePassword, deleteAccount, updatePreferences } from "../services/userService";
import { clearHistory } from "../services/historyService";
import { errorMessage } from "../utils/format";

function Section({ title, description, children }) {
    return (
        <section className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12">
            <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-1.5 text-muted">{description}</p>
            </div>
            <div>{children}</div>
        </section>
    );
}

function Select({ id, label, value, onChange, options }) {
    return (
        <div>
            <label htmlFor={id} className="label">{label}</label>
            <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => <option key={option.id ?? option} value={option.id ?? option}>{option.label ?? option}</option>)}
            </select>
        </div>
    );
}

export default function Settings() {
    const { user, stats, setStats, updateUser, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    // Generation defaults
    const saved = { ...DEFAULT_OPTIONS, ...Object.fromEntries(Object.entries({
        contentType: user?.preferences?.defaultContentType, platform: user?.preferences?.defaultPlatform,
        tone: user?.preferences?.defaultTone, language: user?.preferences?.defaultLanguage,
    }).filter(([, value]) => value)) };
    const [defaults, setDefaults] = useState(saved);
    const [savingDefaults, setSavingDefaults] = useState(false);
    const defaultsDirty = Object.keys(saved).some((key) => saved[key] !== defaults[key]);

    // Password
    const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
    const [savingPw, setSavingPw] = useState(false);

    // Destructive dialogs
    const [confirmClear, setConfirmClear] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const saveDefaults = async (event) => {
        event.preventDefault();
        setSavingDefaults(true);
        try {
            const data = await updatePreferences({
                defaultContentType: defaults.contentType, defaultPlatform: defaults.platform,
                defaultTone: defaults.tone, defaultLanguage: defaults.language,
            });
            updateUser(data.user);
            toast.success("Defaults saved. They apply the next time you open Create.");
        } catch (error) {
            toast.error(errorMessage(error, "Could not save your defaults."));
        } finally {
            setSavingDefaults(false);
        }
    };

    const submitPassword = async (event) => {
        event.preventDefault();
        if (pw.next.length < 6) return toast.error("New password must be at least 6 characters.");
        if (pw.next !== pw.confirm) return toast.error("The new passwords do not match.");
        if (pw.next === pw.current) return toast.error("Choose a password you have not used here.");
        setSavingPw(true);
        try {
            await changePassword({ currentPassword: pw.current, newPassword: pw.next });
            setPw({ current: "", next: "", confirm: "" });
            toast.success("Password changed");
        } catch (error) {
            toast.error(errorMessage(error, "Could not change your password."));
        } finally {
            setSavingPw(false);
        }
    };

    const doClear = async () => {
        try {
            await clearHistory();
            setStats((s) => (s ? { ...s, totalGenerations: 0, lastGeneratedAt: null } : s));
            toast.success("History cleared");
        } catch (error) {
            toast.error(errorMessage(error, "Could not clear history."));
            throw error;
        }
    };

    const doDelete = async (password) => {
        try {
            await deleteAccount(password);
        } catch (error) {
            toast.error(errorMessage(error, "Could not delete your account."));
            throw error;
        }
        logout("/"); // ProtectedRoute sends them to the home page instead of the login page
        toast.success("Your account has been deleted");
    };

    return (
        <Layout>
            <PageHeader title="Settings" description="Appearance, generation defaults, security and your data." />

            <Section title="Appearance" description="Choose the look you prefer. It follows you to any device you log in on.">
                <div className="flex gap-3" role="group" aria-label="Theme">
                    <button type="button" className="chip px-5 py-3" aria-pressed={theme === "light"} onClick={() => setTheme("light")}><FiSun aria-hidden="true" />Light</button>
                    <button type="button" className="chip px-5 py-3" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}><FiMoon aria-hidden="true" />Dark</button>
                </div>
            </Section>

            <Section title="Generation defaults" description="The options Create starts with, so you can skip choosing the same ones every time.">
                <form onSubmit={saveDefaults} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Select id="d-type" label="Content type" value={defaults.contentType} onChange={(v) => setDefaults({ ...defaults, contentType: v })} options={CONTENT_TYPES} />
                        <Select id="d-platform" label="Platform" value={defaults.platform} onChange={(v) => setDefaults({ ...defaults, platform: v })} options={PLATFORMS} />
                        <Select id="d-tone" label="Tone" value={defaults.tone} onChange={(v) => setDefaults({ ...defaults, tone: v })} options={TONES} />
                        <Select id="d-lang" label="Language" value={defaults.language} onChange={(v) => setDefaults({ ...defaults, language: v })} options={LANGUAGES} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!defaultsDirty || savingDefaults}>{savingDefaults ? "Saving…" : "Save defaults"}</button>
                </form>
            </Section>

            <Section title="Password" description="Use at least 6 characters. You stay logged in on this device.">
                <form onSubmit={submitPassword} className="max-w-md space-y-4">
                    <div><label htmlFor="pw-current" className="label">Current password</label><input id="pw-current" type="password" className="input" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required /></div>
                    <div><label htmlFor="pw-new" className="label">New password</label><input id="pw-new" type="password" className="input" autoComplete="new-password" minLength={6} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required /></div>
                    <div><label htmlFor="pw-confirm" className="label">Confirm new password</label><input id="pw-confirm" type="password" className="input" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required /></div>
                    <button type="submit" className="btn btn-primary" disabled={savingPw || !pw.current || !pw.next || !pw.confirm}>{savingPw ? "Updating…" : "Change password"}</button>
                </form>
            </Section>

            <Section title="Your data" description="Original images are never stored. History holds the generated text and a small preview.">
                <p className="mb-4">You have <strong>{stats?.totalGenerations ?? 0}</strong> saved {stats?.totalGenerations === 1 ? "generation" : "generations"}.</p>
                <button type="button" className="btn btn-danger" onClick={() => setConfirmClear(true)} disabled={!stats?.totalGenerations}>Clear history</button>
            </Section>

            <Section title="Delete account" description="Permanently removes your account and all of your history.">
                <button type="button" className="btn btn-danger" onClick={() => setConfirmDelete(true)}>Delete my account</button>
            </Section>

            <ConfirmDialog open={confirmClear} danger title="Clear all history?" description="Every generated result in your account will be deleted. This cannot be undone." confirmLabel="Clear history" onConfirm={doClear} onClose={() => setConfirmClear(false)} />
            <ConfirmDialog open={confirmDelete} danger title="Delete your account?" description="This permanently deletes your account and every saved result. Enter your password to confirm." confirmLabel="Delete account" passwordLabel="Password" onConfirm={doDelete} onClose={() => setConfirmDelete(false)} />
        </Layout>
    );
}
