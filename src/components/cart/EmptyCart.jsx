import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export const EmptyCart = () => {
    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-white px-4 dark:bg-gray-950">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="max-w-md text-center"
            >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
                    <ShoppingBag size={38} />
                </div>

                <h1 className="mt-6 text-3xl font-bold text-gray-950 dark:text-white">
                    Your cart is empty
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                    Add a few mood-led fragrances and they will appear here.
                </p>

                <Link
                    to="/products"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 font-bold text-white transition hover:shadow-lg"
                >
                    <ArrowLeft size={19} />
                    Continue shopping
                </Link>
            </motion.div>
        </section>
    );
};
