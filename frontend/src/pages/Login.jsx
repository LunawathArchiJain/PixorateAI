import { Navigate } from "react-router-dom";
import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { user, loading } = useAuth();
    if (!loading && user) return <Navigate to="/dashboard" replace />;
    return (
        <div className="grid min-h-screen bg-canvas text-ink lg:grid-cols-2">
            <AuthLeftPanel heading="Your image already has the story." text="Log in to turn it into captions, posts, scripts and more." />
            <main className="flex items-center justify-center px-6 py-12"><LoginForm /></main>
        </div>
    );
}
