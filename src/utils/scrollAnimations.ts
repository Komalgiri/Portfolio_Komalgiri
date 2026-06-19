import type { Transition, Variants } from 'framer-motion';

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const defaultTransition: Transition = {
    duration: 0.65,
    ease: easeOut,
};

export const reducedMotionTransition: Transition = {
    duration: 0,
};

export const defaultViewport = {
    once: true,
    margin: '-80px',
} as const;

const noMotion = { opacity: 1, x: 0, y: 0, scale: 1 };

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
};

export const fadeUpReduced: Variants = {
    hidden: noMotion,
    visible: noMotion,
};

export const fadeDown: Variants = {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
};

export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

export const staggerContainerReduced: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0,
            delayChildren: 0,
        },
    },
};

export const lineGrow: Variants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 1.2, ease: easeOut },
    },
};

export function motionVariants(reduced: boolean) {
    return {
        fadeUp: reduced ? fadeUpReduced : fadeUp,
        staggerContainer: reduced ? staggerContainerReduced : staggerContainer,
        transition: reduced ? reducedMotionTransition : defaultTransition,
    };
}
