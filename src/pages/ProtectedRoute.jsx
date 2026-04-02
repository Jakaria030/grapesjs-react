import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/ui/Loading";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Loading />;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;