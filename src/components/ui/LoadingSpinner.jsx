import { motion } from "framer-motion";

export const LoadingSpinner = ({
    size = "md",
    color = "purple",
    className = "",
}) => {
    const sizeStyles = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-3",
        lg: "w-16 h-16 border-4",
    };

    const colorStyles = {
        purple: "border-purple-500 border-t-purple-200",
        orange: "border-orange-500 border-t-orange-200",
        white: "border-white border-t-white/30",
    };

    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`
                rounded-full
                ${sizeStyles[size]}
                ${colorStyles[color]}
                ${className}
            `}
        />
    );
};

export const SkeletonLoader = ({
    count = 3,
    className = "",
    type = "text", // text, card, image
}) => {
    const getHeight = () => {
        switch (type) {
            case "card": return "h-48";
            case "image": return "h-64";
            default: return "h-4";
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`${getHeight()} bg-gray-200 dark:bg-gray-700 rounded-lg`}
                />
            ))}
        </div>
    );
};
