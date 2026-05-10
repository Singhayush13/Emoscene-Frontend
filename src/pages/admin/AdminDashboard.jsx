import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { analyticsAPI } from "../../services/api";
import {
    setLoading,
    setStats,
    setDailyVisitors,
    setTopViewedProducts,
} from "../../redux/slices/analyticsSlice";
import { Users, Package, ShoppingCart, TrendingUp, Loader } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const analytics = useSelector((state) => state.analytics);
    const [loading, setLoadingState] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchAnalytics = async () => {
            try {
                setLoadingState(true);
                dispatch(setLoading(true));

                const [stats, visitors, topProducts] = await Promise.all([
                    analyticsAPI.getDashboardStats(token),
                    analyticsAPI.getDailyVisitors(token),
                    analyticsAPI.getTopViewedProducts(token),
                ]);

                if (stats.success) {
                    dispatch(setStats(stats.stats));
                }
                if (visitors.success) {
                    dispatch(setDailyVisitors(visitors.visitors));
                }
                if (topProducts.success) {
                    dispatch(setTopViewedProducts(topProducts.products));
                }
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoadingState(false);
                dispatch(setLoading(false));
            }
        };

        fetchAnalytics();
    }, [dispatch]);

    const statCards = [
        {
            title: "Total Users",
            value: analytics.stats.totalUsers,
            icon: Users,
            color: "from-blue-500 to-blue-600",
        },
        {
            title: "Total Products",
            value: analytics.stats.totalProducts,
            icon: Package,
            color: "from-purple-500 to-purple-600",
        },
        {
            title: "Total Orders",
            value: analytics.stats.totalOrders,
            icon: ShoppingCart,
            color: "from-orange-500 to-orange-600",
        },
        {
            title: "Total Revenue",
            value: `₹${analytics.stats.totalRevenue}`,
            icon: TrendingUp,
            color: "from-green-500 to-green-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Here's what's happening with your store today.
                    </p>
                </div>

                {/* Stat Cards */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-purple-600" size={40} />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {statCards.map((card, i) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={i}
                                        className={`bg-gradient-to-br ${card.color} text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-sm font-medium opacity-90">
                                                {card.title}
                                            </h3>
                                            <Icon size={24} />
                                        </div>
                                        <p className="text-3xl font-bold">{card.value}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {[
                                {
                                    title: "Manage Products",
                                    desc: "Add, edit, or delete products",
                                    link: "/admin/products",
                                    color: "from-purple-500 to-pink-500",
                                },
                                {
                                    title: "View Orders",
                                    desc: "Check and manage customer orders",
                                    link: "/admin/orders",
                                    color: "from-blue-500 to-cyan-500",
                                },
                                {
                                    title: "Manage Users",
                                    desc: "Block or manage user accounts",
                                    link: "/admin/users",
                                    color: "from-orange-500 to-red-500",
                                },
                                {
                                    title: "Analytics",
                                    desc: "View detailed analytics",
                                    link: "/admin/analytics",
                                    color: "from-green-500 to-emerald-500",
                                },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    to={action.link}
                                    className={`bg-gradient-to-br ${action.color} text-white rounded-lg p-8 hover:shadow-xl transition transform hover:scale-105 group`}
                                >
                                    <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
                                    <p className="opacity-90 mb-4">{action.desc}</p>
                                    <div className="inline-flex items-center gap-2 opacity-75 group-hover:opacity-100 transition">
                                        View Details →
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Top Products */}
                        {analytics.topViewedProducts.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Top Viewed Products
                                </h2>
                                <div className="space-y-4">
                                    {analytics.topViewedProducts.slice(0, 5).map((product, i) => (
                                        <div
                                            key={product._id}
                                            className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                                                #{i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {product.views} views
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-purple-600 dark:text-purple-400">
                                                    ₹{product.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
