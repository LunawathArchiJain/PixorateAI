import { Link, NavLink, useLocation } from "react-router-dom";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Avatar from "../common/Avatar";
import Logo from "../common/Logo";
import { NAV_ITEMS } from "./nav";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { pathname } = useLocation();
    const title = NAV_ITEMS.find((item) => item.to === pathname)?.label ?? "";

    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-canvas/95 px-5 backdrop-blur lg:px-10">
                <div className="flex items-center gap-6">
                    <Logo to="/dashboard" className="lg:hidden" />
                    <span className="hidden font-display text-lg font-semibold lg:block">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={toggleTheme} className="rounded-md p-2.5 text-lg hover:bg-line/60"
                        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
                        {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </button>
                    <Link to="/profile" aria-label="Your profile" className="hidden sm:block lg:hidden"><Avatar user={user} size={34} /></Link>
                    <button type="button" onClick={() => logout()} className="rounded-md p-2.5 text-lg hover:bg-line/60 lg:hidden" aria-label="Log out">
                        <FiLogOut />
                    </button>
                </div>
            </header>

            {/* Phones and tablets: the sidebar is hidden, so the same links sit under the header. */}
            <nav className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2 lg:hidden" aria-label="Main">
                {NAV_ITEMS.map((item) => (
                    <NavLink key={item.to} to={item.to}
                        className={({ isActive }) => `flex items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm ${isActive ? "bg-ink font-semibold text-canvas" : "text-muted hover:text-ink"}`}>
                        {item.icon}{item.label}
                    </NavLink>
                ))}
            </nav>
        </>
    );
}
