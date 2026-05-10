const API_BASE_URL = "https://emoscene-backend.onrender.com/api";

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
        return parseResponse(res);
    },

    login: async (data) => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return parseResponse(res);
    },

    logout: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        return parseResponse(res);
    },

    getMe: async (token) => {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    forgotPassword: async (email) => {
        const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return parseResponse(res);
    },

    resetPassword: async (token, password) => {
        const res = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        return parseResponse(res);
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
        return parseResponse(res);
    },

    getFeaturedProducts: async () => {
        const res = await fetch(`${API_BASE_URL}/products/featured`, {
            credentials: "include",
        });
        return parseResponse(res);
    },

    getProductById: async (id) => {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
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
        return parseResponse(res);
    },

    trackWhatsappClick: async (id) => {
        const res = await fetch(`${API_BASE_URL}/products/track-click/${id}`, {
            method: "PUT",
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
    },

    getUserOrders: async (token) => {
        const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    getOrderById: async (id, token) => {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    getAllOrders: async (token) => {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
    },

    deleteOrder: async (id, token) => {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
    },

    getProductReviews: async (productId) => {
        const res = await fetch(`${API_BASE_URL}/reviews/${productId}`, {
            credentials: "include",
        });
        return parseResponse(res);
    },

    deleteReview: async (id, token) => {
        const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
    },

    getWishlist: async (token) => {
        const res = await fetch(`${API_BASE_URL}/wishlist`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    removeFromWishlist: async (productId, token) => {
        const res = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
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
        return parseResponse(res);
    },

    deleteAccount: async (token) => {
        const res = await fetch(`${API_BASE_URL}/users/delete-account`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    getDashboard: async (token) => {
        const res = await fetch(`${API_BASE_URL}/users/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
    },

    toggleBlockUser: async (userId, token) => {
        const res = await fetch(`${API_BASE_URL}/admin/users/block/${userId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    deleteUser: async (userId, token) => {
        const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
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
        return parseResponse(res);
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
        return parseResponse(res);
    },

    getLowStockProducts: async (token) => {
        const res = await fetch(`${API_BASE_URL}/admin/products/low-stock`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    searchOrders: async (query, token) => {
        const res = await fetch(
            `${API_BASE_URL}/admin/orders/search?search=${query}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );
        return parseResponse(res);
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
        return parseResponse(res);
    },

    getDashboardStats: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    getDailyVisitors: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/daily-visitors`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
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
        return parseResponse(res);
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
        return parseResponse(res);
    },

    getRecentUsers: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/recent-users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },

    getRecentOrders: async (token) => {
        const res = await fetch(`${API_BASE_URL}/analytics/recent-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
        return parseResponse(res);
    },
};
