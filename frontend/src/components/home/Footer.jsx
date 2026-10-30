import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="bg-black text-[#F6F5F1]">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-12">
                <div>
                    <Logo className="text-[#F6F5F1]" />
                    <p className="mt-3 max-w-xs text-sm text-[#F6F5F1]/60">Turn any image into content for every platform.</p>
                </div>
                <nav className="flex gap-6 text-sm" aria-label="Footer">
                    <Link to="/login" className="hover:text-accent">Log in</Link>
                    <Link to="/register" className="hover:text-accent">Create account</Link>
                </nav>
            </div>
            <p className="border-t border-white/15 py-5 text-center text-sm text-[#F6F5F1]/50">© {YEAR} PIXORATE AI</p>
        </footer>
    );
}
