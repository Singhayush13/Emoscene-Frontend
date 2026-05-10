import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0,
    totalItems: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.product._id === action.payload.product._id
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

            state.totalItems = state.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            state.totalPrice = state.items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.product._id !== action.payload
            );

            state.totalItems = state.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            state.totalPrice = state.items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.product._id === action.payload.productId
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }

            state.totalItems = state.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            state.totalPrice = state.items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalItems = 0;
        },
        loadCartFromLocalStorage: (state, action) => {
            state.items = action.payload;
            state.totalItems = state.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            state.totalPrice = state.items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCartFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
