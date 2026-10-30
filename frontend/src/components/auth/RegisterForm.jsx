import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as registerRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { errorMessage } from "../../utils/format";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [busy, setBusy] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        if (form.password.length < 6) return toast.error("Password must be at least 6 characters.");
        setBusy(true);
        try {
            const data = await registerRequest({ name: form.name.trim(), email: form.email.trim(), password: form.password });
            login(data.token, data.user);
            toast.success("Account created");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            toast.error(errorMessage(error, "Registration failed. Please try again."));
        } finally {
            setBusy(false);
        }
    };

    return (
        <form onSubmit={submit} className="w-full max-w-md space-y-5">
            <div>
                <h1 className="text-4xl font-bold">Create your account</h1>
                <p className="mt-2 text-muted">Free to start. Your first result is a minute away.</p>
            </div>
            <div>
                <label htmlFor="reg-name" className="label">Full name</label>
                <input id="reg-name" className="input" autoComplete="name" maxLength={60} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
                <label htmlFor="reg-email" className="label">Email</label>
                <input id="reg-email" type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
                <label htmlFor="reg-password" className="label">Password</label>
                <PasswordInput id="reg-password" autoComplete="new-password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <p className="mt-1.5 text-sm text-muted">At least 6 characters.</p>
            </div>
            <button type="submit" className="btn btn-primary w-full py-3.5 text-base" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>
            <p className="text-muted">Already registered? <Link to="/login" className="font-semibold text-accent-text underline underline-offset-4">Log in</Link></p>
        </form>
    );
}
