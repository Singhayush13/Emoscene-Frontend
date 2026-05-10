import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { Trash2, ShoppingBag, ArrowLeft, Heart } from "lucide-react";

export const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity: 1 }));
        dispatch(removeFromWishlist(product._id));
    };

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
                <div className="text-center">
                    <Heart size={64} className="mx-auto text-gray-400 mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Your wishlist is empty
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Add items to your wishlist to save them for later
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                    >
                        <ArrowLeft size={20} />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-8 hover:underline"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
                    My Wishlist
                </h1>

                <div className="grid md:grid-cols-4 gap-6">
                    {wishlistItems.map((product) => (
                        <div
                            key={product._id}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105"
                        >
                            {/* Image */}
                            <Link
                                to={`/product/${product._id}`}
                                className="block relative overflow-hidden bg-gray-200 dark:bg-gray-700 h-48"
                            >
                                <img
                                    src={product.images?.[0] || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-110 transition"
                                />
                                {product.featured && (
                                    <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                                        Featured
                                    </span>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="p-4">
                                <Link
                                    to={`/product/${product._id}`}
                                    className="block"
                                >
                                    <h3 className="font-bold text-gray-900 dark:text-white hover:text-purple-600 mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="flex gap-2 mb-3">
                                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full">
                                        {product.mood}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-full">
                                        {product.category}
                                    </span>
                                </div>

                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                                    ₹{product.price}
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white text-sm font-bold rounded-lg hover:shadow-lg transition"
                                    >
                                        <ShoppingBag size={16} />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
