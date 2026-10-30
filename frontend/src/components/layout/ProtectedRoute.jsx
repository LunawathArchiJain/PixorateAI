import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

export default function ProtectedRoute() {
    const { user, loading, exitTo } = useAuth();
    const location = useLocation();
    if (loading) return <Loader />;
    if (!user) return exitTo ? <Navigate to={exitTo} replace /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
    return <Outlet />;
}
