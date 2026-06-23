import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubpageHeader from '../components/layout/SubpageHeader';
import ArchitectureVisualGallery from '../components/system-design/ArchitectureVisualGallery';
import {
    HiOutlineArrowRight,
    HiOutlineCpuChip,
    HiOutlineGlobeAlt,
} from 'react-icons/hi2';
import {
    systemDesignProjects,
    type SystemDesignProjectId,
} from '../constants/systemDesignGallery';

const SystemDesignGallery = ({ onBack }: { onBack: () => void }) => {
    const [activeId, setActiveId] = useState<SystemDesignProjectId>('codepod');
    const active = systemDesignProjects.find((p) => p.id === activeId)!;

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text selection:bg-indigo-500/30 transition-colors duration-300">
            <SubpageHeader onBack={onBack} />

            <main className="px-6 pt-32 pb-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 md:mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-400"
                        >
                            <HiOutlineCpuChip /> Backend & Architecture
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black tracking-tight md:text-6xl"
                        >
                            System Design & <span className="text-violet-400">Architecture</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="mt-4 max-w-2xl text-base leading-relaxed text-theme-muted md:text-lg"
                        >
                            How I structure production apps — APIs, data layers, auth, and integrations.
                            Pick a project to explore the stack visually.
                        </motion.p>
                    </div>

                    {/* Project picker */}
                    <div className="sysdesign-picker mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                        {systemDesignProjects.map((project) => {
                            const isActive = project.id === activeId;
                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => setActiveId(project.id)}
                                    aria-pressed={isActive}
                                    className={`sysdesign-picker-card group text-left ${isActive ? 'is-active' : ''}`}
                                >
                                    <div
                                        className={`sysdesign-picker-accent bg-gradient-to-br ${project.gradient}`}
                                        aria-hidden="true"
                                    />
                                    <div className="sysdesign-picker-thumb">
                                        <img
                                            src={project.image}
                                            alt=""
                                            className="h-full w-full object-cover object-top"
                                        />
                                    </div>
                                    <div className="sysdesign-picker-copy">
                                        <p className="sysdesign-picker-title">{project.title}</p>
                                        <p className="sysdesign-picker-tagline">{project.tagline}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active project panel */}
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={activeId}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                            className="sysdesign-panel rounded-3xl border border-theme-border bg-[var(--color-card-glass)] shadow-2xl backdrop-blur-sm"
                        >
                            <div
                                className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br opacity-20 ${active.gradient}`}
                                aria-hidden="true"
                            />

                            <div className="relative flex flex-col gap-0">
                                {/* Visual preview — compact strip on wide screens */}
                                <div className="sysdesign-preview border-b border-theme-border p-5 lg:flex lg:items-center lg:gap-6 lg:p-6">
                                    <div className="sysdesign-browser lg:max-w-[280px] lg:shrink-0">
                                        <div className="sysdesign-browser-chrome">
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                        <div className="sysdesign-browser-screen">
                                            <img
                                                src={active.image}
                                                alt={`${active.title} preview`}
                                                className="h-full w-full object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5 lg:mt-0 lg:flex-1">
                                    <div className="flex flex-wrap gap-2">
                                        {active.stack.map((tech) => (
                                            <span key={tech} className="sysdesign-tech-chip">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={`#case-study/${activeId}`}
                                        className="sysdesign-cta mt-4 inline-flex items-center gap-2"
                                    >
                                        Full case study
                                        <HiOutlineArrowRight className="text-base" />
                                    </a>
                                    </div>
                                </div>

                                {/* Diagrams — full width */}
                                <div className="sysdesign-diagram-wrap p-5 md:p-6 lg:p-8">
                                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
                                                Backend architecture
                                            </p>
                                            <h2 className="mt-1 text-xl font-black tracking-tight text-theme-text md:text-2xl">
                                                {active.title}
                                            </h2>
                                        </div>
                                        <span className="sysdesign-live-badge">
                                            <HiOutlineGlobeAlt className="text-sm" />
                                            Web
                                        </span>
                                    </div>
                                    <ArchitectureVisualGallery projectId={activeId} />
                                </div>
                            </div>
                        </motion.article>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default SystemDesignGallery;
