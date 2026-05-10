import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

const formatPrice = (price) => `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const { product, quantity } = item;
    const canDecrease = quantity > 1;

    return (
        <article className="grid gap-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:grid-cols-[120px_1fr_auto] sm:p-5">
            <Link to={`/product/${product._id}`} className="block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    className="h-36 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-28"
                />
            </Link>

            <div className="min-w-0">
                <Link
                    to={`/product/${product._id}`}
                    className="line-clamp-2 text-lg font-bold text-gray-950 transition hover:text-orange-600 dark:text-white"
                >
                    {product.name}
                </Link>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {[product.mood, product.category].filter(Boolean).join(" / ")}
                </p>
                <p className="mt-3 text-xl font-black text-purple-700 dark:text-purple-300">
                    {formatPrice(product.price)}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Item total: {formatPrice(product.price * quantity)}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
                    <button
                        type="button"
                        onClick={() => onQuantityChange(product._id, quantity - 1)}
                        disabled={!canDecrease}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-700"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="min-w-10 text-center text-sm font-black text-gray-950 dark:text-white">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => onQuantityChange(product._id, quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-white dark:text-gray-200 dark:hover:bg-gray-700"
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => onRemove(product._id)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/40"
                >
                    <Trash2 size={17} />
                    Remove
                </button>
            </div>
        </article>
    );
};
