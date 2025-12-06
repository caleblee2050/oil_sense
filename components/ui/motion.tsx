
"use client";

import { motion, HTMLMotionProps } from "framer-motion";

// Stagger container
export const StaggerContainer = ({ children, className, ...props }: HTMLMotionProps<"div">) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1,
                    },
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Fade Up Item
export const FadeUpItem = ({ children, className, ...props }: HTMLMotionProps<"div">) => {
    return (
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                    }
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Scale on Hover Card Wrapper
export const HoverCard = ({ children, className, ...props }: HTMLMotionProps<"div">) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Number Counter
export const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
    // Basic counter implementation using framer motion's animate is complex in React component render cycle individually
    // For simplicity MVP we can use a key change or just animate the mounting.
    // Or better, use a simple text content animation if needed.
    // For now, let's keep it simple: Just standard text, but maybe animate opacity.
    return (
        <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {to.toLocaleString()}
        </motion.span>
    );
};
