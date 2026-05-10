import { motion } from "framer-motion";
import { SectionTitle } from "../ui";
import { MoodCard } from "./MoodCard";

export const MoodSection = ({ categories }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    return (
        <section className="bg-white px-4 py-24 transition-colors duration-300 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionTitle
                        title="Choose Your Mood"
                        subtitle="Shop by the atmosphere you want to create."
                        align="center"
                        gradient={true}
                        animation={true}
                    />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16"
                >
                    {categories.map((mood, idx) => (
                        <MoodCard key={mood.name} mood={mood} index={idx} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};
