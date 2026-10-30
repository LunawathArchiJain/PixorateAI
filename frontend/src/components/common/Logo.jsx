import { Link } from "react-router-dom";

export function LogoMark({ className = "h-7 w-7" }) {
    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
            <rect x="3" y="3" width="12" height="12" rx="2" fill="currentColor" />
            <rect x="17" y="3" width="12" height="12" rx="2" fill="#FF5A00" />
            <rect x="3" y="17" width="12" height="12" rx="2" fill="currentColor" />
            <rect x="17" y="17" width="12" height="12" rx="2" fill="currentColor" />
        </svg>
    );
}

export default function Logo({ to = "/", className = "" }) {
    return (
        <Link to={to} className={`inline-flex items-center gap-2.5 ${className}`} aria-label="PIXORATE AI home">
            <LogoMark />
            <span className="font-display text-xl font-bold tracking-tight">PIXORATE AI</span>
        </Link>
    );
}
