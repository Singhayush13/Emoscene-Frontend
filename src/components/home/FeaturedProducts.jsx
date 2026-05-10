import { Link } from "react-router-dom";
import { ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "../product/ProductCard";

export const FeaturedProducts = ({ products = [], loading = false }) => {
    return (
        <section className="bg-gray-50 px-4 py-24 dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-orange-500" />
                            <span className="text-xs font-black uppercase tracking-widest text-orange-600">
                                Featured
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-normal text-gray-950 dark:text-white md:text-5xl">
                            Customer favorites
                        </h2>
                        <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
                            Best-loved scents selected for everyday rituals, gifting, and rooms that need a little more feeling.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 font-bold text-gray-950 transition hover:text-orange-600 dark:text-white"
                    >
                        View all products
                        <ArrowRight size={20} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-20">
                        <Loader className="animate-spin text-orange-500" size={38} />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Loading products
                        </span>
                    </div>
                ) : products.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {products.slice(0, 8).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        No featured products yet.
                    </div>
                )}
            </div>
        </section>
    );
};
