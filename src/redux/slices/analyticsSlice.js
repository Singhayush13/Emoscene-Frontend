import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: {
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalVisitors: 0,
        whatsappClicks: 0,
    },
    dailyVisitors: [],
    topViewedProducts: [],
    topWhatsappProducts: [],
    recentUsers: [],
    recentOrders: [],
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setStats: (state, action) => {
            state.stats = action.payload;
        },
        setDailyVisitors: (state, action) => {
            state.dailyVisitors = action.payload;
        },
        setTopViewedProducts: (state, action) => {
            state.topViewedProducts = action.payload;
        },
        setTopWhatsappProducts: (state, action) => {
            state.topWhatsappProducts = action.payload;
        },
        setRecentUsers: (state, action) => {
            state.recentUsers = action.payload;
        },
        setRecentOrders: (state, action) => {
            state.recentOrders = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setStats,
    setDailyVisitors,
    setTopViewedProducts,
    setTopWhatsappProducts,
    setRecentUsers,
    setRecentOrders,
    setError,
    clearError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
