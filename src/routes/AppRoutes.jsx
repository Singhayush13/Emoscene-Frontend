import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Layouts
import { UserLayout } from "../layouts/UserLayout";
import { AdminLayout } from "../layouts/AdminLayout";

// Auth Pages
import { Register } from "../pages/auth/Register";
import { Login } from "../pages/auth/Login";

// User Pages
import { Home } from "../pages/home/Home";
import { Products } from "../pages/product/Products";
import { ProductDetail } from "../pages/product/ProductDetail";
import { Cart } from "../pages/cart/Cart";
import { Wishlist } from "../pages/wishlist/Wishlist";
import { UserProfile } from "../pages/user/Profile";

// Admin Pages
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminProducts } from "../pages/admin/AdminProducts";
import { AddProduct } from "../pages/admin/AddProduct";
import { EditProduct } from "../pages/admin/EditProduct";
import { AdminUsers } from "../pages/admin/AdminUsers";
import { AdminOrders } from "../pages/admin/AdminOrders";
import { AdminAnalytics } from "../pages/admin/AdminAnalytics";

// Components
import { ProtectedRoute } from "./ProtectedRoute";
import { Loader } from "../components/common";

export const AppRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader fullScreen label="Checking session" />;
    }

    return (
        <Routes>
            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* User Routes */}
            <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                    path="/wishlist"
                    element={
                        isAuthenticated ? (
                            <Wishlist />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        isAuthenticated ? (
                            <UserProfile />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Route>

            {/* Admin Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/add" element={<AddProduct />} />
                <Route path="/admin/products/edit/:id" element={<EditProduct />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
