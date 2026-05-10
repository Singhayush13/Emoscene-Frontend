import { useEffect, useState } from "react";
import { Star, User, Calendar, Loader, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProductReviews = ({ productId }) => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userReview, setUserReview] = useState("");
    const [userRating, setUserRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        // TODO: Fetch reviews from backend when review endpoints are created
        // fetchProductReviews(productId);
    }, [productId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (!userReview.trim()) {
            alert("Please write a review");
            return;
        }

        setSubmitting(true);
        try {
            // TODO: Submit review to backend
            // const response = await submitReview(productId, {
            //     rating: userRating,
            //     comment: userReview,
            // });

            // Mock review submission
            const newReview = {
                _id: Date.now(),
                author: user?.name || "Anonymous",
                rating: userRating,
                comment: userReview,
                createdAt: new Date().toISOString(),
            };

            setReviews([newReview, ...reviews]);
            setUserReview("");
            setUserRating(5);

            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    const StarRating = ({ rating, onHover, onClick, interactive = false }) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onMouseEnter={() => interactive && onHover(star)}
                        onMouseLeave={() => interactive && onHover(0)}
                        onClick={() => interactive && onClick(star)}
                        className={`transition ${interactive ? "cursor-pointer" : ""}`}
                    >
                        <Star
                            size={interactive ? 28 : 20}
                            className={`${star <= (interactive ? hoverRating || rating : rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Customer Reviews</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review Form */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-fit sticky top-24">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Share Your Review</h3>

                    {!isAuthenticated ? (
                        <div className="p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
                            <p className="text-sm">
                                Please{" "}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="font-bold hover:underline"
                                >
                                    login
                                </button>{" "}
                                to submit a review.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Rating
                                </label>
                                <StarRating
                                    rating={userRating}
                                    onHover={setHoverRating}
                                    onClick={setUserRating}
                                    interactive={true}
                                />
                            </div>

                            {/* Review Text */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    value={userReview}
                                    onChange={(e) => setUserReview(e.target.value)}
                                    placeholder="Share your experience with this product..."
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    rows="4"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <Loader size={18} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Review"
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader size={32} className="animate-spin text-purple-600" />
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                No reviews yet. Be the first to review this product!
                            </p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition"
                            >
                                {/* Review Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                                            {review.author?.charAt(0).toUpperCase() || "A"}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {review.author || "Anonymous"}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Calendar size={14} />
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={18}
                                            className={
                                                star <= review.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {review.comment}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;
