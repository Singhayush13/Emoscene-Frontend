import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { Mail, Lock, Loader, ArrowRight } from "lucide-react";

export const Login = () => {
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [validationError, setValidationError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setValidationError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setValidationError("Please fill in all fields to continue.");
            return;
        }
        await login({
            email: formData.email,
            password: formData.password,
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-500">

            {/* 1. Dynamic Background Orbs */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[10%] w-96 h-96 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -30, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[10%] w-96 h-96 bg-orange-500/10 dark:bg-orange-600/20 rounded-full blur-[120px]"
                />
            </div>

            {/* 2. Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="backdrop-blur-2xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="w-16 h-16 bg-gradient-to-br from-orange-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/20"
                        >
                            <span className="text-3xl">🕯️</span>
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Enter your details to access your collection.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-orange-500 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black uppercase tracking-widest text-orange-500">
                                    Password
                                </label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-purple-500 hover:text-purple-400 transition">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Error Handling */}
                        <AnimatePresence mode="wait">
                            {(error || validationError) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium"
                                >
                                    {error || validationError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {loading ? <Loader size={20} className="animate-spin" /> : "Sign In"}
                                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            New to Emoscence?{" "}
                            <Link
                                to="/register"
                                className="text-gray-900 dark:text-white font-bold hover:underline decoration-orange-500 underline-offset-4 transition"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};