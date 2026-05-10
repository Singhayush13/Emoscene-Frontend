import { X, Filter } from "lucide-react";
import { useState } from "react";

const ProductFilters = ({
    filters,
    onFilterChange,
    categories = ["All", "Candles", "Diffusers", "Wax Melts"],
    moods = ["All", "Calm", "Energetic", "Romantic", "Fresh"],
    priceRange = [0, 5000],
    onPriceChange,
    onClearFilters,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempPriceRange, setTempPriceRange] = useState(priceRange);

    const handleSearchChange = (e) => {
        onFilterChange("search", e.target.value);
    };

    const handleCategoryChange = (category) => {
        onFilterChange("category", category);
    };

    const handleMoodChange = (mood) => {
        onFilterChange("mood", mood);
    };

    const handlePriceChange = (range) => {
        setTempPriceRange(range);
        onPriceChange(range);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold"
                >
                    <Filter size={20} />
                    Filters {isOpen ? "✕" : "✓"}
                </button>
            </div>

            {/* Filters Container */}
            <div
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[1000px]" : "max-h-0 lg:max-h-none"
                    } lg:max-h-none`}
            >
                <div className="p-6 space-y-6 lg:space-y-4">
                    {/* Search */}
                    <div>
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 block">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={filters.search}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 block">
                            Category
                        </label>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={filters.category === category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="w-4 h-4 text-purple-600 cursor-pointer"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                                        {category}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Mood Filter */}
                    <div>
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 block">
                            Mood
                        </label>
                        <div className="space-y-2">
                            {moods.map((mood) => (
                                <label key={mood} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="mood"
                                        value={mood}
                                        checked={filters.mood === mood}
                                        onChange={(e) => handleMoodChange(e.target.value)}
                                        className="w-4 h-4 text-purple-600 cursor-pointer"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                                        {mood}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 block">
                            Price Range
                        </label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    value={tempPriceRange[0]}
                                    onChange={(e) =>
                                        handlePriceChange([
                                            parseInt(e.target.value) || 0,
                                            tempPriceRange[1],
                                        ])
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                                <span className="py-2 text-gray-600 dark:text-gray-400">to</span>
                                <input
                                    type="number"
                                    max="10000"
                                    value={tempPriceRange[1]}
                                    onChange={(e) =>
                                        handlePriceChange([
                                            tempPriceRange[0],
                                            parseInt(e.target.value) || 10000,
                                        ])
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                step="100"
                                value={tempPriceRange[1]}
                                onChange={(e) =>
                                    handlePriceChange([tempPriceRange[0], parseInt(e.target.value)])
                                }
                                className="w-full cursor-pointer accent-purple-600"
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                ₹{tempPriceRange[0]} - ₹{tempPriceRange[1]}
                            </p>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={onClearFilters}
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                    >
                        <X size={18} />
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;
