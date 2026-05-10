import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import {
    registerStart,
    registerSuccess,
    registerError,
    loginStart,
    loginSuccess,
    loginError,
    logoutStart,
    logoutSuccess,
    restoreAuthSuccess,
} from "../redux/slices/authSlice";
import { authAPI } from "../services/api";

const AUTH_TOKEN_KEY = "token";
const AUTH_EXPIRES_KEY = "authExpiresAt";
const AUTH_DURATION_MS = 2 * 24 * 60 * 60 * 1000;

const saveAuthToken = (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_EXPIRES_KEY, String(Date.now() + AUTH_DURATION_MS));
};

const clearAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_EXPIRES_KEY);
};

const getStoredAuthToken = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const expiresAt = Number(localStorage.getItem(AUTH_EXPIRES_KEY));

    if (!token) {
        return null;
    }

    if (!expiresAt || Date.now() > expiresAt) {
        clearAuthToken();
        return null;
    }

    return token;
};

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    // Register
    const register = useCallback(async (data) => {
        dispatch(registerStart());
        try {
            const response = await authAPI.register(data);
            if (response.success) {
                dispatch(
                    registerSuccess({
                        user: response.data.user,
                        token: response.data.token,
                    })
                );
                saveAuthToken(response.data.token);
                navigate("/");
                return true;
            } else {
                dispatch(registerError(response.message));
                return false;
            }
        } catch (error) {
            dispatch(registerError(error.message));
            return false;
        }
    }, [dispatch, navigate]);

    // Login
    const login = useCallback(async (data) => {
        dispatch(loginStart());
        try {
            const response = await authAPI.login(data);
            if (response.success) {
                dispatch(
                    loginSuccess({
                        user: response.data.user,
                        token: response.data.token,
                    })
                );
                saveAuthToken(response.data.token);

                if (response.data.user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
                return true;
            } else {
                dispatch(loginError(response.message));
                return false;
            }
        } catch (error) {
            dispatch(loginError(error.message));
            return false;
        }
    }, [dispatch, navigate]);

    // Logout
    const logout = useCallback(async () => {
        dispatch(logoutStart());
        try {
            await authAPI.logout();
            dispatch(logoutSuccess());
            clearAuthToken();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
            dispatch(logoutSuccess());
            clearAuthToken();
        }
    }, [dispatch, navigate]);

    // Get current user
    const getCurrentUser = useCallback(async () => {
        const token = getStoredAuthToken();
        if (!token) {
            dispatch(logoutSuccess());
            return;
        }

        try {
            const response = await authAPI.getMe(token);
            if (response.success) {
                dispatch(
                    restoreAuthSuccess({
                        user: response.data,
                        token: token,
                    })
                );
            } else {
                clearAuthToken();
                dispatch(logoutSuccess());
            }
        } catch (error) {
            console.error("Get user error:", error);
            clearAuthToken();
            dispatch(logoutSuccess());
        }
    }, [dispatch]);

    // Restore authentication on mount
    useEffect(() => {
        const token = getStoredAuthToken();
        if (token && !auth.isAuthenticated) {
            getCurrentUser();
        } else if (!token && auth.loading) {
            dispatch(logoutSuccess());
        }
    }, [auth.isAuthenticated, auth.loading, dispatch, getCurrentUser]);

    return {
        ...auth,
        register,
        login,
        logout,
        getCurrentUser,
        isAdmin: auth.user?.role === "admin",
    };
};
