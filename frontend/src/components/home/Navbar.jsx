import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    return (
        <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
            <Logo />
            <nav className="flex items-center gap-2" aria-label="Account">
                {user ? (
                    <Link to="/dashboard" className="btn btn-primary">Open dashboard</Link>
                ) : (
                    <>
                        <Link to="/login" className="btn text-ink hover:bg-line/60">Log in</Link>
                        <Link to="/register" className="btn btn-primary">Get started</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
