import { Link } from "react-router-dom";
import Logo from "../components/common/Logo";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-6 text-center text-ink">
            <Logo />
            <h1 className="text-6xl font-bold">404</h1>
            <p className="max-w-sm text-muted">That page does not exist, or it moved.</p>
            <Link to="/" className="btn btn-primary">Back to home</Link>
        </main>
    );
}
