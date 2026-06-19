import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence, useSpring } from "framer-motion";
import {
    HiOutlineArrowRight,
    HiOutlineGlobeAlt,
    HiOutlineDevicePhoneMobile,
    HiOutlineSquares2X2
} from "react-icons/hi2";
import { projects } from "../../constants/projects";

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [filter, setFilter] = useState<'all' | 'web' | 'mobile'>('all');

    const filteredProjects = projects.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'web') return p.type === 'Web';
        if (filter === 'mobile') return p.type === 'Mobile App';
        return true;
    });

    const topProjects = filteredProjects;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Highly responsive spring for better sync with text
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 40,
        restDelta: 0.001
    });

    useEffect(() => {
        if (topProjects.length === 0) return;

        const unsubscribe = smoothProgress.on("change", (latest) => {
            // Map 0-1 progress to index
            // We use a small buffer to ensure the index changes exactly when the text is in viewport
            const index = Math.min(
                Math.floor(latest * topProjects.length),
                topProjects.length - 1
            );
            if (index !== activeIndex) {
                setActiveIndex(index >= 0 ? index : 0);
            }
        });
        return () => unsubscribe();
    }, [smoothProgress, activeIndex, topProjects.length]);

    if (topProjects.length === 0) return null;

    return (
        <section id="projects" className="relative bg-theme-bg transition-colors duration-300" ref={containerRef}>
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            </div>

            <div className="max-w-7xl mx-auto px-6 h-full">
                {/* Header */}
                <div className="py-20 md:py-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-theme-text mb-6 uppercase tracking-tight"
                    >
                        Featured <span className="text-indigo-400">Innovations</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-theme-muted max-w-2xl mx-auto text-xl font-light"
                    >
                        A gallery of digital solutions built with cutting-edge technologies.
                    </motion.p>

                    {/* Platform Switcher */}
                    <div className="mt-12 flex justify-center sticky top-24 z-[100]">
                        <div className="bg-theme-nav backdrop-blur-xl p-1 rounded-2xl border border-theme-border flex gap-1 shadow-2xl">
                            {[
                                { id: 'all', label: 'All', icon: <HiOutlineSquares2X2 /> },
                                { id: 'web', label: 'Web', icon: <HiOutlineGlobeAlt /> },
                                { id: 'mobile', label: 'Apps', icon: <HiOutlineDevicePhoneMobile /> }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setFilter(t.id as any);
                                        setActiveIndex(0);
                                    }}
                                    className={`relative px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all core-transition flex items-center gap-3 ${filter === t.id ? "text-theme-text" : "text-theme-muted hover:text-theme-text"
                                        }`}
                                >
                                    {filter === t.id && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-indigo-600 rounded-xl"
                                            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{t.icon}</span>
                                    <span className="relative z-10">{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col lg:flex-row gap-16 pb-20 md:pb-24">
                    {/* Left Side: Sticky Media Section */}
                    <div className="hidden lg:flex w-[45%] sticky top-48 self-start h-[600px] items-center justify-center">
                        <div className="relative w-full h-full perspective-2000">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${filter}-${activeIndex}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        width: topProjects[activeIndex]?.type === 'Web' ? "100%" : 300,
                                        height: topProjects[activeIndex]?.type === 'Web' ? "auto" : 600,
                                        aspectRatio: topProjects[activeIndex]?.type === 'Web' ? "16/9" : "auto",
                                        borderRadius: topProjects[activeIndex]?.type === 'Web' ? 24 : 56,
                                        borderWidth: topProjects[activeIndex]?.type === 'Web' ? 0 : 12,
                                        borderColor: "#1e293b"
                                    }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.32, 0.72, 0, 1]
                                    }}
                                    className="relative mx-auto overflow-hidden shadow-2xl bg-theme-bg"
                                >
                                    {/* Visual Background */}
                                    {!topProjects[activeIndex]?.image && (
                                        <>
                                            <div className="absolute inset-0 bg-theme-card opacity-60" />
                                            <div className="absolute inset-0 bg-theme-bg/90" />
                                        </>
                                    )}

                                    {/* Project preview */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                        {topProjects[activeIndex]?.image ? (
                                            <img
                                                key={topProjects[activeIndex]?.id}
                                                src={topProjects[activeIndex].image}
                                                alt={topProjects[activeIndex].title}
                                                className={`h-full w-full object-cover ${topProjects[activeIndex]?.type === 'Mobile App' ? 'object-top' : ''}`}
                                            />
                                        ) : (
                                            <div key={topProjects[activeIndex]?.id} className="flex h-full w-full flex-col items-center justify-center opacity-60">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mb-6 text-8xl filter drop-shadow-2xl"
                                                >
                                                    {topProjects[activeIndex]?.icon}
                                                </motion.div>
                                                <div className="rounded-full border border-theme-border bg-theme-surface/50 px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest text-theme-muted">
                                                    Preview Stream Active
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Overlay for depth */}
                                    {!topProjects[activeIndex]?.image && (
                                        <div className="pointer-events-none absolute inset-0 bg-theme-bg/30" />
                                    )}

                                    {/* Device Decorations */}
                                    {topProjects[activeIndex]?.type === 'Web' ? (
                                        <div className="absolute top-0 left-0 right-0 h-10 bg-theme-surface/50 border-b border-theme-border flex items-center px-5 gap-2 z-20 backdrop-blur-md">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                                            <div className="ml-4 h-4 w-48 bg-white/5 rounded-full" />
                                        </div>
                                    ) : (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-theme-card rounded-b-3xl z-20 flex items-center justify-center border-x border-b border-theme-border">
                                            <div className="w-12 h-1.5 bg-white/5 rounded-full" />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>



                        </div>

                        {/* Pagination Indicator */}
                        <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-6">
                            {topProjects.map((_, i) => (
                                <div key={i} className="group cursor-pointer relative py-2" onClick={() => setActiveIndex(i)}>
                                    <div className={`w-0.5 transition-all duration-700 ${i === activeIndex ? "h-12 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "h-4 bg-slate-800"
                                        }`} />
                                    {i === activeIndex && (
                                        <motion.span
                                            layoutId="idx-num"
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-indigo-400 opacity-50"
                                        >
                                            0{i + 1}
                                        </motion.span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Scroll Content */}
                    <div className="w-full lg:w-[50%] ml-auto space-y-24 lg:space-y-36">
                        {topProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-20%" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="min-h-[400px] flex flex-col justify-center relative"
                            >
                                {/* Mobile Visual Only */}
                                <div className={`lg:hidden mb-12 w-full rounded-3xl overflow-hidden relative shadow-2xl ${project.type === 'Web' ? 'aspect-video' : 'aspect-[9/16] max-w-[300px] mx-auto'
                                    }`}>
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className={`h-full w-full object-cover ${project.type === 'Mobile App' ? 'object-top' : ''}`}
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-theme-card opacity-20" />
                                            <div className="absolute inset-0 flex items-center justify-center border border-theme-border bg-theme-bg text-8xl">
                                                {project?.icon}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <h4 className="text-indigo-500 font-mono text-xl tracking-tighter">PROJECT.0{index + 1}</h4>
                                        <div className="h-px w-24 bg-indigo-500/20" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-theme-muted">{project.type}</span>
                                    </div>

                                    <h3 className="text-6xl md:text-8xl font-black text-theme-text tracking-tighter leading-[0.8] transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-theme-muted text-xl font-light leading-relaxed max-w-xl">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack - Moved here for structure */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1 text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-lg tracking-wide"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        {project.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-theme-surface/50 border border-theme-border hover:bg-theme-surface transition-colors group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                <span className="text-sm font-medium text-theme-muted group-hover:text-theme-text">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 flex flex-wrap gap-4">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-4 rounded-full bg-indigo-600 px-10 py-5 text-xs font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
                                            >
                                                View Live
                                                <HiOutlineArrowRight className="h-4 w-4" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => window.location.hash = `case-study/${project.id}`}
                                            className="flex items-center gap-4 rounded-full bg-white px-10 py-5 text-xs font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
                                        >
                                            Open Case Study
                                            <HiOutlineArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Explorer */}
                <div className="mt-16 text-center pb-16 md:pb-20">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.location.hash = "#all-projects"}
                        className="group relative px-16 py-6 rounded-[2rem] font-black text-theme-text overflow-hidden shadow-2xl transition-all"
                    >
                        <div className="absolute inset-0 bg-indigo-600/20 group-hover:bg-indigo-600/40 transition-all" />
                        <div className="absolute inset-0 bg-theme-surface/40 backdrop-blur-3xl border border-theme-border group-hover:border-indigo-500/50" />
                        <span className="relative flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-xs">
                            Discover Full Archive
                            <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                        </span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
