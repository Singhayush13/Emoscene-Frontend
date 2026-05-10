import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { userAPI, orderAPI } from "../../services/api";
import { User, Lock, LogOut, Edit2, Loader, PackageOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [orders, setOrders] = useState([]);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        fetchOrders();
    }, [user, navigate]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await orderAPI.getMyOrders(token);
            if (response.success) {
                setOrders(response.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await userAPI.updateProfile(formData, token);

            if (response.success) {
                alert("Profile updated successfully");
                setEditing(false);
            } else {
                alert("Error updating profile");
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await userAPI.changePassword(
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                },
                token
            );

            if (response.success) {
                alert("Password changed successfully");
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setChangingPassword(false);
            } else {
                alert("Error changing password");
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
                    My Account
                </h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-4">
                        {[
                            { id: "profile", icon: User, label: "Profile" },
                            { id: "password", icon: Lock, label: "Change Password" },
                            { id: "orders", icon: PackageOpen, label: "Orders" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-purple-600 hover:text-white transition font-bold"
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition font-bold"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Profile Section */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Profile Information
                                </h2>
                                <button
                                    onClick={() => setEditing(!editing)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    <Edit2 size={18} />
                                    {editing ? "Cancel" : "Edit"}
                                </button>
                            </div>

                            {editing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <button
                                        onClick={handleUpdateProfile}
                                        disabled={loading}
                                        className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
                                    >
                                        {loading && (
                                            <Loader
                                                size={20}
                                                className="animate-spin"
                                            />
                                        )}
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Name
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {user?.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Email
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Account Type
                                        </p>
                                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                            {user?.role === "admin"
                                                ? "Admin"
                                                : "Customer"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Change Password Section */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Change Password
                                </h2>
                                <button
                                    onClick={() =>
                                        setChangingPassword(!changingPassword)
                                    }
                                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                                >
                                    {changingPassword ? "Cancel" : "Change"}
                                </button>
                            </div>

                            {changingPassword && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    currentPassword:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    newPassword: e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <button
                                        onClick={handleChangePassword}
                                        disabled={loading}
                                        className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Orders Section */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Order History
                            </h2>

                            {orders.length === 0 ? (
                                <p className="text-gray-600 dark:text-gray-400">
                                    No orders yet
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div
                                            key={order._id}
                                            className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    Order #{order._id.slice(-8)}
                                                </p>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${order.status ===
                                                            "completed"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                ₹{order.totalAmount}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
