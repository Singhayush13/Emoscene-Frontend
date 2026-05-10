import { useState, useEffect } from "react";
import { Loader, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { fetchAllProducts } from "../../services/productService";
import { filterProducts, sortProducts } from "../../services/productService";

const ProductGrid = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const [filters, setFilters] = useState({
        search: "",
        category: "All",
        mood: "All",
        priceRange: [0, 5000],
        sortBy: "newest",
    });

    // Fetch products
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchAllProducts();
                if (result.success) {
                    setAllProducts(result.data);
                } else {
                    setError(result.error || "Failed to fetch products");
                }
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Apply filters and sorting
    useEffect(() => {
        let filtered = filterProducts(allProducts, filters);
        filtered = sortProducts(filtered, filters.sortBy);
        setDisplayProducts(filtered);
        setCurrentPage(1);
    }, [allProducts, filters]);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
    };

    const handlePriceChange = (range) => {
        setFilters((prev) => ({
            ...prev,
            priceRange: range,
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            search: "",
            category: "All",
            mood: "All",
            priceRange: [0, 5000],
            sortBy: "newest",
        });
    };

    // Pagination
    const totalPages = Math.ceil(displayProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = displayProducts.slice(startIndex, startIndex + productsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-2">
                        Our Products
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Explore our collection of premium candles and aromatics
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Filters */}
                    <div className="lg:col-span-1">
                        <ProductFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onPriceChange={handlePriceChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Sort Options */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                            <p className="text-gray-700 dark:text-gray-300 font-semibold">
                                Showing {paginatedProducts.length > 0 ? startIndex + 1 : 0}-
                                {Math.min(startIndex + productsPerPage, displayProducts.length)} of{" "}
                                {displayProducts.length} products
                            </p>

                            <div>
                                <label className="text-gray-700 dark:text-gray-300 mr-3">Sort by:</label>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) =>
                                        handleFilterChange("sortBy", e.target.value)
                                    }
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="priceAsc">Price: Low to High</option>
                                    <option value="priceDesc">Price: High to Low</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                                <AlertCircle size={24} />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Loading */}
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader size={40} className="animate-spin text-purple-600" />
                            </div>
                        ) : paginatedProducts.length === 0 ? (
                            /* No Products */
                            <div className="p-12 bg-white dark:bg-gray-800 rounded-lg text-center">
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    No products found matching your filters
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Products Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 mt-8">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition"
                                        >
                                            <ChevronLeft size={20} />
                                            Previous
                                        </button>

                                        <div className="flex items-center gap-2">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`w-10 h-10 rounded-lg font-semibold transition ${currentPage === i + 1
                                                            ? "bg-purple-600 text-white"
                                                            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-purple-600 hover:text-white"
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition"
                                        >
                                            Next
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;
