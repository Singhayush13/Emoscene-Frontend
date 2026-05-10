import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "lucide-react";
import { AdminDashboard } from "../admin/AdminDashboard";
import { AdminProducts } from "../admin/AdminProducts";
import { AddProduct } from "../admin/AddProduct";
import { EditProduct } from "../admin/EditProduct";
import { AdminOrders } from "../admin/AdminOrders";
import { AdminUsers } from "../admin/AdminUsers";
import { AdminAnalytics } from "../admin/AdminAnalytics";

// Admin Protected Route Component
const AdminProtectedRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader size={40} className="animate-spin text-purple-600" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: (
            <AdminProtectedRoute>
                <AdminDashboard />
            </AdminProtectedRoute>
        ),
    },
    {
        path: "/admin/products",
        element: (
            <AdminProtectedRoute>
                <AdminProducts />
            </AdminProtectedRoute>
        ),
    },
    {
        path: "/admin/products/add",
        element: (
            <AdminProtectedRoute>
                <AddProduct />
            </AdminProtectedRoute>
        ),
    },
    {
        path: "/admin/products/edit/:id",
        element: (
            <AdminProtectedRoute>
                <EditProduct />
            </AdminProtectedRoute>
        ),
    },
    {
        path: "/admin/orders",
        element: (
            <AdminProtectedRoute>
                <AdminOrders />
            </AdminProtectedRoute>
        ),
    },
    {
        path: "/admin/users",
        element: (
            <AdminProtectedRoute>
                <AdminUsers />
            </AdminProtectedRoute>
        ),
    },
    {
        path: "/admin/analytics",
        element: (
            <AdminProtectedRoute>
                <AdminAnalytics />
            </AdminProtectedRoute>
        ),
    },
];
