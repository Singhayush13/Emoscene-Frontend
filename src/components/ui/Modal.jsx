import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer = null,
    size = "md", // sm, md, lg, xl
    closeButton = true,
    blur = true,
}) => {
    const sizeStyles = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", duration: 0.3 }
        },
        exit: { opacity: 0, scale: 0.95, y: 20 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className={`fixed inset-0 z-40 ${blur ? "backdrop-blur-sm" : "bg-black/50"}`}
                    />

                    {/* Modal */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            className={`
                                ${sizeStyles[size]} w-full
                                bg-white dark:bg-gray-900 rounded-2xl shadow-2xl
                                border border-gray-200/50 dark:border-gray-800/50
                                overflow-hidden
                            `}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {title}
                                </h2>
                                {closeButton && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <X size={24} className="text-gray-600 dark:text-gray-400" />
                                    </button>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-6 max-h-[60vh] overflow-y-auto">
                                {children}
                            </div>

                            {/* Footer */}
                            {footer && (
                                <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-800/50 flex gap-3 justify-end">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
