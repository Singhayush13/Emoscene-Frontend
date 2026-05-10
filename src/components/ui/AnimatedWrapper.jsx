import { motion } from "framer-motion";

export const AnimatedWrapper = ({
    children,
    delay = 0,
    duration = 0.6,
    type = "fadeInUp", // fadeInUp, fadeInDown, fadeInLeft, fadeInRight, slideIn, scaleIn, rotateIn
    className = "",
    whileHover = null,
    whileTap = null,
    onViewInView = null,
}) => {
    const variants = {
        fadeInUp: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        },
        fadeInDown: {
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
        },
        fadeInLeft: {
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
        },
        fadeInRight: {
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 }
        },
        slideIn: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        },
        rotateIn: {
            hidden: { opacity: 0, rotate: -10, scale: 0.9 },
            visible: { opacity: 1, rotate: 0, scale: 1 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            onViewportEnter={onViewInView}
            variants={variants[type]}
            transition={{ duration, delay, ease: "easeOut" }}
            whileHover={whileHover}
            whileTap={whileTap}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger Container for animating multiple children
export const AnimatedStaggerContainer = ({
    children,
    delay = 0,
    staggerDelay = 0.1,
    className = "",
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { ease: "easeOut", duration: 0.5 },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className={className}
        >
            {Array.isArray(children)
                ? children.map((child, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                        {child}
                    </motion.div>
                ))
                : children}
        </motion.div>
    );
};
