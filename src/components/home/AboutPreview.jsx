import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ABOUT_IMAGE =
    "https://images.unsplash.com/photo-1608181831718-15d6d6f2c4f6?auto=format&fit=crop&q=80&w=1200";

const points = [
    { icon: Leaf, title: "Clean blends", text: "Phthalate-free fragrance oils and thoughtful wax choices." },
    { icon: ShieldCheck, title: "Small batches", text: "Poured with attention instead of rushed mass production." },
    { icon: Sparkles, title: "Mood-led", text: "Built around how you want a room to feel." },
];

export const AboutPreview = () => {
    return (
        <section className="bg-white px-4 py-24 dark:bg-[#070707]">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="overflow-hidden rounded-lg"
                >
                    <img
                        src={ABOUT_IMAGE}
                        alt="Minimal candle arrangement"
                        className="h-[430px] w-full object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                >
                    <span className="text-xs font-black uppercase tracking-widest text-orange-600">
                        About Emoscence
                    </span>
                    <h2 className="mt-4 text-4xl font-bold leading-tight tracking-normal text-gray-950 dark:text-white md:text-5xl">
                        Fragrance made for the moments that make a home.
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        We design each scent around an emotion first, then build the fragrance profile around that feeling.
                    </p>

                    <div className="mt-8 grid gap-4">
                        {points.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                                    <Icon size={21} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-950 dark:text-white">{title}</h3>
                                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/products"
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-950 px-7 py-4 font-bold text-white transition hover:bg-orange-600 dark:bg-white dark:text-gray-950 dark:hover:bg-orange-400"
                    >
                        Explore the collection
                        <ArrowRight size={19} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
