import { motion } from "framer-motion";

export const SectionTitle = ({
    title,
    subtitle,
    align = "center",
    gradient = true,
    animation = true,
    className = ""
}) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, delay: 0.2 }
        }
    };

    const subtitleVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, delay: 0.4 }
        }
    };

    const Component = animation ? motion.div : "div";

    return (
        <Component
            variants={animation ? containerVariants : undefined}
            initial={animation ? "hidden" : undefined}
            whileInView={animation ? "visible" : undefined}
            viewport={animation ? { once: true, amount: 0.5 } : undefined}
            className={`text-${align} ${className}`}
        >
            <motion.h2
                variants={animation ? titleVariants : undefined}
                className={`text-4xl md:text-5xl font-bold mb-4 ${gradient
                        ? "bg-gradient-to-r from-orange-500 via-purple-500 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-900 dark:text-white"
                    }`}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    variants={animation ? subtitleVariants : undefined}
                    className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            )}
        </Component>
    );
};
