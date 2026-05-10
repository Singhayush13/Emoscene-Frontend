import { motion } from "framer-motion";

export const Badge = ({
    children,
    variant = "primary", // primary, secondary, success, warning, danger
    size = "md", // sm, md, lg
    className = "",
}) => {
    const variantStyles = {
        primary: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30",
        secondary: "bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/30",
        success: "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30",
        warning: "bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-500/30",
        danger: "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30",
    };

    const sizeStyles = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    };

    return (
        <span
            className={`
                inline-flex items-center rounded-full font-semibold
                ${sizeStyles[size]}
                ${variantStyles[variant]}
                ${className}
            `}
        >
            {children}
        </span>
    );
};
