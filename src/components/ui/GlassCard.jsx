import { motion } from "framer-motion";

export const GlassCard = ({
    children,
    hover = true,
    className = "",
    gradient = false,
    onClick = null,
    animated = true,
}) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const Component = animated ? motion.div : "div";

    return (
        <Component
            variants={animated ? containerVariants : undefined}
            initial={animated ? "hidden" : undefined}
            whileInView={animated ? "visible" : undefined}
            viewport={animated ? { once: true } : undefined}
            whileHover={hover ? { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" } : undefined}
            onClick={onClick}
            className={`
                relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 dark:border-white/5
                bg-white/40 dark:bg-gray-800/40 transition-all duration-300
                ${hover ? "cursor-pointer hover:border-white/20 dark:hover:border-white/10" : ""}
                ${gradient ? "bg-gradient-to-br from-white/50 to-transparent dark:from-gray-700/50 dark:to-transparent" : ""}
                ${className}
            `}
        >
            {children}
        </Component>
    );
};
