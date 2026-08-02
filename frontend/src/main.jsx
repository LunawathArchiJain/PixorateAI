import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <AuthProvider>
            <BrowserRouter>
                <App />
                <Toaster position="top-right"/>
            </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
);