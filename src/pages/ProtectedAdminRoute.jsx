import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = () => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <Loading />;

    if (!isAuthenticated) return <Navigate to="/" />;
    if (!isAdmin) return <Navigate to="/dashboard" />;

    return <Outlet />;
};

export default ProtectedAdminRoute;