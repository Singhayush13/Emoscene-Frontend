import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productAPI } from "../../services/api";
import { Upload, X, Loader, AlertCircle } from "lucide-react";

export const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        mood: "",
        burnTime: "",
        waxType: "",
        fragranceNotes: "",
        featured: false,
    });
    const [error, setError] = useState(null);

    const categories = ["Candles", "Diffusers", "Wax Melts", "Sprays"];
    const moods = ["Relax", "Love", "Focus", "Festive", "Luxury", "Self-care"];

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getProductById(id);
                if (response.success) {
                    const product = response.product;
                    setFormData({
                        name: product.name || "",
                        description: product.description || "",
                        price: product.price || "",
                        stock: product.stock || "",
                        category: product.category || "",
                        mood: product.mood || "",
                        burnTime: product.burnTime || "",
                        waxType: product.waxType || "",
                        fragranceNotes: product.fragranceNotes?.join(", ") || "",
                        featured: product.featured || false,
                    });
                    setExistingImages(product.images || []);
                } else {
                    setError("Failed to load product");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewImages([...newImages, ...files]);
        e.target.value = "";
    };

    const handleRemoveNewImage = (index) => {
        setNewImages(newImages.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (index) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.price) {
            alert("Please fill all required fields");
            return;
        }

        if (existingImages.length === 0 && newImages.length === 0) {
            alert("Please keep at least one image or upload new images");
            return;
        }

        try {
            setSubmitting(true);
            const token = localStorage.getItem("token");

            const formDataObj = new FormData();
            formDataObj.append("name", formData.name);
            formDataObj.append("description", formData.description);
            formDataObj.append("price", formData.price);
            formDataObj.append("stock", formData.stock);
            formDataObj.append("category", formData.category);
            formDataObj.append("mood", formData.mood);
            formDataObj.append("burnTime", formData.burnTime);
            formDataObj.append("waxType", formData.waxType);
            formDataObj.append("fragranceNotes", formData.fragranceNotes);
            formDataObj.append("featured", formData.featured);

            existingImages.forEach((image) => {
                if (typeof image === "string") {
                    formDataObj.append("existingImages", image);
                }
            });

            newImages.forEach((image) => {
                formDataObj.append("images", image);
            });

            const response = await productAPI.updateProduct(id, formDataObj, token);

            if (response.success) {
                alert("Product updated successfully");
                navigate("/admin/products");
            } else {
                alert(
                    "Error updating product: " +
                    (response.message || response.error || "Upload failed")
                );
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <Loader size={40} className="animate-spin text-purple-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                        <AlertCircle size={24} />
                        <span>{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Edit Product
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6"
                >
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Basic Information
                        </h2>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter product description"
                                rows="4"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter price"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    placeholder="Enter stock quantity"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Product Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    Mood *
                                </label>
                                <select
                                    name="mood"
                                    value={formData.mood}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                                >
                                    <option value="">Select mood</option>
                                    {moods.map((mood) => (
                                        <option key={mood} value={mood}>
                                            {mood}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    Burn Time (hours)
                                </label>
                                <input
                                    type="text"
                                    name="burnTime"
                                    value={formData.burnTime}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 40"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    Wax Type
                                </label>
                                <input
                                    type="text"
                                    name="waxType"
                                    value={formData.waxType}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Soy Wax"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Fragrance Notes
                            </label>
                            <input
                                type="text"
                                name="fragranceNotes"
                                value={formData.fragranceNotes}
                                onChange={handleInputChange}
                                placeholder="e.g., Vanilla, Lavender (comma separated)"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                            />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleInputChange}
                                className="w-4 h-4"
                            />
                            <span className="text-gray-900 dark:text-white font-bold">
                                Mark as Featured Product
                            </span>
                        </label>
                    </div>

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Current Product Images
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {existingImages.map((image, i) => (
                                    <div key={i} className="relative">
                                        <img
                                            src={image}
                                            alt={`Current ${i}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(i)}
                                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New Image Upload */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Upload New Images (Optional)
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            New images will be added to the images you keep above
                        </p>

                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer flex flex-col items-center gap-2"
                            >
                                <Upload size={40} className="text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400 font-bold">
                                    Click to upload images
                                </span>
                                <span className="text-sm text-gray-500">
                                    or drag and drop
                                </span>
                            </label>
                        </div>

                        {newImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {newImages.map((image, i) => (
                                    <div key={i} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`New ${i}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveNewImage(i)}
                                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition flex items-center justify-center gap-2"
                        >
                            {submitting && <Loader size={20} className="animate-spin" />}
                            {submitting ? "Updating..." : "Update Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
