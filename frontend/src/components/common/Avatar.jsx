import { initialsOf } from "../../utils/format";

/** Shows the user's photo, or their initials on orange. No third-party placeholder service. */
export default function Avatar({ user, size = 40, className = "" }) {
    const style = { width: size, height: size, fontSize: Math.max(12, size * 0.38) };
    if (user?.avatar) {
        return <img src={user.avatar} alt="" style={style} className={`shrink-0 rounded-full object-cover ${className}`} />;
    }
    return (
        <span style={style} aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent font-display font-bold text-black ${className}`}>
            {initialsOf(user?.name)}
        </span>
    );
}
