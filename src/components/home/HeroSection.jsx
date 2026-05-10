import { Link } from "react-router-dom";
import { ArrowRight, Compass, Flame, Gem, Leaf, ShoppingBag, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { GlowButton } from "../ui";
import logoImage from "../../assets/images/logo.jpeg";

const featureItems = [
    { label: "Mood-crafted scents", detail: "Signature blends for every ritual", icon: Leaf },
    { label: "Slow amber burn", detail: "Soft light with a room-filling glow", icon: Flame },
    { label: "Hand-poured luxury", detail: "Premium wax, polished finish", icon: Gem },
];

const emberItems = [
    { left: "7%", top: "26%", size: 4, delay: "0s", duration: "8s" },
    { left: "18%", top: "72%", size: 3, delay: "-2s", duration: "10s" },
    { left: "38%", top: "18%", size: 5, delay: "-4s", duration: "11s" },
    { left: "67%", top: "16%", size: 3, delay: "-1.5s", duration: "9s" },
    { left: "80%", top: "60%", size: 5, delay: "-3s", duration: "12s" },
    { left: "92%", top: "34%", size: 4, delay: "-5s", duration: "10s" },
];

const scentNotes = ["Vanilla amber", "Rose oud", "Citrus calm"];

export const HeroSection = () => {
    const handleMoodClick = () => {
        document.getElementById("moods")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative isolate overflow-hidden bg-[#fff8ef] text-stone-950 transition-colors duration-500 dark:bg-[#090507] dark:text-white">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,_#fff7eb_0%,_#f6dfc2_42%,_#edb98c_72%,_#fff3e2_100%)] transition-opacity duration-500 dark:opacity-0" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 dark:opacity-100 dark:bg-[linear-gradient(110deg,_#070304_0%,_#160b10_43%,_#2a1714_70%,_#100608_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,_rgba(175,84,32,0.22),_transparent_30%),linear-gradient(90deg,_rgba(255,250,242,0.96)_0%,_rgba(255,247,237,0.72)_45%,_rgba(255,235,211,0.45)_100%)] transition-opacity duration-500 dark:opacity-0" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 dark:opacity-100 dark:bg-[radial-gradient(circle_at_72%_45%,_rgba(255,178,90,0.26),_transparent_28%),linear-gradient(90deg,_rgba(8,4,6,0.96)_0%,_rgba(8,4,6,0.72)_45%,_rgba(8,4,6,0.4)_100%)]" />
            <div className="hero-noise absolute inset-0 opacity-[0.16] dark:opacity-[0.18]" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#fff8ef] to-transparent transition-colors duration-500 dark:from-[#080304]" />

            <div className="pointer-events-none absolute inset-0">
                {emberItems.map((ember) => (
                    <span
                        key={`${ember.left}-${ember.top}`}
                        className="hero-ember"
                        style={{
                            left: ember.left,
                            top: ember.top,
                            width: `${ember.size}px`,
                            height: `${ember.size}px`,
                            animationDelay: ember.delay,
                            animationDuration: ember.duration,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-5 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
                >
                    <div className="max-w-3xl space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 rounded-full border border-amber-700/15 bg-white/60 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-amber-900 shadow-[0_0_40px_rgba(175,84,32,0.12)] backdrop-blur-md dark:border-amber-200/20 dark:bg-white/[0.07] dark:text-amber-100 dark:shadow-[0_0_40px_rgba(255,162,77,0.12)]"
                        >
                            <Sparkles size={14} />
                            Artisan mood candles
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.32, duration: 0.8, ease: "easeOut" }}
                                className="max-w-4xl text-4xl font-black leading-[1.02] text-stone-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white"
                            >
                                Emoscence candles for spaces that feel quietly unforgettable.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.44, duration: 0.8, ease: "easeOut" }}
                                className="max-w-2xl text-base leading-8 text-stone-700 md:text-lg dark:text-stone-200/82"
                            >
                                Hand-poured scented candles with layered fragrance, polished glass, and a soft amber flame designed to turn everyday rooms into evening rituals.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.58, duration: 0.75, ease: "easeOut" }}
                            className="grid gap-3 sm:grid-cols-3"
                        >
                            {featureItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.label} className="group border-l border-amber-800/20 bg-white/55 px-4 py-4 shadow-[0_18px_52px_rgba(116,66,28,0.08)] backdrop-blur-sm transition duration-300 hover:border-amber-700/45 hover:bg-white/80 dark:border-amber-100/20 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-amber-200/50 dark:hover:bg-white/[0.08]">
                                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-amber-800/15 bg-amber-800/10 text-amber-900 shadow-[0_0_24px_rgba(175,84,32,0.16)] transition duration-300 group-hover:scale-105 dark:border-amber-100/20 dark:bg-amber-100/10 dark:text-amber-100 dark:shadow-[0_0_24px_rgba(255,184,92,0.18)]">
                                            <Icon size={18} />
                                        </div>
                                        <div className="text-sm font-semibold text-stone-950 dark:text-white">{item.label}</div>
                                        <div className="mt-1 text-xs leading-5 text-stone-600 dark:text-stone-300/75">{item.detail}</div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.72, duration: 0.75, ease: "easeOut" }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link to="/products" className="inline-flex">
                                <GlowButton variant="primary" size="lg" className="group rounded-full px-7 py-4 shadow-[0_18px_60px_rgba(255,151,64,0.26)]">
                                    <ShoppingBag className="mr-2" size={19} />
                                    Shop collection
                                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                                </GlowButton>
                            </Link>

                            <button
                                type="button"
                                onClick={handleMoodClick}
                                className="inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-white/60 px-7 py-4 font-semibold text-stone-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_40px_rgba(116,66,28,0.09)] backdrop-blur-md transition duration-300 hover:border-amber-700/35 hover:bg-white/85 dark:border-white/18 dark:bg-white/[0.06] dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:hover:border-amber-100/40 dark:hover:bg-white/[0.12]"
                            >
                                <Compass size={20} />
                                Browse moods
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-700 dark:text-stone-300/80"
                        >
                            <span className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                                <Star size={16} fill="currentColor" />
                                Curated scent notes
                            </span>
                            {scentNotes.map((note) => (
                                <span key={note} className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-amber-100/35">
                                    {note}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 1, ease: "easeOut" }}
                        className="relative mx-auto flex min-h-[510px] w-full max-w-[520px] items-center justify-center lg:min-h-[620px]"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 0.7, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ scale: 1.025 }}
                            className="hero-candle-scene hero-candle-stage relative h-[470px] w-[310px] cursor-pointer sm:h-[540px] sm:w-[360px]"
                        >
                            <div className="hero-magic-ring hero-magic-ring-one" />
                            <div className="hero-magic-ring hero-magic-ring-two" />
                            <div className="hero-candle-halo" />
                            <div className="hero-sparkle-field">
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                            <div className="hero-smoke hero-smoke-one" />
                            <div className="hero-smoke hero-smoke-two" />
                            <div className="hero-smoke hero-smoke-three" />

                            <div className="hero-flame">
                                <span />
                            </div>
                            <div className="hero-wick" />

                            <div className="hero-candle-body">
                                <div className="hero-candle-rim" />
                                <div className="hero-candle-wax" />
                                <div className="hero-candle-label">
                                    <img src={logoImage} alt="Emoscence logo" className="h-20 w-20 rounded-full object-cover shadow-[0_12px_34px_rgba(0,0,0,0.3)]" />
                                    <span>Emoscence</span>
                                    <small>Luxury mood candles</small>
                                </div>
                            </div>

                            <div className="hero-reflection" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            className="absolute right-0 top-8 hidden max-w-[170px] border border-amber-900/10 bg-white/65 p-4 shadow-[0_24px_70px_rgba(116,66,28,0.16)] backdrop-blur-xl sm:block dark:border-white/12 dark:bg-[#1b0d0d]/70 dark:shadow-[0_24px_70px_rgba(0,0,0,0.38)]"
                        >
                            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-amber-900/80 dark:text-amber-100/80">Glow profile</div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-900/10 dark:bg-white/10">
                                <span className="block h-full w-[84%] rounded-full bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300" />
                            </div>
                            <div className="mt-3 text-sm font-semibold text-stone-950 dark:text-white">Warm, calm, intimate</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-12 left-0 hidden max-w-[185px] border border-amber-900/10 bg-white/65 p-4 shadow-[0_24px_70px_rgba(116,66,28,0.14)] backdrop-blur-xl sm:block dark:border-white/12 dark:bg-white/[0.07] dark:shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
                        >
                            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                                <Sparkles size={16} />
                                <span className="text-xs font-semibold uppercase tracking-[0.22em]">Limited pour</span>
                            </div>
                            <p className="mt-2 text-sm leading-5 text-stone-700 dark:text-stone-200/82">Small batches finished for a clean, elegant burn.</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
