import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";
import Avatar from "../common/Avatar";
import { NAV_ITEMS } from "./nav";

export default function Sidebar() {
    const { user, logout } = useAuth();

    return (
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-line bg-rail px-4 py-6 text-rail-text lg:flex">
            <div>
                <Logo to="/dashboard" className="px-3 text-rail-text" />
                <nav className="mt-10 space-y-1" aria-label="Main">
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.to} to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-md border-l-[3px] px-3 py-2.5 text-[15px] transition-colors ${
                                    isActive ? "border-accent bg-white/10 font-semibold text-rail-text" : "border-transparent text-rail-text/65 hover:bg-white/5 hover:text-rail-text"
                                }`}>
                            <span className="text-lg" aria-hidden="true">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="border-t border-white/15 pt-4">
                <NavLink to="/profile" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/5">
                    <Avatar user={user} size={36} />
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{user?.name}</span>
                        <span className="block truncate text-xs text-rail-text/60">{user?.email}</span>
                    </span>
                </NavLink>
                <button type="button" onClick={() => logout()}
                    className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-rail-text/65 hover:bg-white/5 hover:text-rail-text">
                    <FiLogOut aria-hidden="true" /> Log out
                </button>
            </div>
        </aside>
    );
}
