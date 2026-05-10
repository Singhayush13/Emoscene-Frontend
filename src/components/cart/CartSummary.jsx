import { Link } from "react-router-dom";
import { Loader, MessageCircle, ShieldCheck } from "lucide-react";

const formatPrice = (price) => `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;

const fields = [
    { name: "fullName", label: "Full name", type: "text" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "pincode", label: "Pincode", type: "text" },
];

export const CartSummary = ({
    totalItems,
    totalPrice,
    shippingData,
    onInputChange,
    onCheckout,
    loading = false,
}) => {
    return (
        <aside className="space-y-5">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
                    Order summary
                </h2>

                <div className="mt-6 space-y-3 border-b border-gray-200 pb-5 text-sm dark:border-gray-800">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Items</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xl font-black text-gray-950 dark:text-white">
                    <span>Total</span>
                    <span className="text-purple-700 dark:text-purple-300">
                        {formatPrice(totalPrice)}
                    </span>
                </div>

                <div className="mt-6 rounded-lg bg-orange-50 p-4 text-sm text-orange-900 dark:bg-orange-950/30 dark:text-orange-100">
                    <div className="flex gap-2 font-bold">
                        <ShieldCheck size={18} />
                        WhatsApp checkout
                    </div>
                    <p className="mt-2 leading-6">
                        Your order is created first, then WhatsApp opens so you can confirm details with the store.
                    </p>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="font-bold text-gray-950 dark:text-white">
                    Shipping address
                </h3>

                <div className="mt-4 grid gap-3">
                    {fields.map((field) => (
                        <label key={field.name} className="block">
                            <span className="sr-only">{field.label}</span>
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.label}
                                value={shippingData[field.name]}
                                onChange={onInputChange}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-950 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </label>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onCheckout}
                    disabled={loading}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 px-5 py-3 font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? <Loader size={19} className="animate-spin" /> : <MessageCircle size={19} />}
                    {loading ? "Processing..." : "Proceed to WhatsApp"}
                </button>
            </div>

            <Link
                to="/products"
                className="block rounded-lg bg-gray-100 px-5 py-3 text-center font-bold text-gray-950 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
                Continue shopping
            </Link>
        </aside>
    );
};
