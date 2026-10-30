import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 90000, // generation can take a while
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// An expired or invalid session on a protected call signs the user out (AuthContext listens for this).
// Wrong-password style 401s from the login form itself are left alone.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthForm = String(error.config?.url || "").startsWith("/auth/");
        if (error.response?.status === 401 && !isAuthForm) window.dispatchEvent(new Event("auth:expired"));
        return Promise.reject(error);
    }
);

export default api;
