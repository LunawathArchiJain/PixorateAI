import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster } from "react-hot-toast";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MotionConfig reducedMotion="user">
            <AuthProvider>
                <ThemeProvider>
                    <BrowserRouter>
                        <App />
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                style: { background: "#000", color: "#F6F5F1", border: "1px solid #2C2C2C", borderRadius: "8px", fontSize: "14px" },
                                success: { iconTheme: { primary: "#FF5A00", secondary: "#000" } },
                            }}
                        />
                    </BrowserRouter>
                </ThemeProvider>
            </AuthProvider>
        </MotionConfig>
    </React.StrictMode>
);
