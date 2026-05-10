import { motion } from "framer-motion";

export const GlowButton = ({
    children,
    onClick = null,
    variant = "primary", // primary, secondary, outline
    size = "md", // sm, md, lg
    isLoading = false,
    disabled = false,
    className = "",
    icon = null,
    glowColor = "purple",
    animated = true,
    fullWidth = false,
}) => {
    const sizeStyles = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const variantStyles = {
        primary: "bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50",
        secondary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-pink-500/50",
        outline: "border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10",
    };

    const glowColorMap = {
        purple: "shadow-purple-500/50",
        orange: "shadow-orange-500/50",
        pink: "shadow-pink-500/50",
    };

    const Component = animated ? motion.button : "button";

    return (
        <Component
            onClick={onClick}
            disabled={disabled || isLoading}
            whileHover={animated && !disabled ? { scale: 1.05 } : undefined}
            whileTap={animated && !disabled ? { scale: 0.95 } : undefined}
            className={`
                relative font-bold rounded-xl transition-all duration-300
                flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${sizeStyles[size]}
                ${variantStyles[variant]}
                ${fullWidth ? "w-full" : ""}
                ${glowColorMap[glowColor]}
                ${className}
            `}
        >
            {isLoading && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-transparent border-t-white rounded-full"
                />
            )}
            {!isLoading && icon && icon}
            {!isLoading && children}
            {isLoading && <span>Loading...</span>}
        </Component>
    );
};
