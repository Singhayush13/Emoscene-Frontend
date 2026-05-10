import { motion } from "framer-motion";

export const Card = ({
    children,
    className = "",
    animated = true,
    hover = false,
    onClick = null,
}) => {
    const Component = animated ? motion.div : "div";

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <Component
            variants={animated ? containerVariants : undefined}
            initial={animated ? "hidden" : undefined}
            whileInView={animated ? "visible" : undefined}
            viewport={animated ? { once: true } : undefined}
            whileHover={hover ? { y: -4 } : undefined}
            onClick={onClick}
            className={`
                p-6 rounded-xl
                bg-white dark:bg-gray-800
                border border-gray-200/50 dark:border-gray-700/50
                shadow-sm hover:shadow-md transition-all duration-300
                ${hover ? "cursor-pointer" : ""}
                ${className}
            `}
        >
            {children}
        </Component>
    );
};
