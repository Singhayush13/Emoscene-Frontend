import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import toastStore from "./toastStore";

const toastStyles = {
    success: "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-100",
    error: "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-100",
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100",
};

const toastIcons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
};

export const Toast = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        return toastStore.subscribe(setToasts);
    }, []);

    return (
        <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
            {toasts.map((toast) => {
                const Icon = toastIcons[toast.type] || Info;
                const styles = toastStyles[toast.type] || toastStyles.info;

                return (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur ${styles}`}
                    >
                        <Icon size={20} className="mt-0.5 shrink-0" />
                        <p className="flex-1 text-sm font-bold leading-6">{toast.message}</p>
                        <button
                            type="button"
                            onClick={() => toastStore.dismiss(toast.id)}
                            className="rounded-md p-1 opacity-70 transition hover:opacity-100"
                            aria-label="Dismiss notification"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
