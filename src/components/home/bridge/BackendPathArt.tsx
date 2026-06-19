import { motion } from 'framer-motion';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
};

interface BackendPathArtProps {
    className?: string;
}

const BackendPathArt = ({ className = '' }: BackendPathArtProps) => {
    const reducedMotion = useReducedMotion();

    const floatAnim = reducedMotion
        ? undefined
        : {
              y: [0, -5, 0],
              transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const },
          };

    const flowAnim = reducedMotion
        ? undefined
        : {
              strokeDashoffset: [0, -20],
              transition: { duration: 1.5, repeat: Infinity, ease: 'linear' as const },
          };

    return (
        <motion.svg
            viewBox="0 0 160 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`relative z-10 h-full w-full max-h-[140px] max-w-[120px] text-indigo-500 dark:text-indigo-400 ${className}`}
            aria-hidden="true"
            animate={floatAnim}
        >
            <motion.rect x="52" y="12" width="56" height="28" rx="5" {...stroke} />
            <motion.path
                d="M64 26h32M76 20v12"
                {...stroke}
                strokeWidth={1}
                animate={flowAnim}
                strokeDasharray="4 4"
            />

            <motion.path
                d="M80 40v14M40 54h80"
                {...stroke}
                strokeWidth={1.2}
                animate={flowAnim}
                strokeDasharray="3 5"
            />
            <motion.path d="M40 54v10M80 54v10M120 54v10" {...stroke} strokeWidth={1.2} />

            {[28, 68, 108].map((x, i) => (
                <motion.g
                    key={x}
                    animate={
                        reducedMotion
                            ? undefined
                            : { y: [0, -2, 0], transition: { duration: 2.2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.2 } }
                    }
                >
                    <rect x={x} y="64" width="44" height="32" rx="5" {...stroke} />
                    <path d={`M${x + 10} 80h24`} {...stroke} strokeWidth={1} opacity={0.45} />
                </motion.g>
            ))}

            <motion.path
                d="M50 96v10M80 96v10M110 96v10M50 106h60"
                {...stroke}
                strokeWidth={1.2}
                animate={flowAnim}
                strokeDasharray="3 4"
            />

            <motion.ellipse cx="80" cy="128" rx="40" ry="8" {...stroke} />
            <motion.path d="M40 128v24c0 4.4 17.9 8 40 8s40-3.6 40-8v-24" {...stroke} />
            <motion.ellipse cx="80" cy="152" rx="40" ry="8" {...stroke} />

            <motion.circle
                cx="80"
                cy="26"
                r="3"
                fill="currentColor"
                animate={
                    reducedMotion
                        ? undefined
                        : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.2, 0.85], transition: { duration: 1.8, repeat: Infinity } }
                }
            />

            <motion.path
                d="M14 120h20M126 88h20"
                {...stroke}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.4}
                animate={flowAnim}
            />
        </motion.svg>
    );
};

export default BackendPathArt;
