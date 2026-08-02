import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

const DEV_MODE = true; // Change to false when login is ready

export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    if (DEV_MODE) {
        return <Outlet />;
    }
    if (loading) {
        return <Loader />;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}