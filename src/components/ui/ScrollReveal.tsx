import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import {
    defaultTransition,
    defaultViewport,
    fadeDown,
    fadeLeft,
    fadeRight,
    fadeUp,
    scaleIn,
} from '../../utils/scrollAnimations';

const variantMap = {
    fadeUp,
    fadeDown,
    fadeLeft,
    fadeRight,
    scaleIn,
} as const;

type ScrollRevealProps = HTMLMotionProps<'div'> & {
    variant?: keyof typeof variantMap;
    customVariants?: Variants;
    delay?: number;
    as?: 'div' | 'section' | 'article' | 'footer' | 'li';
};

const motionMap = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    footer: motion.footer,
    li: motion.li,
} as const;

const ScrollReveal = ({
    variant = 'fadeUp',
    customVariants,
    delay = 0,
    as = 'div',
    children,
    transition,
    viewport,
    className,
    style,
}: ScrollRevealProps) => {
    const Component = motionMap[as];

    return (
        <Component
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={viewport ?? defaultViewport}
            variants={customVariants ?? variantMap[variant]}
            transition={{ ...defaultTransition, delay, ...transition }}
        >
            {children}
        </Component>
    );
};

export default ScrollReveal;
