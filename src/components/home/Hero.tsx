import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/scrollAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
    HiOutlineArrowRight,
    HiOutlineArrowDownTray,
    HiOutlineGlobeAlt,
    HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import profilePhoto from '../../assets/profile_port.png';

const roles = ['Full Stack Developer', 'React Native Builder', 'API-Focused Engineer'];

const cardBase =
    'w-full rounded-2xl border border-theme-border bg-[var(--color-card-glass)] p-4 shadow-lg backdrop-blur-sm';

const infoCards = [
    {
        id: 'build',
        content: (
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-theme-muted">What I Build</p>
                    <p className="mt-1 text-sm font-black text-theme-text">Web & mobile products</p>
                    <p className="mt-1 text-xs leading-relaxed text-theme-muted">
                        React dashboards, React Native apps & Node.js APIs — designed for clarity and scale.
                    </p>
                </div>
                <HiOutlineRocketLaunch className="shrink-0 text-lg text-indigo-400" />
            </div>
        ),
    },
    {
        id: 'avail',
        content: (
            <>
                <div className="flex items-center gap-1.5 text-indigo-400">
                    <HiOutlineGlobeAlt className="text-base" />
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-theme-muted">Availability</span>
                </div>
                <p className="mt-1.5 text-sm font-black text-theme-text">Open to freelance & full-time</p>
                <p className="mt-1 text-xs leading-relaxed text-theme-muted">
                    Mobile apps, full-stack products & contract builds — remote-friendly.
                </p>
            </>
        ),
    },
    {
        id: 'momentum',
        content: (
            <>
                <div className="flex items-center gap-1.5 text-indigo-400">
                    <HiOutlineRocketLaunch className="text-base" />
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-theme-muted">Momentum</span>
                </div>
                <p className="mt-1.5 text-sm font-black text-theme-text">1.5+ years building</p>
                <p className="mt-1 text-xs leading-relaxed text-theme-muted">
                    Shipping end-to-end features across UI, APIs & mobile with fast iteration.
                </p>
            </>
        ),
    },
] as const;

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [pointer, setPointer] = useState({ x: 50, y: 50 });
    const [roleIndex, setRoleIndex] = useState(0);
    const [isCoarsePointer, setIsCoarsePointer] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    );
    const reducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const photoY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 80]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 50]);

    useEffect(() => {
        const mq = window.matchMedia('(pointer: coarse)');
        const handler = (e: MediaQueryListEvent) => setIsCoarsePointer(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (reducedMotion) return;
        const timer = window.setInterval(() => {
            setRoleIndex((current) => (current + 1) % roles.length);
        }, 2400);
        return () => window.clearInterval(timer);
    }, [reducedMotion]);

    const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
        if (isCoarsePointer || reducedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
            x: ((event.clientX - bounds.left) / bounds.width) * 100,
            y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
    };

    const parallaxStyle =
        !isCoarsePointer && !reducedMotion
            ? { transform: `translate(${pointer.x * 0.8}%, ${pointer.y * 0.45}%)` }
            : undefined;

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[92vh] overflow-x-clip bg-theme-bg pt-28 pb-16 transition-colors duration-300 md:pt-32 md:pb-20"
            onMouseMove={handlePointerMove}
        >
            <div className="absolute inset-0 opacity-40" aria-hidden="true">
                <div
                    className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl transition-transform duration-300"
                    style={parallaxStyle}
                />
                <div className="absolute inset-0 hero-grid-pattern opacity-40" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-20 text-center font-black uppercase tracking-[-0.08em] text-[var(--color-hero-watermark)] select-none">
                <span className="block text-[24vw] leading-none md:text-[17vw]">Developer</span>
            </div>

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12">
                <motion.div style={{ y: contentY }} className="w-full">
                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 rounded-full border border-theme-border bg-theme-surface/50 px-5 py-2 text-sm font-medium text-indigo-500 dark:text-indigo-300"
                    >
                        <span className="h-2 w-2 rounded-full bg-green-400" />
                        Open for freelance & full-time
                    </motion.div>

                    <motion.h1
                        initial={reducedMotion ? false : { opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-8 text-4xl font-black leading-tight tracking-tight text-theme-text md:text-5xl lg:text-6xl"
                    >
                        Hello, Komal Giri.
                    </motion.h1>

                    <p
                        aria-live="polite"
                        className="mt-3 h-[1.2em] overflow-hidden text-2xl font-bold text-indigo-400 md:text-3xl lg:text-4xl"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roles[roleIndex]}
                                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reducedMotion ? undefined : { opacity: 0, y: -16 }}
                                transition={{ duration: 0.4 }}
                                className="block"
                            >
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </p>

                    <motion.p
                        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-8 max-w-lg text-lg leading-relaxed text-theme-muted"
                    >
                        I design and ship web and mobile applications with React, React Native, Node.js, and backend APIs.
                    </motion.p>

                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-10 flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-indigo-600 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
                            >
                                Explore Projects
                                <HiOutlineArrowRight className="text-lg" />
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center justify-center gap-3 rounded-xl border border-theme-border bg-theme-surface/50 px-8 py-3.5 font-semibold text-theme-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-theme-surface"
                            >
                                Download Resume
                                <HiOutlineArrowDownTray className="text-lg" />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-3 rounded-xl border border-theme-border bg-theme-surface/50 px-8 py-3.5 font-semibold text-theme-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-theme-surface"
                            >
                                Hire Me
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/Komalgiri"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub profile"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-theme-border bg-theme-surface/50 text-theme-muted transition-colors hover:border-indigo-500/30 hover:text-theme-text"
                            >
                                <SiGithub className="text-xl" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/komalgiri/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn profile"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-theme-border bg-theme-surface/50 text-theme-muted transition-colors hover:border-indigo-500/30 hover:text-theme-text"
                            >
                                <SiLinkedin className="text-xl" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right column — photo + cards */}
                <motion.div
                    initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative mx-auto w-full max-w-md lg:max-w-none"
                >
                    <motion.div style={{ y: photoY }} className="relative mx-auto flex justify-center">
                        <div className="relative">
                            <div
                                className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[70px]"
                                aria-hidden="true"
                            />
                            <motion.img
                                initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.25 }}
                                src={profilePhoto}
                                alt="Komal Giri"
                                width={270}
                                height={270}
                                loading="eager"
                                fetchPriority="high"
                                className="relative block h-auto w-[200px] select-none object-contain md:w-[230px] lg:w-[250px] xl:w-[270px]"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:gap-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {infoCards.map((card) => (
                            <motion.div
                                key={card.id}
                                variants={fadeUp}
                                whileHover={reducedMotion ? undefined : { y: -4 }}
                                className={cardBase}
                            >
                                {card.content}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
