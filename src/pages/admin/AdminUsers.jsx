import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { userAPI } from "../../services/api";
import { Users, Loader, Search, Ban, CheckCircle } from "lucide-react";

export const AdminUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await userAPI.getAllUsers(token);
            if (response.success) {
                setUsers(response.users);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUser = async (userId, isBlocked) => {
        if (
            window.confirm(
                `Are you sure you want to ${isBlocked ? "unblock" : "block"} this user?`
            )
        ) {
            try {
                const token = localStorage.getItem("token");
                const response = await userAPI.toggleBlockUser(userId, token);

                if (response.success) {
                    setUsers(
                        users.map((u) =>
                            u._id === userId
                                ? { ...u, isBlocked: !u.isBlocked }
                                : u
                        )
                    );
                    alert(`User ${isBlocked ? "unblocked" : "blocked"}`);
                } else {
                    alert("Error updating user");
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await userAPI.deleteUser(userId, token);

                if (response.success) {
                    setUsers(users.filter((u) => u._id !== userId));
                    alert("User deleted successfully");
                } else {
                    alert("Error deleting user");
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: users.length,
        active: users.filter((u) => !u.isBlocked).length,
        blocked: users.filter((u) => u.isBlocked).length,
        admins: users.filter((u) => u.role === "admin").length,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Users Management
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Users", value: stats.total, color: "from-blue-500 to-blue-600" },
                        { label: "Active", value: stats.active, color: "from-green-500 to-green-600" },
                        { label: "Blocked", value: stats.blocked, color: "from-red-500 to-red-600" },
                        { label: "Admins", value: stats.admins, color: "from-purple-500 to-purple-600" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className={`bg-gradient-to-br ${stat.color} text-white rounded-lg p-6`}
                        >
                            <p className="text-sm opacity-90 mb-2">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500"
                        />
                    </div>
                </div>

                {/* Users Table */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-purple-600" size={40} />
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                        <Users size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            No users found
                        </p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            User
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Joined
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((u) => (
                                        <tr
                                            key={u._id}
                                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                                {u.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {u.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === "admin"
                                                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                                        }`}
                                                >
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${u.isBlocked
                                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                        }`}
                                                >
                                                    {u.isBlocked
                                                        ? "Blocked"
                                                        : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(
                                                    u.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleBlockUser(
                                                                u._id,
                                                                u.isBlocked
                                                            )
                                                        }
                                                        className={`px-3 py-1 rounded-lg text-sm font-bold transition ${u.isBlocked
                                                                ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                                                                : "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                                                            }`}
                                                    >
                                                        {u.isBlocked ? (
                                                            <CheckCircle size={18} />
                                                        ) : (
                                                            <Ban size={18} />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteUser(u._id)
                                                        }
                                                        className="px-3 py-1 rounded-lg text-sm font-bold bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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
