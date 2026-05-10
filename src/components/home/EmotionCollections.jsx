import { motion } from "framer-motion";
import { BatteryCharging, Flame, Heart, PartyPopper } from "lucide-react";
import { MoodSection } from "./MoodSection";

const moods = [
    {
        name: "Relax",
        desc: "Soft, quiet blends for winding down.",
        icon: Flame,
        gradient: "from-sky-500 to-teal-500",
    },
    {
        name: "Love",
        desc: "Warm florals and cozy notes for closeness.",
        icon: Heart,
        gradient: "from-rose-500 to-pink-500",
    },
    {
        name: "Focus",
        desc: "Bright notes for clear, steady work.",
        icon: BatteryCharging,
        gradient: "from-amber-400 to-lime-500",
    },
    {
        name: "Festive",
        desc: "Rich, celebratory blends for hosting.",
        icon: PartyPopper,
        gradient: "from-violet-500 to-fuchsia-500",
    },
];

export const EmotionCollections = () => {
    return (
        <motion.div
            id="moods"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <MoodSection categories={moods} />
        </motion.div>
    );
};
