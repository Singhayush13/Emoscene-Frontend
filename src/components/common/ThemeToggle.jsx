import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = ({ className = "" }) => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <motion.button
            type="button"
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.96 }}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 ${className}`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
    );
};
