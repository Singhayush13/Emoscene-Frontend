import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const MoodCard = ({ mood, index }) => {
    const Icon = mood.icon;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" }
        }
    };

    const hoverVariants = {
        initial: { y: 0 },
        hover: {
            y: -8,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            transition: { duration: 0.3 }
        }
    };

    const getColorGradient = (name) => {
        const gradientMap = {
            "Relax": "from-blue-400 to-cyan-600",
            "Love": "from-pink-400 to-red-600",
            "Focus": "from-yellow-400 to-orange-600",
            "Festive": "from-purple-400 to-pink-600"
        };
        return gradientMap[name] || "from-purple-400 to-pink-600";
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="h-full"
        >
            <Link to={`/products?category=${encodeURIComponent(mood.name)}`}>
                <motion.div
                    variants={hoverVariants}
                    initial="initial"
                    className={`
                        relative group h-80 rounded-lg overflow-hidden cursor-pointer
                        bg-gradient-to-br ${getColorGradient(mood.name)}
                        shadow-lg transition-all duration-300
                    `}
                >
                    <div className="absolute inset-0 bg-black/25 transition-all duration-300 group-hover:bg-black/35" />

                    <div className="relative h-full p-8 flex flex-col justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur">
                            {Icon ? <Icon size={34} /> : null}
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-3xl font-bold text-white drop-shadow-md">
                                {mood.name}
                            </h3>
                            <p className="text-white/90 text-base font-medium drop-shadow-md">
                                {mood.desc}
                            </p>

                            <div className="flex items-center gap-2 pt-2 text-white/85 transition group-hover:text-white">
                                <span className="text-sm font-semibold">Explore</span>
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};
