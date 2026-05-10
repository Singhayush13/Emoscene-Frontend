import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImages = ({ images, productName }) => {
    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handlePrevImage = () => {
        setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setMainImageIndex(index);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            {/* Main Image */}
            <div className="relative bg-gray-100 dark:bg-gray-700 aspect-square overflow-hidden group">
                <img
                    src={images[mainImageIndex] || "/placeholder.png"}
                    alt={`${productName} - Image ${mainImageIndex + 1}`}
                    className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {mainImageIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${mainImageIndex === index
                                        ? "border-purple-600 shadow-lg"
                                        : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`${productName} - Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Image Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click on thumbnails to view different product images
                </p>
            </div>
        </div>
    );
};

export default ProductImages;
