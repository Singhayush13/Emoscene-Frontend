import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
    Heart,
    LayoutDashboard,
    LogOut,
    Menu,
    Moon,
    ShoppingCart,
    Sun,
    User,
    X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import logoImage from "../../assets/images/logo.jpeg";

const navItems = [{ label: "Products", to: "/products" }];

const baseIconButton =
    "relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-orange-500";

export const Navbar = () => {
    const { isAuthenticated, logout, isAdmin } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const cart = useSelector((state) => state.cart);
    const wishlist = useSelector((state) => state.wishlist);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const renderCount = (count, color = "bg-orange-500") => {
        if (!count) {
            return null;
        }

        return (
            <span className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-950 ${color}`}>
                {count}
            </span>
        );
    };

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-all duration-300 ${isScrolled
                ? "border-gray-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-gray-800/80 dark:bg-gray-950/90"
                : "border-transparent bg-white dark:bg-gray-950"
                }`}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg shadow-orange-500/20 ring-1 ring-orange-100 dark:bg-gray-900 dark:ring-gray-800">
                        <img src={logoImage} alt="Emoscence logo" className="h-full w-full object-cover" />
                    </span>
                    <span className="flex flex-col">
                        <span className="text-xl font-black tracking-normal text-gray-950 dark:text-white">
                            Emoscence
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Premium scents
                        </span>
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <div className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `text-sm font-bold transition ${isActive
                                        ? "text-orange-600 dark:text-orange-400"
                                        : "text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {isAuthenticated && isAdmin ? (
                            <NavLink
                                to="/admin/dashboard"
                                className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 transition hover:text-purple-500 dark:text-purple-300"
                            >
                                <LayoutDashboard size={16} />
                                Admin
                            </NavLink>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            className={baseIconButton}
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {isAuthenticated ? (
                            <Link to="/wishlist" className={baseIconButton} aria-label="Wishlist">
                                <Heart size={18} />
                                {renderCount(wishlist.items.length, "bg-red-500")}
                            </Link>
                        ) : null}

                        <Link to="/cart" className={baseIconButton} aria-label="Cart">
                            <ShoppingCart size={18} />
                            {renderCount(cart.totalItems)}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className={baseIconButton} aria-label="Profile">
                                    <User size={18} />
                                </Link>
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-50 px-4 text-sm font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/50"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-lg px-4 py-2 text-sm font-bold text-gray-700 transition hover:text-orange-600 dark:text-gray-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 dark:bg-white dark:text-gray-950 dark:hover:bg-orange-400"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <Link to="/cart" className={baseIconButton} aria-label="Cart">
                        <ShoppingCart size={18} />
                        {renderCount(cart.totalItems)}
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((value) => !value)}
                        className={baseIconButton}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen ? (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden"
                    >
                        <div className="space-y-3 px-4 py-5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMenu}
                                    className="block rounded-lg bg-gray-50 px-4 py-3 font-bold text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {isAuthenticated && isAdmin ? (
                                <Link
                                    to="/admin/dashboard"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-3 font-bold text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                                >
                                    <LayoutDashboard size={18} />
                                    Admin dashboard
                                </Link>
                            ) : null}

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={toggleDarkMode}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 font-bold dark:border-gray-800"
                                >
                                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                                    Theme
                                </button>

                                {isAuthenticated ? (
                                    <Link
                                        to="/wishlist"
                                        onClick={closeMenu}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 font-bold dark:border-gray-800"
                                    >
                                        <Heart size={18} />
                                        Wishlist
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="rounded-lg border border-gray-200 px-4 py-3 text-center font-bold dark:border-gray-800"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>

                            {isAuthenticated ? (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        to="/profile"
                                        onClick={closeMenu}
                                        className="rounded-lg bg-gray-50 px-4 py-3 text-center font-bold dark:bg-gray-900"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            closeMenu();
                                            logout();
                                        }}
                                        className="rounded-lg bg-red-50 px-4 py-3 font-bold text-red-600 dark:bg-red-950/40 dark:text-red-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="block rounded-lg bg-orange-600 px-4 py-3 text-center font-bold text-white"
                                >
                                    Create account
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </header>
    );
};
