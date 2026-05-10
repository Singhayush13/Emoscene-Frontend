import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { productAPI } from "../../services/api";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Loader } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productAPI.getAllProducts({});
            if (response.success) {
                setProducts(response.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await productAPI.deleteProduct(id, token);
                if (response.success) {
                    setProducts(products.filter((p) => p._id !== id));
                    alert("Product deleted successfully");
                } else {
                    alert("Error deleting product");
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
    };

    const handleToggleFeatured = async (id, isFeatured) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("featured", !isFeatured);

            const response = await productAPI.updateProduct(id, formData, token);
            if (response.success) {
                setProducts(
                    products.map((p) =>
                        p._id === id ? { ...p, featured: !p.featured } : p
                    )
                );
            } else {
                alert("Error: " + response.message);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("isActive", !isActive);

            const response = await productAPI.updateProduct(id, formData, token);
            if (response.success) {
                setProducts(
                    products.map((p) =>
                        p._id === id ? { ...p, isActive: !p.isActive } : p
                    )
                );
            } else {
                alert("Error: " + response.message);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Product Management
                    </h1>
                    <Link
                        to="/admin/products/add"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                    >
                        <Plus size={20} />
                        Add Product
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500"
                    />
                </div>

                {/* Products Table */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-purple-600" size={40} />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-400">No products found</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Product
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Stock
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Views
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.images?.[0] || "/placeholder.png"}
                                                        alt={product.name}
                                                        className="w-10 h-10 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-gray-900 dark:text-white">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            {product.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-purple-600 dark:text-purple-400">
                                                ₹{product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-bold ${product.stock > 0
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                                        }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                                                {product.views}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {product.featured && (
                                                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-2 py-1 rounded-full flex items-center gap-1">
                                                            <Star size={12} /> Featured
                                                        </span>
                                                    )}
                                                    {!product.isActive && (
                                                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-1 rounded-full">
                                                            Hidden
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleToggleFeatured(
                                                                product._id,
                                                                product.featured
                                                            )
                                                        }
                                                        className={`p-2 rounded-lg transition ${product.featured
                                                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
                                                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                                            }`}
                                                    >
                                                        <Star size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                product._id,
                                                                product.isActive
                                                            )
                                                        }
                                                        className={`p-2 rounded-lg transition ${product.isActive
                                                            ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                                                            : "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                                                            }`}
                                                    >
                                                        {product.isActive ? (
                                                            <Eye size={18} />
                                                        ) : (
                                                            <EyeOff size={18} />
                                                        )}
                                                    </button>
                                                    <Link
                                                        to={`/admin/products/edit/${product._id}`}
                                                        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                                                    >
                                                        <Edit2 size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition"
                                                    >
                                                        <Trash2 size={18} />
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
