interface CardWaveArtProps {
    className?: string;
}

const CardWaveArt = ({ className = '' }: CardWaveArtProps) => (
    <svg
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
        className={`absolute inset-x-0 bottom-0 h-1/2 w-full text-indigo-500/20 dark:text-indigo-400/15 ${className}`}
        aria-hidden="true"
    >
        <path
            d="M0 72 C40 52, 80 92, 120 72 S200 52, 200 72 V120 H0 Z"
            fill="currentColor"
        />
        <path
            d="M0 88 C50 68, 100 108, 150 88 S220 68, 200 88 V120 H0 Z"
            fill="currentColor"
            opacity={0.55}
        />
        <path
            d="M0 100 C35 86, 70 110, 110 100 S180 86, 200 100 V120 H0 Z"
            fill="currentColor"
            opacity={0.35}
        />
    </svg>
);

export default CardWaveArt;
