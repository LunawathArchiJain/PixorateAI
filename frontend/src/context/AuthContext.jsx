import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/userService";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setLoading(false);
                    return;
                }
                const data = await getProfile();
                setUser(data.user);
            } catch (err) {
                console.log(err);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);
    const login = (token, user) => {
        localStorage.setItem("token", token);
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);