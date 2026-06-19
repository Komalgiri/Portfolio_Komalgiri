import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import BackendPathArt from './bridge/BackendPathArt';
import FrontendPathArt from './bridge/FrontendPathArt';
import CardWaveArt from './bridge/CardWaveArt';

const pathCards = [
    {
        id: 'backend',
        Art: BackendPathArt,
        headline: 'Need a backend engineer?',
        subtext: 'APIs, databases & system design — see how I architect products',
        cta: 'View system design',
        href: '#system-design',
        side: 'left' as const,
    },
    {
        id: 'frontend',
        Art: FrontendPathArt,
        headline: 'Hiring for UI craft?',
        subtext: 'Mobile screens, flows & interfaces — browse the visual work',
        cta: 'Browse UI gallery',
        href: '#ui-design',
        side: 'right' as const,
    },
];

const PathCard = ({
    Art,
    headline,
    subtext,
    cta,
    href,
    x,
    opacity,
    className = '',
}: (typeof pathCards)[number] & {
    x: MotionValue<number>;
    opacity: MotionValue<number>;
    className?: string;
}) => (
    <motion.a
        href={href}
        style={{ x, opacity }}
        className={`group relative z-20 block w-[min(48vw,175px)] shrink-0 overflow-hidden rounded-2xl border border-theme-border bg-[var(--color-card-glass)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/40 hover:shadow-2xl sm:w-[360px] md:w-[400px] lg:w-[420px] ${className}`}
    >
        <div className="flex min-h-[148px] sm:min-h-[168px]">
            <div className="relative flex w-1/2 shrink-0 items-center justify-center overflow-hidden transition-[filter] duration-300 group-hover:brightness-105">
                <CardWaveArt />
                <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-4">
                    <Art />
                </div>
            </div>

            <div className="flex w-1/2 flex-col justify-center gap-1.5 p-3 sm:gap-2 sm:p-4 md:p-5">
                <h3 className="text-[11px] font-black leading-tight text-theme-text sm:text-base md:text-lg lg:text-xl">
                    {headline}
                </h3>
                <p className="text-[9px] font-semibold leading-snug text-theme-muted sm:text-xs md:text-sm">
                    {subtext}
                </p>
                <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 px-2 py-1 text-[8px] font-bold text-indigo-600 transition-all duration-300 group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white dark:text-indigo-400 dark:group-hover:text-white sm:mt-2 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                    {cta}
                    <HiOutlineArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5 sm:text-sm" />
                </span>
            </div>
        </div>
    </motion.a>
);

const CenterScrollText = ({
    opacity,
    y,
}: {
    opacity: MotionValue<number>;
    y: MotionValue<number>;
}) => (
    <motion.div
        style={{ opacity, y }}
        className="pointer-events-none flex flex-col items-center justify-center text-center"
    >
        <p className="text-lg font-black uppercase tracking-[0.25em] text-theme-text sm:text-xl md:text-2xl">
            Scroll for
        </p>
        <p className="text-lg font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 sm:text-xl md:text-2xl">
            more projects
        </p>
        <motion.span
            aria-hidden="true"
            className="mt-2 text-lg text-indigo-500 motion-reduce:animate-none dark:text-indigo-400 motion-safe:animate-bounce"
        >
            ↓
        </motion.span>
    </motion.div>
);

const DesignPathBridge = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const reducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 0.92', 'start 0.4'],
    });

    const leftX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-200, 0]);
    const rightX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [200, 0]);
    const cardOpacity = useTransform(scrollYProgress, [0, 0.5, 1], reducedMotion ? [1, 1, 1] : [0, 0.55, 1]);
    const centerOpacity = useTransform(scrollYProgress, [0, 0.35, 1], reducedMotion ? [1, 1, 1] : [0, 0.7, 1]);
    const centerY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [12, 0]);

    const [leftCard, rightCard] = pathCards;

    return (
        <section
            ref={sectionRef}
            id="design-path-bridge"
            className="relative overflow-hidden border-t border-theme-border bg-theme-bg py-10 sm:py-12 md:py-14"
            aria-label="Choose your focus"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex min-h-[260px] flex-col gap-6 sm:hidden">
                    <CenterScrollText opacity={centerOpacity} y={centerY} />
                    <div className="flex flex-col items-stretch gap-4">
                        <PathCard {...leftCard} x={leftX} opacity={cardOpacity} className="w-full" />
                        <PathCard {...rightCard} x={rightX} opacity={cardOpacity} className="w-full" />
                    </div>
                </div>

                <div className="relative hidden min-h-[180px] items-center sm:flex md:min-h-[190px] lg:min-h-[200px]">
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[min(380px,42vw)] lg:px-[440px]">
                        <CenterScrollText opacity={centerOpacity} y={centerY} />
                    </div>

                    <div className="relative flex w-full items-center justify-between gap-4">
                        <PathCard {...leftCard} x={leftX} opacity={cardOpacity} />
                        <PathCard {...rightCard} x={rightX} opacity={cardOpacity} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignPathBridge;
