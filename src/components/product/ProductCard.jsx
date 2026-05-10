import { Link } from "react-router-dom";
import { Clock, Heart, ShoppingCart, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);
    const [showAddToCart, setShowAddToCart] = useState(false);

    const isInWishlist = wishlist.some((item) => item._id === product._id);
    const rating = Number(product.rating || 0);
    const imageSrc = product.images?.[0] || "/placeholder.png";

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                product,
                quantity: 1,
            })
        );
        setShowAddToCart(true);
        setTimeout(() => setShowAddToCart(false), 2000);
    };

    const handleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_22px_70px_rgba(73,45,28,0.09)] transition duration-500 hover:-translate-y-1 hover:border-amber-300/70 hover:shadow-[0_30px_90px_rgba(159,83,37,0.18)] dark:border-white/10 dark:bg-[#11100f] dark:shadow-[0_22px_70px_rgba(0,0,0,0.3)] dark:hover:border-amber-300/30">
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 dark:from-stone-900 dark:via-[#1b1110] dark:to-[#321a12]">
                <Link to={`/product/${product._id}`} className="block h-full">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-white/10 opacity-70 transition duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </div>
                    {product.featured ? (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-black text-stone-950 shadow-lg shadow-amber-500/20">
                            <Sparkles size={13} />
                            Featured
                        </div>
                    ) : null}
                </div>

                <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition duration-300 ${isInWishlist
                        ? "border-red-400 bg-red-500 text-white shadow-lg shadow-red-500/25"
                        : "border-white/35 bg-white/80 text-stone-700 hover:bg-red-500 hover:text-white dark:bg-black/35 dark:text-white"
                        }`}
                >
                    <Heart size={19} fill={isInWishlist ? "currentColor" : "none"} />
                </button>
            </div>

            <div className="space-y-4 p-5">
                <div className="flex flex-wrap gap-2">
                    {product.mood ? (
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-500/15 dark:text-purple-200">
                            {product.mood}
                        </span>
                    ) : null}
                    {product.category ? (
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-200">
                            {product.category}
                        </span>
                    ) : null}
                </div>

                <div>
                    <Link to={`/product/${product._id}`}>
                        <h3 className="line-clamp-2 text-lg font-black leading-snug text-stone-950 transition hover:text-orange-600 dark:text-white dark:hover:text-orange-300">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3 border-y border-stone-100 py-3 dark:border-white/10">
                    {rating > 0 ? (
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        size={14}
                                        className={index < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-stone-300 dark:text-stone-700"}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                                {product.numReviews || 0}
                            </span>
                        </div>
                    ) : (
                        <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">New arrival</span>
                    )}

                    {product.burnTime ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400">
                            <Clock size={14} />
                            {product.burnTime}
                        </span>
                    ) : null}
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-2xl font-black text-stone-950 dark:text-white">
                            Rs. {product.price}
                        </p>
                        {product.waxType ? (
                            <p className="mt-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                                {product.waxType}
                            </p>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`inline-flex h-12 min-w-12 items-center justify-center rounded-full px-4 text-sm font-black transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${showAddToCart
                            ? "bg-emerald-500 text-white"
                            : "bg-stone-950 text-white hover:bg-orange-600 dark:bg-white dark:text-stone-950 dark:hover:bg-orange-300"
                            }`}
                    >
                        {showAddToCart ? "Added" : <ShoppingCart size={20} />}
                    </button>
                </div>
            </div>
        </article>
    );
};
