const toastStore = {
    toasts: [],
    listeners: [],
    subscribe(listener) {
        this.listeners.push(listener);
        listener(this.toasts);

        return () => {
            this.listeners = this.listeners.filter((item) => item !== listener);
        };
    },
    emit() {
        this.listeners.forEach((listener) => listener([...this.toasts]));
    },
    notify(message, type = "info", duration = 3000) {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        this.toasts = [...this.toasts, { id, message, type }];
        this.emit();

        window.setTimeout(() => {
            this.dismiss(id);
        }, duration);
    },
    dismiss(id) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
        this.emit();
    },
};

export const showToast = (message, type = "info", duration = 3000) => {
    toastStore.notify(message, type, duration);
};

export default toastStore;
