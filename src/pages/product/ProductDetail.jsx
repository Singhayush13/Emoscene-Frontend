import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { productAPI, reviewAPI } from "../../services/api";
import { Heart, ShoppingCart, Star, Loader, ArrowLeft } from "lucide-react";

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);
    const cart = useSelector((state) => state.cart.items);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    const isInWishlist = wishlist.some((item) => item._id === id);
    const isInCart = cart.some((item) => item.product._id === id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getProductById(id);
                if (response.success) {
                    setProduct(response.product);
                }

                const reviewsResponse = await reviewAPI.getProductReviews(id);
                if (reviewsResponse.success) {
                    setReviews(reviewsResponse.reviews);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                product,
                quantity,
            })
        );
    };

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    const handleSubmitReview = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setSubmittingReview(true);
            const response = await reviewAPI.addReview(
                id,
                { rating, comment: reviewText },
                token
            );

            if (response.success) {
                setReviewText("");
                setRating(5);
                const reviewsResponse = await reviewAPI.getProductReviews(id);
                if (reviewsResponse.success) {
                    setReviews(reviewsResponse.reviews);
                }
            }
        } catch (error) {
            alert("Error submitting review: " + error.message);
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <Loader className="animate-spin text-purple-600" size={40} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                        Product not found
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const avgRating =
        reviews.length > 0
            ? (
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
            : 0;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-8 hover:underline"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </button>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                            <img
                                src={product.images?.[selectedImage] || "/placeholder.png"}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        <div className="flex gap-2">
                            {product.images?.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${selectedImage === i
                                            ? "border-purple-600"
                                            : "border-gray-300 dark:border-gray-700"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt="thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full text-sm font-bold mb-2">
                                {product.category}
                            </span>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={
                                                i < Math.round(avgRating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {avgRating} ({reviews.length} reviews)
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                            {product.description}
                        </p>

                        {/* Price & Stock */}
                        <div className="mb-6 pb-6 border-b border-gray-300 dark:border-gray-700">
                            <div className="flex items-center gap-4 mb-4">
                                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                                    ₹{product.price}
                                </p>
                                {product.originalPrice && (
                                    <p className="text-xl line-through text-gray-500">
                                        ₹{product.originalPrice}
                                    </p>
                                )}
                            </div>
                            <div
                                className={`text-lg font-bold ${product.stock > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {product.stock > 0
                                    ? `${product.stock} in stock`
                                    : "Out of stock"}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mb-6 space-y-3">
                            <div className="flex gap-4">
                                <span className="font-bold text-gray-900 dark:text-white">
                                    Mood:
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {product.mood}
                                </span>
                            </div>
                            {product.burnTime && (
                                <div className="flex gap-4">
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        Burn Time:
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {product.burnTime} hours
                                    </span>
                                </div>
                            )}
                            {product.waxType && (
                                <div className="flex gap-4">
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        Wax Type:
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {product.waxType}
                                    </span>
                                </div>
                            )}
                            {product.fragranceNotes && (
                                <div className="flex gap-4">
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        Notes:
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {product.fragranceNotes}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex gap-4 mb-6">
                            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                                <button
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                >
                                    −
                                </button>
                                <span className="px-4 font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50"
                            >
                                <ShoppingCart size={20} />
                                {isInCart ? "Already in Cart" : "Add to Cart"}
                            </button>

                            <button
                                onClick={handleToggleWishlist}
                                className={`px-6 py-3 rounded-lg transition font-bold ${isInWishlist
                                        ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                <Heart
                                    size={24}
                                    className={isInWishlist ? "fill-current" : ""}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Reviews ({reviews.length})
                    </h2>

                    {/* Add Review Form */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Add Your Review
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Rating
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRating(r)}
                                            className="transition"
                                        >
                                            <Star
                                                size={28}
                                                className={
                                                    r <= rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Comment
                                </label>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewText(e.target.value)
                                    }
                                    placeholder="Share your thoughts..."
                                    rows="4"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
                                />
                            </div>
                            <button
                                onClick={handleSubmitReview}
                                disabled={submittingReview || !reviewText}
                                className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
                            >
                                {submittingReview
                                    ? "Submitting..."
                                    : "Submit Review"}
                            </button>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {reviews.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                                No reviews yet. Be the first to review!
                            </p>
                        ) : (
                            reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {review.user?.name || "Anonymous"}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={
                                                        i <
                                                            review.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {review.comment}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
