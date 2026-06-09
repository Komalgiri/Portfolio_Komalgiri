import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/scrollAnimations';
import {
    HiOutlineArrowRight,
    HiOutlineGlobeAlt,
    HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import profilePhoto from '../../assets/profile_port.png';

const roles = ['Full Stack Developer', 'React Native Builder', 'API-Focused Engineer'];

const cardBase =
    'w-[155px] rounded-2xl border border-white/10 bg-[#111827]/92 p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:w-[165px] sm:p-4';

const ARC_RADIUS = 188;
const ARC_CENTER_Y = 258;

const arcPosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * ARC_RADIUS;
    const y = Math.sin(rad) * ARC_RADIUS;
    return {
        left: `calc(50% + ${x}px)`,
        top: `${ARC_CENTER_Y + y}px`,
        transform: 'translate(-50%, -50%)',
    };
};

const infoCards = [
    {
        id: 'build',
        angle: 52,
        content: (
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">What I Build</p>
                    <p className="mt-1 text-sm font-black text-white">Web & mobile products</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                        React dashboards, React Native apps & Node.js APIs — designed for clarity and scale.
                    </p>
                </div>
                <HiOutlineRocketLaunch className="shrink-0 text-lg text-indigo-400" />
            </div>
        ),
    },
    {
        id: 'avail',
        angle: 90,
        content: (
            <>
                <div className="flex items-center gap-1.5 text-indigo-400">
                    <HiOutlineGlobeAlt className="text-base" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">Availability</span>
                </div>
                <p className="mt-1.5 text-sm font-black text-white">Open to full-time roles</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    Frontend, full-stack & product engineering — remote-friendly.
                </p>
            </>
        ),
    },
    {
        id: 'momentum',
        angle: 128,
        content: (
            <>
                <div className="flex items-center gap-1.5 text-indigo-400">
                    <HiOutlineRocketLaunch className="text-base" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">Momentum</span>
                </div>
                <p className="mt-1.5 text-sm font-black text-white">1.5+ years building</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
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

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setRoleIndex((current) => (current + 1) % roles.length);
        }, 2400);
        return () => window.clearInterval(timer);
    }, []);

    const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
            x: ((event.clientX - bounds.left) / bounds.width) * 100,
            y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[92vh] overflow-x-clip bg-[#0f172a] pt-28 pb-16 md:pt-32 md:pb-20"
            onMouseMove={handlePointerMove}
        >
            <div className="absolute inset-0 opacity-40" aria-hidden="true">
                <div
                    className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl transition-transform duration-300"
                    style={{ transform: `translate(${pointer.x * 0.8}%, ${pointer.y * 0.45}%)` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-20 text-center font-black uppercase tracking-[-0.08em] text-white/[0.04] select-none">
                <span className="block text-[24vw] leading-none md:text-[17vw]">Developer</span>
            </div>

            {/* 50 / 50 split */}
            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12">
                {/* ——— LEFT 50% ——— */}
                <motion.div style={{ y: contentY }} className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-indigo-300"
                    >
                        <span className="h-2 w-2 rounded-full bg-green-400" />
                        Open for Full-Time Opportunities
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-8 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                    >
                        Hello, Komal Giri.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="mt-3 text-2xl font-bold text-indigo-400 md:text-3xl lg:text-4xl"
                    >
                        {roles[roleIndex]}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-8 max-w-lg text-lg leading-relaxed text-slate-400"
                    >
                        I design and ship web and mobile applications with React, React Native, Node.js, and backend APIs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-indigo-600 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
                        >
                            Explore Projects
                            <HiOutlineArrowRight className="text-lg" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                        >
                            Hire Me
                        </a>
                    </motion.div>
                </motion.div>

                {/* ——— RIGHT 50% ——— */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative mx-auto h-[470px] w-full max-w-[420px] sm:h-[500px] lg:mx-0 lg:max-w-none"
                >
                    {/* Photo — centered on top */}
                    <motion.div
                        style={{ y: photoY }}
                        className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2"
                    >
                        <div className="relative">
                            <div className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[70px]" aria-hidden="true" />
                            <div className="absolute left-1/2 top-1/2 -z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.14] blur-[40px]" aria-hidden="true" />
                            <div className="absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.2] blur-[24px]" aria-hidden="true" />
                            <motion.img
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.25 }}
                                src={profilePhoto}
                                alt="Komal Giri"
                                className="relative block h-auto w-[200px] select-none object-contain sm:w-[230px] lg:w-[250px] xl:w-[270px]"
                            />
                        </div>
                    </motion.div>

                    {/* Faint semi-circle guide */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-[248px] z-0 h-[130px] w-[280px] -translate-x-1/2 rounded-b-full border border-white/[0.05] sm:top-[258px] sm:h-[145px] sm:w-[310px]"
                        aria-hidden="true"
                    />

                    {/* 3 cards in semi-circle below photo */}
                    <motion.div
                        className="absolute inset-0 z-30"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {infoCards.map((card) => (
                            <motion.div
                                key={card.id}
                                variants={fadeUp}
                                whileHover={{ y: -4 }}
                                className={`${cardBase} absolute`}
                                style={arcPosition(card.angle)}
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
