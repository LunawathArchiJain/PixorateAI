import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
    return (
        <div className="min-h-screen bg-[#f8f6ff]">
            <div className="grid lg:grid-cols-2 min-h-screen">
                <AuthLeftPanel />
                <LoginForm />
            </div>
        </div>
    );
}