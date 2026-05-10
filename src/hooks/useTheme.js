import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggleTheme, setTheme } from "../redux/slices/themeSlice";

export const useTheme = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const shouldBeDark = savedTheme === "dark" || (prefersDark && !savedTheme);

        if (shouldBeDark) {
            dispatch(setTheme(true));
        } else {
            dispatch(setTheme(false));
        }
    }, [dispatch]);

    const toggleDarkMode = () => {
        dispatch(toggleTheme());
    };

    return {
        isDarkMode,
        toggleDarkMode,
    };
};
