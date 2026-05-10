import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
    setLoading,
    setProducts,
    setFeaturedProducts,
    setSingleProduct,
    setError,
} from "../redux/slices/productSlice";
import { productAPI } from "../services/api";

export const useProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    const getAllProducts = useCallback(
        async (params = {}) => {
            dispatch(setLoading(true));
            try {
                const response = await productAPI.getAllProducts(params);
                if (response.success) {
                    dispatch(
                        setProducts({
                            products: response.products,
                            total: response.total,
                        })
                    );
                } else {
                    dispatch(setError(response.message));
                }
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch]
    );

    const getFeaturedProducts = useCallback(async () => {
        try {
            const response = await productAPI.getFeaturedProducts();
            if (response.success) {
                dispatch(setFeaturedProducts(response.products));
            }
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    }, [dispatch]);

    const getProductById = useCallback(
        async (id) => {
            dispatch(setLoading(true));
            try {
                const response = await productAPI.getProductById(id);
                if (response.success) {
                    dispatch(setSingleProduct(response.product));
                } else {
                    dispatch(setError(response.message));
                }
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch]
    );

    return {
        ...products,
        getAllProducts,
        getFeaturedProducts,
        getProductById,
    };
};
