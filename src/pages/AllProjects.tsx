import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineArrowLeft,
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
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                    >
                        <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center font-bold text-sm">P</div>
                        <span className="font-bold tracking-tight hidden sm:block">Portfolio</span>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Title Section */}
                    <div className="mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent"
                        >
                            Complete <br />
                            <span className="text-indigo-400">Project Archive</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed"
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
                            <div className="bg-[#1e293b]/50 backdrop-blur-md p-1 rounded-xl border border-white/5 inline-flex gap-1">
                                {[
                                    { id: 'all', label: 'All', icon: <HiOutlineSquares2X2 /> },
                                    { id: 'web', label: 'Web', icon: <HiOutlineGlobeAlt /> },
                                    { id: 'mobile', label: 'Apps', icon: <HiOutlineDevicePhoneMobile /> }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setFilter(tab.id as any)}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === tab.id ? "text-white" : "text-slate-400 hover:text-slate-200"
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
                                    className="group relative flex flex-col h-full rounded-3xl bg-[#1e293b]/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Card Header / Visual */}
                                    <div className={`h-52 bg-gradient-to-br ${project.color} opacity-20 relative overflow-hidden group-hover:opacity-30 transition-all duration-500`}>
                                        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end h-full">
                                            {project.type === 'Web' ? (
                                                <motion.div
                                                    initial={{ y: "25%" }}
                                                    whileHover={{ y: "0%" }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="w-3/4 aspect-video bg-[#0f172a] rounded-t-xl border-t border-x border-white/10 shadow-2xl relative overflow-hidden"
                                                >
                                                    {/* Browser Header */}
                                                    <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5">
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
                                                                className="h-full w-full object-cover object-top"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-4xl text-slate-600 transition-colors group-hover:text-indigo-400">
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
                                                    className="w-1/3 aspect-[9/18] bg-[#0f172a] rounded-t-[1.5rem] border-t-[4px] border-x-[4px] border-[#1e293b] shadow-2xl relative overflow-hidden"
                                                >
                                                    {/* Notch */}
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1e293b] rounded-b-xl z-20" />
                                                    {/* Content */}
                                                    <div className="h-full w-full overflow-hidden">
                                                        {project.image ? (
                                                            <img
                                                                src={project.image}
                                                                alt={project.title}
                                                                className="h-full w-full object-cover object-top"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-3xl text-slate-600 transition-colors group-hover:text-purple-400">
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
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Link */}
                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <div className="flex gap-4">
                                                <HiOutlineCodeBracket className="cursor-pointer text-slate-500 transition-colors hover:text-white" />
                                                {project.liveUrl ? (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`Visit ${project.title}`}
                                                    >
                                                        <HiOutlineGlobeAlt className="cursor-pointer text-slate-500 transition-colors hover:text-white" />
                                                    </a>
                                                ) : (
                                                    <HiOutlineGlobeAlt className="cursor-pointer text-slate-500 transition-colors hover:text-white" />
                                                )}
                                            </div>
                                            <button
                                                onClick={() => window.location.hash = `case-study/${project.id}`}
                                                className="text-sm font-bold flex items-center gap-2 text-indigo-400 group/btn hover:text-white transition-colors"
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
            <footer className="py-20 border-t border-white/5 text-center px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-slate-500 text-sm mb-4">Built with React, Framer Motion & Tailwind</p>
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
