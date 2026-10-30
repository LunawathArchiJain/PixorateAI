import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { updatePreferences } from "../services/userService";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const { user, updateUser } = useAuth();
    // `local` is this browser's last choice (used when logged out); `chosen` is a click made by the current user.
    const [local, setLocal] = useState(() => (localStorage.getItem("theme") === "dark" ? "dark" : "light"));
    const [chosen, setChosen] = useState(null);

    // Active theme: what the user just clicked, else their saved account theme, else this browser's choice.
    const mine = chosen && chosen.userId === user?.id ? chosen.value : null;
    const theme = mine ?? user?.preferences?.theme ?? local;

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const setTheme = useCallback(
        (next) => {
            setLocal(next);
            if (!user) return;
            setChosen({ userId: user.id, value: next });
            updatePreferences({ theme: next }).then((data) => updateUser(data.user)).catch(() => {});
        },
        [user, updateUser]
    );
    const toggleTheme = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme, setTheme]);

    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
