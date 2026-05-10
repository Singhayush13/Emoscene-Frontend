import { Camera } from "lucide-react";
import { motion } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1602872030358-9ae0166b1b9a?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1612196808214-b7e239e5f1c7?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1608181831718-15d6d6f2c4f6?auto=format&fit=crop&q=80&w=900",
];

export const InstagramFeed = () => {
    return (
        <section className="bg-white px-4 py-20 dark:bg-[#070707]">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-orange-600">
                            On the shelf
                        </span>
                        <h2 className="mt-4 text-4xl font-bold tracking-normal text-gray-950 dark:text-white">
                            Styled for everyday rituals
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
                        <Camera size={18} />
                        @emoscence
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {images.map((src, index) => (
                        <motion.img
                            key={src}
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06, duration: 0.4 }}
                            src={src}
                            alt={`Emoscence styled scene ${index + 1}`}
                            className="aspect-square w-full rounded-lg object-cover"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
