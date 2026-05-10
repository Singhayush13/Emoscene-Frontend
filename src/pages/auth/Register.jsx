import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { Mail, Lock, User, Loader, UserPlus } from "lucide-react";

export const Register = () => {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (!formData.name || !formData.email || !formData.password) {
            setValidationError("All fields are required to create your account.");
            return;
        }

        if (formData.password.length < 6) {
            setValidationError("Security first: Password must be at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords do not match. Please check again.");
            return;
        }

        const success = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });

        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-500">

            {/* Dynamic Background Orbs */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        x: [0, 50, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-600/15 rounded-full blur-[120px]"
                />
            </div>

            {/* Registration Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md z-10 py-10"
            >
                <div className="backdrop-blur-2xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-none">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="w-14 h-14 bg-gradient-to-br from-purple-600 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20"
                        >
                            <span className="text-2xl">🕯️</span>
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Join Emoscence
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                            Create your space in our sensory community.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-1">
                                Full Name
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="hello@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••"
                                        className="w-full pl-11 pr-3 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-1">
                                    Confirm
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••"
                                        className="w-full pl-11 pr-3 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Error Messaging */}
                        <AnimatePresence mode="wait">
                            {(error || validationError) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-xs font-bold text-center"
                                >
                                    {error || validationError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-4 hover:shadow-xl hover:shadow-purple-500/10"
                        >
                            {loading ? (
                                <Loader size={20} className="animate-spin" />
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    <span>Create Account</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Already a member?{" "}
                            <Link
                                to="/login"
                                className="text-gray-900 dark:text-white font-black hover:underline decoration-purple-500 underline-offset-4 transition"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};