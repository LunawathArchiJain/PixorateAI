import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
    return (
        <div className="min-h-screen bg-[#f8f6ff]">

            <div className="grid lg:grid-cols-2 min-h-screen">

                <AuthLeftPanel />

                <RegisterForm />

            </div>

        </div>
    );
}