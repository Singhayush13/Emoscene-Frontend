import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productAPI } from "../../services/api";
import { Upload, X, Loader } from "lucide-react";

export const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        stock: "",
        category: "",
        mood: "",
        burnTime: "",
        waxType: "",
        fragranceNotes: "",
        featured: false,
    });

    const categories = ["Candles", "Diffusers", "Wax Melts", "Sprays"];
    const moods = ["Relax", "Love", "Focus", "Festive", "Luxury", "Self-care"];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.price || images.length === 0) {
            alert("Please fill all required fields and add at least one image");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const formDataObj = new FormData();
            formDataObj.append("name", formData.name);
            formDataObj.append("description", formData.description);
            formDataObj.append("price", formData.price);
            formDataObj.append("originalPrice", formData.originalPrice);
            formDataObj.append("stock", formData.stock);
            formDataObj.append("category", formData.category);
            formDataObj.append("mood", formData.mood);
            formDataObj.append("burnTime", formData.burnTime);
            formDataObj.append("waxType", formData.waxType);
            formDataObj.append("fragranceNotes", formData.fragranceNotes);
            formDataObj.append("featured", formData.featured);

            images.forEach((image) => {
                formDataObj.append("images", image);
            });

            const response = await productAPI.addProduct(formDataObj, token);

            if (response.success) {
                alert("Product added successfully");
                navigate("/admin/products");
            } else {
                alert("Error adding product: " + response.message);
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Add New Product
                </h1>

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
                                    Original Price
                                </label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={formData.originalPrice}
                                    onChange={handleInputChange}
                                    placeholder="Enter original price"
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

                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    Burn Time (hours)
                                </label>
                                <input
                                    type="number"
                                    name="burnTime"
                                    value={formData.burnTime}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 40"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                                />
                            </div>
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

                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Fragrance Notes
                            </label>
                            <input
                                type="text"
                                name="fragranceNotes"
                                value={formData.fragranceNotes}
                                onChange={handleInputChange}
                                placeholder="e.g., Vanilla, Lavender"
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

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Product Images *
                        </h2>

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

                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((image, i) => (
                                    <div key={i} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Preview ${i}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(i)}
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
                            disabled={loading}
                            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition flex items-center justify-center gap-2"
                        >
                            {loading && <Loader size={20} className="animate-spin" />}
                            {loading ? "Adding..." : "Add Product"}
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
