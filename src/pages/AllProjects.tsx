import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubpageHeader from "../components/layout/SubpageHeader";
import {
    HiOutlineCodeBracket,
    HiOutlineGlobeAlt,
    HiOutlineArrowRight,
    HiOutlineSquares2X2,
    HiOutlineDevicePhoneMobile
} from "react-icons/hi2";
import { projects } from "../constants/projects";

const AllProjects = ({ onBack }: { onBack: () => void }) => {
    const [filter, setFilter] = useState<'all' | 'web' | 'mobile'>('all');

    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        if (filter === 'web') return project.type === 'Web';
        if (filter === 'mobile') return project.type === 'Mobile App';
        return true;
    });

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text selection:bg-indigo-500/30 transition-colors duration-300">
            <SubpageHeader onBack={onBack} />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Title Section */}
                    <div className="mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-theme-text via-theme-text to-theme-muted bg-clip-text text-transparent"
                        >
                            Complete <br />
                            <span className="text-indigo-400">Project Archive</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-theme-muted max-w-2xl text-lg md:text-xl font-light leading-relaxed"
                        >
                            A comprehensive collection of my professional work, open-source contributions, and experimental lab projects.
                        </motion.p>

                        {/* Filter Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 flex flex-wrap gap-2"
                        >
                            <div className="bg-theme-card/50 backdrop-blur-md p-1 rounded-xl border border-theme-border inline-flex gap-1">
                                {[
                                    { id: 'all', label: 'All', icon: <HiOutlineSquares2X2 /> },
                                    { id: 'web', label: 'Web', icon: <HiOutlineGlobeAlt /> },
                                    { id: 'mobile', label: 'Apps', icon: <HiOutlineDevicePhoneMobile /> }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setFilter(tab.id as any)}
                                        aria-pressed={filter === tab.id}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === tab.id ? "text-white" : "text-theme-muted hover:text-theme-text"
                                            }`}
                                    >
                                        {filter === tab.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-lg"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab.icon}</span>
                                        <span className="relative z-10">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group relative flex flex-col h-full rounded-3xl bg-theme-card/40 border border-theme-border hover:border-indigo-500/30 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Card Header / Visual */}
                                    <div className={`h-52 bg-gradient-to-br ${project.color} opacity-20 relative overflow-hidden group-hover:opacity-30 transition-all duration-500`}>
                                        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end h-full">
                                            {project.type === 'Web' ? (
                                                <motion.div
                                                    initial={{ y: "25%" }}
                                                    whileHover={{ y: "0%" }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="w-3/4 aspect-video bg-theme-surface rounded-t-xl border-t border-x border-theme-border shadow-2xl relative overflow-hidden"
                                                >
                                                    {/* Browser Header */}
                                                    <div className="h-6 bg-theme-surface/50 border-b border-theme-border flex items-center px-3 gap-1.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                                                    </div>
                                                    {/* Content */}
                                                    <div className="h-full w-full overflow-hidden pb-6">
                                                        {project.image ? (
                                                            <img
                                                                src={project.image}
                                                                alt={project.title}
                                                                loading="lazy"
                                                                className="h-full w-full object-cover object-top"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-4xl text-theme-muted transition-colors group-hover:text-indigo-400">
                                                                {project.icon}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ y: "25%" }}
                                                    whileHover={{ y: "0%" }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="w-1/3 aspect-[9/18] bg-theme-surface rounded-t-[1.5rem] border-t-[4px] border-x-[4px] border-theme-border shadow-2xl relative overflow-hidden"
                                                >
                                                    {/* Notch */}
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-theme-card rounded-b-xl z-20" />
                                                    {/* Content */}
                                                    <div className="h-full w-full overflow-hidden">
                                                        {project.image ? (
                                                            <img
                                                                src={project.image}
                                                                alt={project.title}
                                                                loading="lazy"
                                                                className="h-full w-full object-cover object-top"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-3xl text-theme-muted transition-colors group-hover:text-purple-400">
                                                                {project.icon}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-[0.2em] mb-2">
                                            {project.type}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-theme-muted text-sm leading-relaxed mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-3 py-1 rounded-full bg-theme-surface/50 border border-theme-border text-xs font-bold text-theme-muted uppercase tracking-widest">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Link */}
                                        <div className="flex items-center justify-between pt-6 border-t border-theme-border">
                                            <div className="flex gap-4">
                                                <HiOutlineCodeBracket className="cursor-pointer text-theme-muted transition-colors hover:text-theme-text" />
                                                {project.liveUrl ? (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`Visit ${project.title}`}
                                                    >
                                                        <HiOutlineGlobeAlt className="cursor-pointer text-theme-muted transition-colors hover:text-theme-text" />
                                                    </a>
                                                ) : (
                                                    <HiOutlineGlobeAlt className="cursor-pointer text-theme-muted transition-colors hover:text-theme-text" />
                                                )}
                                            </div>
                                            <button
                                                onClick={() => window.location.hash = `case-study/${project.id}`}
                                                className="text-sm font-bold flex items-center gap-2 text-indigo-400 group/btn hover:text-indigo-300 transition-colors"
                                            >
                                                Case Study
                                                <HiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-theme-border text-center px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-theme-muted text-sm mb-4">Built with React, Framer Motion & Tailwind</p>
                    <button
                        onClick={onBack}
                        className="text-indigo-400 font-bold hover:underline"
                    >
                        Return to overview
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AllProjects;
