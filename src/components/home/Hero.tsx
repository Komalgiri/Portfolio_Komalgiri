import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    HiOutlineArrowRight,
    HiOutlineGlobeAlt,
    HiOutlineRocketLaunch,
    HiOutlineTrophy,
} from 'react-icons/hi2';



const roles = ['Full Stack Developer', 'React Native Builder', 'API-Focused Engineer'];

const Hero = () => {
    const [pointer, setPointer] = useState({ x: 50, y: 50 });
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setRoleIndex((current) => (current + 1) % roles.length);
        }, 2400);

        return () => window.clearInterval(timer);
    }, []);

    const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        setPointer({ x, y });
    };

    return (
        <section
            className="relative min-h-[92vh] overflow-hidden bg-[#0f172a] pt-28 pb-16 md:pt-32 md:pb-20"
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

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
                <div>
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
                        className="mt-8 max-w-4xl pb-4 text-4xl font-black leading-[0.98] tracking-tight text-white md:text-6xl lg:text-[4.5rem]"
                    >
                        Hello, Komal Giri.
                        <span className="mt-3 block text-xl font-bold text-indigo-400 md:text-2xl lg:text-[3.9rem]">{roles[roleIndex]}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
                    >
                        I design and ship web and mobile applications with React, React Native, Node.js, and backend APIs.
                        My portfolio is focused on useful products, clear interfaces, and systems that can grow beyond the prototype stage.
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

                    

                </div>

                <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative min-h-[520px] lg:min-h-[560px]"
                    style={{
                        transform: `perspective(1200px) rotateX(${(pointer.y - 50) / -22}deg) rotateY(${(pointer.x - 50) / 20}deg)`,
                    }}
                >
                    <motion.div
                        whileHover={{ y: -6, rotate: -4 }}
                        className="absolute left-0 top-8 w-[86%] rounded-[2rem] border border-white/10 bg-[#111827] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Recent Win</p>
                                <h3 className="mt-3 text-2xl font-black text-white">AI Sewa App</h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                    State-level hackathon winner built to solve civic, health, and emergency problems with AI-assisted workflows.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-indigo-400">
                                <HiOutlineTrophy className="text-2xl" />
                            </div>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                            <span className="rounded-full border border-white/10 px-3 py-2 text-slate-300">React Native</span>
                            <span className="rounded-full border border-white/10 px-3 py-2 text-slate-300">Firebase</span>
                            <span className="rounded-full border border-white/10 px-3 py-2 text-slate-300">AI Services</span>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -6, rotate: 2 }}
                        className="absolute right-2 top-56 w-[72%] rounded-[2rem] border border-white/10 bg-[#131d30] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">What I Build</p>
                                <p className="mt-2 text-lg font-black text-white">Web apps, mobile apps, and product features</p>
                            </div>
                            <HiOutlineRocketLaunch className="text-2xl text-indigo-400" />
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-400">
                            <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-3">Product-focused interfaces with clean UI decisions</div>
                            <div className="rounded-2xl border border-white/5 bg-[#0f172a] p-3">Feature delivery from frontend to backend integration</div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -6, rotate: -2 }}
                        className="absolute bottom-0 left-10 w-[80%] rounded-[2rem] border border-white/10 bg-[#0f172a] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                                <div className="flex items-center gap-3 text-indigo-400">
                                    <HiOutlineGlobeAlt className="text-xl" />
                                    <span className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Availability</span>
                                </div>
                                <p className="mt-3 text-lg font-black text-white">Open to full-time roles</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">Frontend, full stack, or product engineering opportunities.</p>
                            </div>
                            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                                <div className="flex items-center gap-3 text-indigo-400">
                                    <HiOutlineRocketLaunch className="text-xl" />
                                    <span className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Momentum</span>
                                </div>
                                <p className="mt-3 text-lg font-black text-white">Web + mobile builder</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">Strong in implementation, iteration speed, and shipping end-to-end features.</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
