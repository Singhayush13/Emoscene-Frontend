import { productAPI } from "./api";

// Fetch all products with filters
export const fetchAllProducts = async (params = {}) => {
    try {
        const response = await productAPI.getAllProducts(params);
        if (response.success) {
            return { success: true, data: response.products, total: response.total };
        } else {
            return { success: false, error: response.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Fetch featured products
export const fetchFeaturedProducts = async () => {
    try {
        const response = await productAPI.getFeaturedProducts();
        if (response.success) {
            return { success: true, data: response.products };
        } else {
            return { success: false, error: response.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await productAPI.getProductById(id);
        if (response.success) {
            return { success: true, data: response.product };
        } else {
            return { success: false, error: response.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Add new product (Admin only)
export const createProduct = async (formData, token) => {
    try {
        const response = await productAPI.addProduct(formData, token);
        if (response.success) {
            return { success: true, data: response.product };
        } else {
            return { success: false, error: response.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Update product (Admin only)
export const updateProductById = async (id, formData, token) => {
    try {
        const response = await productAPI.updateProduct(id, formData, token);
        if (response.success) {
            return { success: true, data: response.product };
        } else {
            return { success: false, error: response.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Delete product (Admin only)
export const deleteProductById = async (id, token) => {
    try {
        const response = await productAPI.deleteProduct(id, token);
        if (response.success) {
            return { success: true, message: response.message };
        } else {
            return { success: false, error: response.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Track WhatsApp click
export const trackProductWhatsappClick = async (id) => {
    try {
        const response = await productAPI.trackWhatsappClick(id);
        if (response.success) {
            return { success: true, message: response.message };
        } else {
            return { success: false, error: response.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Helper function to filter products locally
export const filterProducts = (products, filters) => {
    let filtered = [...products];

    if (filters.search) {
        filtered = filtered.filter(
            (product) =>
                product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.description.toLowerCase().includes(filters.search.toLowerCase())
        );
    }

    if (filters.category && filters.category !== "All") {
        filtered = filtered.filter((product) => product.category === filters.category);
    }

    if (filters.mood && filters.mood !== "All") {
        filtered = filtered.filter((product) => product.mood === filters.mood);
    }

    if (filters.priceRange) {
        filtered = filtered.filter(
            (product) =>
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1]
        );
    }

    return filtered;
};

// Helper function to sort products
export const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
        case "newest":
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case "oldest":
            return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        case "priceAsc":
            return sorted.sort((a, b) => a.price - b.price);
        case "priceDesc":
            return sorted.sort((a, b) => b.price - a.price);
        case "popular":
            return sorted.sort((a, b) => b.views - a.views);
        case "rating":
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
};
