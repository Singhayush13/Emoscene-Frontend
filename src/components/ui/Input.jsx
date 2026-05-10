import { motion } from "framer-motion";

export const Input = ({
    type = "text",
    placeholder = "",
    value = "",
    onChange = null,
    error = null,
    disabled = false,
    icon = null,
    className = "",
    ...props
}) => {
    return (
        <div className="w-full">
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
                        w-full px-4 py-3 rounded-lg
                        bg-white dark:bg-gray-800
                        border-2 border-gray-200 dark:border-gray-700
                        focus:border-purple-500 dark:focus:border-purple-400
                        focus:outline-none focus:ring-2 focus:ring-purple-500/20
                        placeholder-gray-400 dark:placeholder-gray-500
                        text-gray-900 dark:text-white
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200
                        ${icon ? "pl-10" : ""}
                        ${error ? "border-red-500 dark:border-red-400" : ""}
                        ${className}
                    `}
                    {...props}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 dark:text-red-400 text-sm mt-2"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export const Textarea = ({
    placeholder = "",
    value = "",
    onChange = null,
    error = null,
    disabled = false,
    rows = 4,
    className = "",
    ...props
}) => {
    return (
        <div className="w-full">
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                rows={rows}
                className={`
                    w-full px-4 py-3 rounded-lg
                    bg-white dark:bg-gray-800
                    border-2 border-gray-200 dark:border-gray-700
                    focus:border-purple-500 dark:focus:border-purple-400
                    focus:outline-none focus:ring-2 focus:ring-purple-500/20
                    placeholder-gray-400 dark:placeholder-gray-500
                    text-gray-900 dark:text-white
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    resize-vertical
                    ${error ? "border-red-500 dark:border-red-400" : ""}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 dark:text-red-400 text-sm mt-2"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};
