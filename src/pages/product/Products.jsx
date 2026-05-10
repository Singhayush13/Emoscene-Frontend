import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "../../components/product/ProductCard";
import { Filter, Loader, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";

const categories = ["Relax", "Love", "Focus", "Festive", "Luxury", "Self-care"];

const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
    { value: "mostViewed", label: "Most Viewed" },
];

export const Products = () => {
    const {
        getAllProducts,
        products,
        loading,
        filters,
        setSearchFilter,
        setCategoryFilter,
        setSortBy,
    } = useProducts();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        getAllProducts({
            search: filters.search,
            category: filters.category,
            sortBy: filters.sortBy,
        });
    }, [filters.search, filters.category, filters.sortBy, getAllProducts]);

    const activeCategory = filters.category || "All";

    return (
        <div className="min-h-screen bg-[#fffaf4] text-stone-950 transition-colors duration-500 dark:bg-[#080706] dark:text-white">
            <section className="relative isolate overflow-hidden border-b border-amber-900/10 px-4 py-16 dark:border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,_rgba(255,179,91,0.22),_transparent_28%),radial-gradient(circle_at_82%_16%,_rgba(126,71,255,0.14),_transparent_26%)] dark:bg-[radial-gradient(circle_at_18%_20%,_rgba(255,179,91,0.16),_transparent_28%),radial-gradient(circle_at_82%_16%,_rgba(126,71,255,0.16),_transparent_26%)]" />
                <div className="relative mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
                    >
                        <div>
                            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-900/10 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-amber-900 shadow-[0_20px_60px_rgba(150,78,34,0.09)] backdrop-blur dark:border-amber-100/15 dark:bg-white/[0.06] dark:text-amber-100">
                                <Sparkles size={15} />
                                Emoscence collection
                            </div>
                            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                                Explore candles made for every mood, room, and ritual.
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-700 dark:text-stone-300">
                                Browse premium scented candles with thoughtful fragrance notes, clean finishes, and warm glow profiles designed for everyday luxury.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            {["Hand-poured", "Premium wax", "Mood-led scents"].map((item) => (
                                <div key={item} className="border-l border-amber-900/15 bg-white/55 p-4 shadow-[0_20px_55px_rgba(150,78,34,0.08)] backdrop-blur dark:border-amber-100/20 dark:bg-white/[0.05]">
                                    <div className="text-sm font-black">{item}</div>
                                    <div className="mt-1 text-xs leading-5 text-stone-600 dark:text-stone-400">Curated for a refined candle experience.</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative max-w-xl flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search candles, moods, fragrance notes..."
                            value={filters.search}
                            onChange={(event) => setSearchFilter(event.target.value)}
                            className="h-14 w-full rounded-2xl border border-stone-200 bg-white px-11 py-4 text-sm font-semibold text-stone-950 shadow-[0_18px_50px_rgba(83,50,28,0.08)] outline-none transition focus:border-orange-400 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-stone-500"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsFilterOpen((value) => !value)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-black shadow-[0_18px_50px_rgba(83,50,28,0.08)] transition hover:border-orange-300 dark:border-white/10 dark:bg-white/[0.06]"
                        >
                            {isFilterOpen ? <X size={18} /> : <Filter size={18} />}
                            Filters
                        </button>

                        <div className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-[0_18px_50px_rgba(83,50,28,0.08)] dark:border-white/10 dark:bg-white/[0.06]">
                            <SlidersHorizontal size={18} className="text-orange-500" />
                            <select
                                value={filters.sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                className="bg-transparent text-sm font-black text-stone-950 outline-none dark:text-white"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={`${isFilterOpen ? "grid" : "hidden"} mb-8 gap-3 sm:grid-cols-2 lg:hidden`}>
                    <FilterPanel activeCategory={activeCategory} setCategoryFilter={setCategoryFilter} />
                </div>

                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                    <aside className="hidden lg:block">
                        <FilterPanel activeCategory={activeCategory} setCategoryFilter={setCategoryFilter} />
                    </aside>

                    <div>
                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
                                    {activeCategory} candles
                                </p>
                                <h2 className="mt-2 text-2xl font-black text-stone-950 dark:text-white">
                                    {loading ? "Finding your candles" : `${products.length} products available`}
                                </h2>
                            </div>
                            <p className="max-w-md text-sm leading-6 text-stone-600 dark:text-stone-400">
                                Select a mood, compare notes, and add your favorite candle to the cart.
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-3xl border border-stone-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]">
                                <Loader className="animate-spin text-orange-500" size={42} />
                                <span className="text-xs font-black uppercase tracking-[0.28em] text-stone-500">
                                    Loading products
                                </span>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/70 p-10 text-center dark:border-white/15 dark:bg-white/[0.04]">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-200">
                                    <Search size={24} />
                                </div>
                                <h3 className="text-xl font-black">No products found</h3>
                                <p className="mt-2 max-w-md text-sm leading-6 text-stone-600 dark:text-stone-400">
                                    Try another search term or choose a different candle category.
                                </p>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                            >
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

const FilterPanel = ({ activeCategory, setCategoryFilter }) => (
    <div className="rounded-3xl border border-stone-200 bg-white/75 p-5 shadow-[0_24px_70px_rgba(83,50,28,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.05]">
        <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-stone-950 dark:text-white">
                <Filter size={17} />
                Moods
            </h3>
            <button
                type="button"
                onClick={() => setCategoryFilter("")}
                className="text-xs font-black uppercase tracking-widest text-orange-600 transition hover:text-orange-500 dark:text-orange-300"
            >
                Clear
            </button>
        </div>

        <div className="space-y-2">
            {["All", ...categories].map((category) => {
                const isActive = activeCategory === category;

                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setCategoryFilter(category === "All" ? "" : category)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-black transition ${isActive
                            ? "bg-stone-950 text-white shadow-lg shadow-stone-950/15 dark:bg-white dark:text-stone-950"
                            : "bg-stone-100/70 text-stone-700 hover:bg-orange-100 hover:text-orange-800 dark:bg-white/[0.06] dark:text-stone-300 dark:hover:bg-orange-500/15 dark:hover:text-orange-100"
                            }`}
                    >
                        <span>{category}</span>
                        <span className={`h-2 w-2 rounded-full ${isActive ? "bg-orange-300" : "bg-stone-300 dark:bg-stone-700"}`} />
                    </button>
                );
            })}
        </div>
    </div>
);
