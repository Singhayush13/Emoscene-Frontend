import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    featuredProducts: [],
    singleProduct: null,
    loading: false,
    error: null,
    filters: {
        search: "",
        category: "",
        sortBy: "newest",
    },
    pagination: {
        page: 1,
        limit: 12,
        total: 0,
    },
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload.products;
            state.pagination.total = action.payload.total;
        },
        setFeaturedProducts: (state, action) => {
            state.featuredProducts = action.payload;
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setSearchFilter: (state, action) => {
            state.filters.search = action.payload;
            state.pagination.page = 1;
        },
        setCategoryFilter: (state, action) => {
            state.filters.category = action.payload;
            state.pagination.page = 1;
        },
        setSortBy: (state, action) => {
            state.filters.sortBy = action.payload;
            state.pagination.page = 1;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {
                search: "",
                category: "",
                sortBy: "newest",
            };
            state.pagination.page = 1;
        },
    },
});

export const {
    setLoading,
    setProducts,
    setFeaturedProducts,
    setSingleProduct,
    setError,
    clearError,
    setSearchFilter,
    setCategoryFilter,
    setSortBy,
    setPage,
    clearFilters,
} = productSlice.actions;

export default productSlice.reducer;
