import { motion } from 'framer-motion';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
};

interface FrontendPathArtProps {
    className?: string;
}

const FrontendPathArt = ({ className = '' }: FrontendPathArtProps) => {
    const reducedMotion = useReducedMotion();

    const floatAnim = reducedMotion
        ? undefined
        : {
              y: [0, -6, 0],
              rotate: [0, 1.5, 0, -1.5, 0],
              transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
          };

    const shimmerAnim = reducedMotion
        ? undefined
        : {
              opacity: [0.35, 0.85, 0.35],
              transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
          };

    return (
        <motion.svg
            viewBox="0 0 160 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`relative z-10 h-full w-full max-h-[140px] max-w-[110px] text-indigo-500 dark:text-indigo-400 ${className}`}
            aria-hidden="true"
            animate={floatAnim}
        >
            <motion.rect x="44" y="10" width="72" height="148" rx="12" {...stroke} />
            <motion.rect x="52" y="22" width="56" height="124" rx="3" {...stroke} strokeWidth={1} opacity={0.45} />

            <motion.path d="M68 10h24a8 8 0 0 1 8 8v2H60v-2a8 8 0 0 1 8-8z" {...stroke} strokeWidth={1.1} />
            <motion.path d="M60 36h40M60 44h28" {...stroke} strokeWidth={1} opacity={0.45} animate={shimmerAnim} />

            <motion.rect x="56" y="54" width="48" height="36" rx="6" {...stroke} />
            <motion.path d="M64 66h32M64 76h20" {...stroke} strokeWidth={1} opacity={0.45} animate={shimmerAnim} />

            <motion.rect x="56" y="98" width="48" height="18" rx="4" {...stroke} strokeWidth={1.1} />
            <motion.rect x="56" y="122" width="48" height="18" rx="4" {...stroke} strokeWidth={1.1} />

            <motion.rect x="60" y="148" width="40" height="14" rx="7" {...stroke} strokeWidth={1.1} />
            <motion.circle cx="72" cy="155" r="2.5" {...stroke} strokeWidth={1} />
            <motion.circle cx="88" cy="155" r="2.5" {...stroke} strokeWidth={1} />

            <motion.rect
                x="8"
                y="58"
                width="30"
                height="24"
                rx="5"
                {...stroke}
                animate={
                    reducedMotion
                        ? undefined
                        : { x: [8, 10, 8], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } }
                }
            />
            <motion.rect
                x="122"
                y="72"
                width="30"
                height="30"
                rx="6"
                {...stroke}
                animate={
                    reducedMotion
                        ? undefined
                        : { x: [122, 118, 122], y: [72, 70, 72], transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const } }
                }
            />

            <motion.circle
                cx="136"
                cy="64"
                r="5"
                fill="currentColor"
                animate={
                    reducedMotion
                        ? undefined
                        : { opacity: [0.4, 1, 0.4], scale: [0.8, 1.15, 0.8], transition: { duration: 2, repeat: Infinity } }
                }
            />
        </motion.svg>
    );
};

export default FrontendPathArt;
