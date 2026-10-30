import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { errorMessage } from "../../utils/format";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: "", password: "" });
    const [busy, setBusy] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setBusy(true);
        try {
            const data = await loginRequest({ email: form.email.trim(), password: form.password });
            login(data.token, data.user);
            navigate(location.state?.from || "/dashboard", { replace: true });
        } catch (error) {
            toast.error(errorMessage(error, "Login failed. Please try again."));
        } finally {
            setBusy(false);
        }
    };

    return (
        <form onSubmit={submit} className="w-full max-w-md space-y-5">
            <div>
                <h1 className="text-4xl font-bold">Log in</h1>
                <p className="mt-2 text-muted">Welcome back. Pick up where you left off.</p>
            </div>
            <div>
                <label htmlFor="login-email" className="label">Email</label>
                <input id="login-email" type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
                <label htmlFor="login-password" className="label">Password</label>
                <PasswordInput id="login-password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary w-full py-3.5 text-base" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
            <p className="text-muted">New here? <Link to="/register" className="font-semibold text-accent-text underline underline-offset-4">Create an account</Link></p>
        </form>
    );
}
