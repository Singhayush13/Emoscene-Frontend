import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const quickLinks = [
    { label: "Products", to: "/products" },
    { label: "Cart", to: "/cart" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Login", to: "/login" },
];

const socials = [
    { label: "Instagram", icon: FaInstagram, href: "#" },
    { label: "Twitter", icon: FaTwitter, href: "#" },
    { label: "Facebook", icon: FaFacebookF, href: "#" },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
            >
                <div className="grid gap-12 lg:grid-cols-[1.15fr_0.7fr_1fr]">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 font-black text-white">
                                E
                            </span>
                            <span>
                                <span className="block text-2xl font-black text-gray-950 dark:text-white">
                                    Emoscence
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    Premium scents
                                </span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-md leading-7 text-gray-600 dark:text-gray-400">
                            Mood-led candles and home fragrances crafted for calm mornings, focused afternoons, and warm evenings.
                        </p>

                        <form
                            className="mt-7 flex max-w-md gap-2"
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Email address"
                                aria-label="Email address"
                                className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-orange-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-lg bg-gray-950 px-4 text-white transition hover:bg-orange-600 dark:bg-white dark:text-gray-950 dark:hover:bg-orange-400"
                                aria-label="Subscribe"
                            >
                                <Send size={19} />
                            </button>
                        </form>
                    </div>

                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-orange-600">
                            Explore
                        </h3>
                        <ul className="mt-6 space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="font-medium text-gray-600 transition hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-orange-600">
                            Studio
                        </h3>
                        <div className="mt-6 space-y-4">
                            <div className="flex gap-3">
                                <MapPin className="mt-1 shrink-0 text-orange-500" size={20} />
                                <div>
                                    <p className="font-bold text-gray-950 dark:text-white">Mumbai, India</p>
                                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        Small-batch fragrance studio
                                    </p>
                                </div>
                            </div>
                            <a
                                href="mailto:hello@emoscence.com"
                                className="inline-flex items-center gap-3 font-medium text-gray-600 transition hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
                            >
                                <Mail size={20} />
                                hello@emoscence.com
                            </a>
                        </div>

                        <div className="mt-8 flex gap-3">
                            {socials.map(({ label, icon: Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-gray-800 dark:text-gray-300"
                                >
                                    <Icon size={19} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-800 md:flex-row md:items-center md:justify-between">
                    <p>Copyright {currentYear} Emoscence. All rights reserved.</p>
                    <div className="flex gap-5">
                        <a href="#" className="transition hover:text-orange-600">Privacy</a>
                        <a href="#" className="transition hover:text-orange-600">Terms</a>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};
