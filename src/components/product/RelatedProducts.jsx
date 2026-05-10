import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { fetchAllProducts } from "../../services/productService";

const RelatedProducts = ({ currentProductId, category, mood }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRelated = async () => {
            setLoading(true);
            try {
                // Fetch products with same category or mood
                const result = await fetchAllProducts({
                    category: category || "",
                    mood: mood || "",
                });

                if (result.success) {
                    // Filter out current product and limit to 4 products
                    const filtered = result.data
                        .filter((product) => product._id !== currentProductId)
                        .slice(0, 4);
                    setRelatedProducts(filtered);
                }
            } catch (error) {
                console.error("Error fetching related products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (category || mood) {
            fetchRelated();
        }
    }, [currentProductId, category, mood]);

    if (!relatedProducts.length && !loading) {
        return null;
    }

    return (
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader size={32} className="animate-spin text-purple-600" />
                </div>
            ) : relatedProducts.length === 0 ? (
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        No related products found
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RelatedProducts;
