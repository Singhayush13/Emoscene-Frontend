import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { orderAPI } from "../../services/api";
import { Package, Loader, Search, CheckCircle, Clock } from "lucide-react";

export const AdminOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await orderAPI.getAllOrders(token);
            if (response.success) {
                setOrders(response.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const response = await orderAPI.updateOrderStatus(
                orderId,
                newStatus,
                token
            );

            if (response.success) {
                setOrders(
                    orders.map((o) =>
                        o._id === orderId ? { ...o, status: newStatus } : o
                    )
                );
                alert("Order status updated");
            } else {
                alert("Error updating order");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            order.user?.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Orders Management
                </h1>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <p className="text-gray-600 dark:text-gray-400">
                                Total Orders: <span className="font-bold">{filteredOrders.length}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-purple-600" size={40} />
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                        <Package size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            No orders found
                        </p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Customer
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Items
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-6 py-4 font-bold text-purple-600 dark:text-purple-400">
                                                #{order._id.slice(-8)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">
                                                        {order.user?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {order.user?.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                                ₹{order.totalAmount}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {order.items?.length} items
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status] ||
                                                        "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        handleUpdateOrderStatus(
                                                            order._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-3 py-1 border rounded-lg text-sm dark:bg-gray-700 cursor-pointer"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">
                                                        Processing
                                                    </option>
                                                    <option value="shipped">
                                                        Shipped
                                                    </option>
                                                    <option value="delivered">
                                                        Delivered
                                                    </option>
                                                    <option value="cancelled">
                                                        Cancelled
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
