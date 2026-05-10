const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const parseResponse = async (res) => {
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

    if (!res.ok) {
        return {
            success: false,
            ...data,
            message: data.message || data.error?.message || `Request failed with status ${res.status}`,
        };
    }

    return data;
};

// Auth API
export const authAPI = {
    register: async (data) => {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return res.json();
    },

    login: async (data) => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return res.json();
    },

    logout: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        return res.json();
    },

    getMe: async (token) => {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    forgotPassword: async (email) => {
        const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return res.json();
    },

    resetPassword: async (token, password) => {
        const res = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        return res.json();
    },
};

// Product API
export const productAPI = {
    getAllProducts: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(
            `${API_BASE_URL}/products?${query}`,
            { credentials: "include" }
        );
        return res.json();
    },

    getFeaturedProducts: async () => {
        const res = await fetch(`${API_BASE_URL}/products/featured`, {
            credentials: "include",
        });
        return res.json();
    },

    getProductById: async (id) => {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            credentials: "include",
        });
        return res.json();
    },

    addProduct: async (formData, token) => {
        const res = await fetch(`${API_BASE_URL}/products`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            credentials: "include",
        });
        return res.json();
    },

    updateProduct: async (id, formData, token) => {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            credentials: "include",
        });
        return parseResponse(res);
    },

    deleteProduct: async (id, token) => {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    trackWhatsappClick: async (id) => {
        const res = await fetch(`${API_BASE_URL}/products/track-click/${id}`, {
            method: "PUT",
            credentials: "include",
        });
        return res.json();
    },
};

// Order API
export const orderAPI = {
    createOrder: async (data, token) => {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return res.json();
    },

    getUserOrders: async (token) => {
        const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    getOrderById: async (id, token) => {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    getAllOrders: async (token) => {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    updateOrderStatus: async (id, status, token) => {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
            credentials: "include",
        });
        return res.json();
    },

    deleteOrder: async (id, token) => {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },
};

// Review API
export const reviewAPI = {
    addReview: async (productId, data, token) => {
        const res = await fetch(`${API_BASE_URL}/reviews/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return res.json();
    },

    getProductReviews: async (productId) => {
        const res = await fetch(`${API_BASE_URL}/reviews/${productId}`, {
            credentials: "include",
        });
        return res.json();
    },

    deleteReview: async (id, token) => {
        const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },
};

// Wishlist API
export const wishlistAPI = {
    addToWishlist: async (productId, token) => {
        const res = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    getWishlist: async (token) => {
        const res = await fetch(`${API_BASE_URL}/wishlist`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    removeFromWishlist: async (productId, token) => {
        const res = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },
};

// User API
export const userAPI = {
    getUserProfile: async (token) => {
        const res = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    updateProfile: async (data, token) => {
        const res = await fetch(`${API_BASE_URL}/users/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return res.json();
    },

    deleteAccount: async (token) => {
        const res = await fetch(`${API_BASE_URL}/users/delete-account`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    getDashboard: async (token) => {
        const res = await fetch(`${API_BASE_URL}/users/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },
};

// Admin API
export const adminAPI = {
    getAllUsers: async (token, search = "") => {
        const res = await fetch(
            `${API_BASE_URL}/admin/users?search=${search}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        return res.json();
    },

    toggleBlockUser: async (userId, token) => {
        const res = await fetch(`${API_BASE_URL}/admin/users/block/${userId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    deleteUser: async (userId, token) => {
        const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    toggleFeaturedProduct: async (productId, token) => {
        const res = await fetch(
            `${API_BASE_URL}/admin/products/featured/${productId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        return res.json();
    },

    toggleProductStatus: async (productId, token) => {
        const res = await fetch(
            `${API_BASE_URL}/admin/products/status/${productId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        return res.json();
    },

    updateProductStock: async (productId, stock, token) => {
        const res = await fetch(
            `${API_BASE_URL}/admin/products/stock/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ stock }),
                credentials: "include",
            }
        );
        return res.json();
    },

    getLowStockProducts: async (token) => {
        const res = await fetch(`${API_BASE_URL}/admin/products/low-stock`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    searchOrders: async (query, token) => {
        const res = await fetch(
            `${API_BASE_URL}/admin/orders/search?query=${query}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        return res.json();
    },
};

// Analytics API
export const analyticsAPI = {
    trackPageView: async (data) => {
        const res = await fetch(`${API_BASE_URL}/analytics/track-page`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return res.json();
    },

    getDashboardStats: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    getDailyVisitors: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/daily-visitors`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    getTopViewedProducts: async (token) => {
        const res = await fetch(
            `${API_BASE_URL}/analytics/top-viewed-products`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        return res.json();
    },

    getTopWhatsappProducts: async (token) => {
        const res = await fetch(
            `${API_BASE_URL}/analytics/top-whatsapp-products`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        return res.json();
    },

    getRecentUsers: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/recent-users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },

    getRecentOrders: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/recent-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return res.json();
    },
};
