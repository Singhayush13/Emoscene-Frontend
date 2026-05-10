import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { analyticsAPI } from "../../services/api";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Loader, TrendingUp } from "lucide-react";

export const AdminAnalytics = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dailyVisitors, setDailyVisitors] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        todayRevenue: 0,
        monthlyGrowth: 0,
    });

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const [statsRes, visitorsRes, productsRes] = await Promise.all([
                analyticsAPI.getDashboardStats(token),
                analyticsAPI.getDailyVisitors(token),
                analyticsAPI.getTopViewedProducts(token),
            ]);

            if (statsRes.success) {
                setStats(statsRes.stats);
            }
            if (visitorsRes.success) {
                setDailyVisitors(visitorsRes.visitors || []);
            }
            if (productsRes.success) {
                setTopProducts(productsRes.products || []);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader className="animate-spin text-purple-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Analytics Dashboard
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            title: "Total Users",
                            value: stats.totalUsers,
                            color: "from-blue-500 to-blue-600",
                        },
                        {
                            title: "Total Products",
                            value: stats.totalProducts,
                            color: "from-purple-500 to-purple-600",
                        },
                        {
                            title: "Total Orders",
                            value: stats.totalOrders,
                            color: "from-orange-500 to-orange-600",
                        },
                        {
                            title: "Total Revenue",
                            value: `₹${stats.totalRevenue}`,
                            color: "from-green-500 to-green-600",
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className={`bg-gradient-to-br ${card.color} text-white rounded-lg p-6 shadow-lg`}
                        >
                            <p className="text-sm opacity-90 mb-2">{card.title}</p>
                            <p className="text-3xl font-bold">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Daily Visitors Chart */}
                    {dailyVisitors.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Daily Visitors
                            </h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dailyVisitors}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="visitors"
                                        stroke="#9333ea"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Top Products Chart */}
                    {topProducts.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Top 10 Viewed Products
                            </h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={topProducts.slice(0, 10)}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={100}
                                    />
                                    <Tooltip />
                                    <Bar
                                        dataKey="views"
                                        fill="#f97316"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Additional Metrics */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Today's Revenue */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Today's Revenue
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ₹{stats.todayRevenue}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Growth */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Monthly Growth
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.monthlyGrowth}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
