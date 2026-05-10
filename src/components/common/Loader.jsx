import { LoaderCircle } from "lucide-react";

export const Loader = ({
    size = 40,
    label = "Loading",
    fullScreen = false,
    className = "",
}) => {
    const content = (
        <div className="flex flex-col items-center justify-center gap-3 text-gray-600 dark:text-gray-300">
            <LoaderCircle
                size={size}
                className={`animate-spin text-orange-500 ${className}`}
                aria-hidden="true"
            />
            {label ? (
                <span className="text-xs font-bold uppercase tracking-widest">
                    {label}
                </span>
            ) : null}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
                {content}
            </div>
        );
    }

    return content;
};

export default Loader;
