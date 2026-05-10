import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Heart, Share2, AlertCircle, Loader } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { useProducts } from "../../hooks/useProducts";
import { useAuth } from "../../hooks/useAuth";
import { trackProductWhatsappClick } from "../../services/productService";
import ProductImages from "./ProductImages";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useAuth();
    const { getProductById, singleProduct, loading, error } = useProducts();
    const wishlist = useSelector((state) => state.wishlist.items);
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const isInWishlist = singleProduct && wishlist.some((item) => item._id === singleProduct._id);

    useEffect(() => {
        if (id) {
            getProductById(id);
        }
    }, [id, getProductById]);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (singleProduct.stock === 0) {
            setAlertMessage("This product is out of stock");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        dispatch(
            addToCart({
                product: singleProduct,
                quantity: parseInt(quantity),
            })
        );

        setAlertMessage(`${quantity} item(s) added to cart!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        setQuantity(1);
    };

    const handleWishlist = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (isInWishlist) {
            dispatch(removeFromWishlist(singleProduct._id));
            setAlertMessage("Removed from wishlist");
        } else {
            dispatch(addToWishlist(singleProduct));
            setAlertMessage("Added to wishlist");
        }
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleWhatsappClick = async () => {
        try {
            await trackProductWhatsappClick(singleProduct._id);

            const message = `Hi, I'm interested in ${singleProduct.name}. Price: ₹${singleProduct.price}. Can you provide more details?`;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
        } catch (error) {
            console.error("Error tracking WhatsApp click:", error);
        }
    };

    const handleShare = () => {
        const shareUrl = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: singleProduct.name,
                text: singleProduct.description,
                url: shareUrl,
            });
        } else {
            navigator.clipboard.writeText(shareUrl);
            setAlertMessage("Product link copied to clipboard!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader size={40} className="animate-spin text-purple-600" />
            </div>
        );
    }

    if (error || !singleProduct) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                    <AlertCircle size={24} />
                    <span>{error || "Product not found"}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Alert Message */}
            {showAlert && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
                    {alertMessage}
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <button onClick={() => navigate("/")} className="hover:text-purple-600">
                        Home
                    </button>
                    <span>/</span>
                    <button onClick={() => navigate("/products")} className="hover:text-purple-600">
                        Products
                    </button>
                    <span>/</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{singleProduct.name}</span>
                </div>

                {/* Product Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Images */}
                    <ProductImages images={singleProduct.images} productName={singleProduct.name} />

                    {/* Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                        {/* Stock Status */}
                        {singleProduct.stock === 0 && (
                            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
                                <AlertCircle size={20} />
                                <span>Out of Stock</span>
                            </div>
                        )}

                        {/* Title & Badges */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {singleProduct.name}
                        </h1>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {singleProduct.featured && (
                                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    ⭐ Featured
                                </span>
                            )}
                            <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                                {singleProduct.mood}
                            </span>
                            <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm">
                                {singleProduct.category}
                            </span>
                        </div>

                        {/* Rating */}
                        {singleProduct.rating > 0 && (
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-xl ${i < Math.round(singleProduct.rating)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {singleProduct.rating.toFixed(1)}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    ({singleProduct.numReviews} reviews)
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                                ₹{singleProduct.price}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {singleProduct.stock > 0 ? `${singleProduct.stock} in stock` : "Out of stock"}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {singleProduct.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {singleProduct.burnTime && (
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">🔥 Burn Time</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            {singleProduct.burnTime}
                                        </p>
                                    </div>
                                )}
                                {singleProduct.waxType && (
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">🕯️ Wax Type</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            {singleProduct.waxType}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Fragrance Notes */}
                            {singleProduct.fragranceNotes && singleProduct.fragranceNotes.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">🌸 Fragrance Notes</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {singleProduct.fragranceNotes.map((note, index) => (
                                            <span
                                                key={index}
                                                className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm"
                                            >
                                                {note}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        disabled={quantity === 1}
                                    >
                                        −
                                    </button>
                                    <span className="px-6 py-2 text-gray-900 dark:text-white font-semibold">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setQuantity(Math.min(singleProduct.stock, quantity + 1))
                                        }
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        disabled={quantity >= singleProduct.stock}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={singleProduct.stock === 0}
                                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>

                            <button
                                onClick={handleWishlist}
                                className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold transition ${isInWishlist
                                        ? "bg-red-500 hover:bg-red-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                                    }`}
                            >
                                <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                                {isInWishlist ? "Wishlisted" : "Wishlist"}
                            </button>
                        </div>

                        {/* Additional Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={handleWhatsappClick}
                                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
                            >
                                💬 WhatsApp Inquiry
                            </button>

                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
                            >
                                <Share2 size={20} />
                                Share
                            </button>
                        </div>

                        {/* Meta Info */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                            <p>Product ID: {singleProduct._id}</p>
                            <p>Views: {singleProduct.views}</p>
                            {singleProduct.whatsappClicks > 0 && (
                                <p>WhatsApp Inquiries: {singleProduct.whatsappClicks}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ProductReviews productId={singleProduct._id} />

                {/* Related Products */}
                <RelatedProducts
                    currentProductId={singleProduct._id}
                    category={singleProduct.category}
                    mood={singleProduct.mood}
                />
            </div>
        </div>
    );
};

export default ProductDetails;
