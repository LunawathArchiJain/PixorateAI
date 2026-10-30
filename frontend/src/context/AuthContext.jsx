import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getProfile } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    // Where ProtectedRoute sends the user right after they sign out (null = the login page).
    const [exitTo, setExitTo] = useState(null);

    const logout = useCallback((destination = null) => {
        localStorage.removeItem("token");
        setExitTo(typeof destination === "string" ? destination : null);
        setUser(null);
        setStats(null);
    }, []);

    // Restore the session on page load.
    useEffect(() => {
        let active = true;
        (async () => {
            if (!localStorage.getItem("token")) return setLoading(false);
            try {
                const data = await getProfile();
                if (!active) return;
                setUser(data.user);
                setStats(data.stats);
            } catch (error) {
                // Only a rejected token ends the session; a network blip should not log people out.
                if (error.response?.status === 401) localStorage.removeItem("token");
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, []);

    // Fired by the Axios interceptor when a protected request comes back 401.
    useEffect(() => {
        const onExpired = () => {
            if (!localStorage.getItem("token")) return;
            logout();
            toast.error("Your session has expired. Please log in again.");
        };
        window.addEventListener("auth:expired", onExpired);
        return () => window.removeEventListener("auth:expired", onExpired);
    }, [logout]);

    const login = useCallback((token, nextUser) => {
        localStorage.setItem("token", token);
        setExitTo(null);
        setUser(nextUser);
    }, []);

    const updateUser = useCallback((patch) => setUser((current) => (current ? { ...current, ...patch } : current)), []);

    const value = useMemo(
        () => ({ user, stats, setStats, loading, exitTo, login, logout, updateUser }),
        [user, stats, loading, exitTo, login, logout, updateUser]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
