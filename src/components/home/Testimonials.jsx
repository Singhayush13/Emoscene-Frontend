import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Ananya",
        text: "The Relax candle became part of my evening routine after the first burn.",
    },
    {
        name: "Ritika",
        text: "Beautiful packaging, balanced fragrance, and it genuinely makes the room feel calmer.",
    },
    {
        name: "Dev",
        text: "Focus is subtle enough for work but still noticeable. Exactly what I wanted.",
    },
];

export const Testimonials = () => {
    return (
        <section className="bg-stone-50 px-4 py-20 dark:bg-[#0b0b0b]">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 max-w-2xl">
                    <span className="text-xs font-black uppercase tracking-widest text-orange-600">
                        Loved by customers
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-normal text-gray-950 dark:text-white">
                        Notes from real homes
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((item, index) => (
                        <motion.article
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.45 }}
                            className="rounded-lg border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                        >
                            <Quote className="text-orange-500" size={30} />
                            <p className="mt-5 leading-7 text-gray-700 dark:text-gray-300">"{item.text}"</p>
                            <p className="mt-6 font-bold text-gray-950 dark:text-white">{item.name}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
