import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CartItem, CartSummary, EmptyCart } from "../../components/cart";
import { clearCart, removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import { useAuth } from "../../hooks/useAuth";
import { orderAPI } from "../../services/api";

export const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { isAuthenticated, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [shippingData, setShippingData] = useState({
        fullName: user?.name || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleQuantityChange = (productId, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ productId, quantity }));
        }
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShippingData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const missingField = Object.values(shippingData).some((value) => !value.trim());
        if (missingField) {
            alert("Please fill all shipping details");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await orderAPI.createOrder(
                {
                    items: cart.items.map((item) => ({
                        product: item.product._id,
                        quantity: item.quantity,
                    })),
                    shippingAddress: shippingData,
                    paymentMethod: "WhatsApp",
                },
                token
            );

            if (response.success) {
                window.open(response.whatsappUrl, "_blank");
                dispatch(clearCart());
                alert("Order created. Opening WhatsApp...");
            } else {
                alert("Error creating order: " + (response.message || "Please try again"));
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (cart.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 font-bold text-purple-700 transition hover:text-orange-600 dark:text-purple-300"
                >
                    <ArrowLeft size={20} />
                    Back to products
                </Link>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-950 dark:text-white">
                            Shopping cart
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Review your scents and confirm shipping before WhatsApp checkout.
                        </p>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        {cart.totalItems} item{cart.totalItems === 1 ? "" : "s"}
                    </p>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
                    <div className="space-y-5">
                        {cart.items.map((item) => (
                            <CartItem
                                key={item.product._id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>

                    <CartSummary
                        totalItems={cart.totalItems}
                        totalPrice={cart.totalPrice}
                        shippingData={shippingData}
                        onInputChange={handleInputChange}
                        onCheckout={handleCheckout}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};
