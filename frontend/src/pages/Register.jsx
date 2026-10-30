import { Navigate } from "react-router-dom";
import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { user, loading } = useAuth();
    if (!loading && user) return <Navigate to="/dashboard" replace />;
    return (
        <div className="grid min-h-screen bg-canvas text-ink lg:grid-cols-2">
            <AuthLeftPanel heading="Stop staring at a blank caption box." text="Upload an image and get content that fits the platform, the tone and the language." />
            <main className="flex items-center justify-center px-6 py-12"><RegisterForm /></main>
        </div>
    );
}
