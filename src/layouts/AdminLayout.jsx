import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Package, Users, BarChart3, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const { isDark, toggleDarkMode } = useTheme();
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: "Dashboard", href: "/admin" },
        { icon: Package, label: "Products", href: "/admin/products" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: Package, label: "Orders", href: "/admin/orders" },
        { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    ];

    const isActive = (href) => location.pathname === href;

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static w-64 h-screen bg-gradient-to-b from-purple-600 to-purple-800 text-white z-40 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-8 flex flex-col h-full">
                    {/* Logo */}
                    <div className="mb-12">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                            <span className="text-3xl">🕯️</span>
                            <span>Emoscene</span>
                        </Link>
                        <p className="text-purple-200 text-xs mt-2">Admin Panel</p>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(item.href)
                                        ? "bg-purple-400 text-white"
                                        : "text-purple-100 hover:bg-purple-700"
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Section */}
                    <div className="space-y-3 border-t border-purple-700 pt-4">
                        {/* User Info */}
                        <div className="px-4 py-3">
                            <p className="text-xs text-purple-200">Logged in as</p>
                            <p className="font-bold text-white">{user?.name}</p>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-purple-100 hover:bg-purple-700 transition"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                        </button>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-bold"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full lg:ml-0">
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 lg:p-8 mt-16 lg:mt-0">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome to Admin Panel
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your store efficiently
                    </p>
                </div>

                {/* Page Content */}
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};
