import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addToWishlist: (state, action) => {
            const exists = state.items.find(
                (item) => item._id === action.payload._id
            );
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload
            );
        },
        setWishlist: (state, action) => {
            state.items = action.payload;
        },
        clearWishlist: (state) => {
            state.items = [];
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
    addToWishlist,
    removeFromWishlist,
    setWishlist,
    clearWishlist,
    setError,
    clearError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
