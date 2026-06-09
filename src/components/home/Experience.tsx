import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeLeft, fadeRight } from '../../utils/scrollAnimations';
import {
    HiOutlineBriefcase,
    HiOutlineAcademicCap,
    HiOutlineMapPin,
    HiOutlineCheckCircle
} from 'react-icons/hi2';

interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    tech: string[];
    type: 'work' | 'education';
}

const experiences: ExperienceItem[] = [
    {
        id: 1,
        role: "Software Developer",
        company: "Creditor Academy",
        location: "Remote",
        period: "May 2025 - Present",
        type: 'work',
        description: [
            "Developed and optimized frontend interfaces using ReactJS with a focus on clean UI and responsive design.",
            "Built and integrated REST APIs to connect backend services with the frontend for seamless data flow.",
            "Implemented gamification features to improve user engagement and interaction."
        ],
        tech: ["ReactJS", "Node.js", "REST APIs", "Gamification", "UI/UX"]
    },
    {
        id: 2,
        role: "Software Development Intern",
        company: "VanTech Med",
        location: "Vancouver, BC (Remote)",
        period: "Aug 2024 - April 2025",
        type: 'work',
        description: [
            "Extensively developed cross-platform healthcare applications for both Android and iOS.",
            "Architected a health analytics engine with 5+ features to analyze health patterns and provide automated solutions.",
            "Designed robust application structures using Firebase and RESTful architectures."
        ],
        tech: ["ReactJS", "Android Studio", "Firebase", "Java", "REST APIs", "Figma"]
    },
    {
        id: 3,
        role: "Software Engineering Intern",
        company: "Uma Robotic",
        location: "Remote",
        period: "Feb 2024 - April 2024",
        type: 'work',
        description: [
            "Conducted in-depth software analysis and 50+ system tests to ensure maximum reliability.",
            "Developed industrial automation solutions that optimized robotic task efficiency by 40%.",
            "Collaborated on backend systems using Node.js and MongoDB for real-time task management."
        ],
        tech: ["React Native", "NodeJS", "MongoDB", "Testing"]
    }
];

const Experience = () => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 85%', 'end 40%'],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" className="py-24 md:py-28 bg-[#0f172a] relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white flex items-center gap-6">
                            <span className="w-16 h-[2px] bg-purple-500"></span>
                            Experience.
                        </h2>
                        <p className="text-slate-400 max-w-2xl text-lg font-medium pl-20">
                            A chronological journey through my professional growth, technical milestones, and academic foundation.
                        </p>
                    </motion.div>
                </div>

                <div className="relative" ref={timelineRef}>
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] bg-purple-500/15 md:-translate-x-1/2 hidden sm:block" />
                    <motion.div
                        className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-500/40 md:-translate-x-1/2 hidden sm:block"
                        style={{ scaleY: lineScale }}
                    />

                    <div className="space-y-16 md:space-y-20">
                        {experiences.map((exp, idx) => (
                            <motion.div
                                key={exp.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-100px' }}
                                variants={idx % 2 === 0 ? fadeLeft : fadeRight}
                                transition={{ duration: 0.75, delay: idx * 0.08 }}
                                className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-0`}
                            >
                                {/* Timeline Dot */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                                    className="absolute left-0 md:left-1/2 top-0 md:top-8 w-10 h-10 rounded-xl bg-[#1e293b] border-2 border-purple-500/50 flex items-center justify-center z-20 md:-translate-x-1/2 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                                >
                                    {exp.type === 'work' ? (
                                        <HiOutlineBriefcase className="text-purple-400 text-xl" />
                                    ) : (
                                        <HiOutlineAcademicCap className="text-indigo-400 text-xl" />
                                    )}
                                </motion.div>

                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} pl-12 md:pl-0`}>
                                    <div className="space-y-4">
                                        <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} gap-1`}>
                                            <span className="text-purple-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                                                {exp.period}
                                            </span>
                                            <h3 className="text-2xl font-black text-white">{exp.role}</h3>
                                            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                                                <HiOutlineMapPin className="text-purple-500" />
                                                <span>{exp.company}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>

                                        <div className={`space-y-3 ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                                            {exp.description.map((point, pIdx) => (
                                                <div key={pIdx} className={`flex gap-3 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                    <HiOutlineCheckCircle className="text-purple-500 text-lg mt-1 shrink-0" />
                                                    <p className="text-slate-400 text-sm leading-relaxed">{point}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={`flex flex-wrap gap-2 pt-4 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            {exp.tech.map(t => (
                                                <span key={t} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for the other side */}
                                <div className="hidden md:block w-[45%]"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* View GitHub Stats CTA */}
                <div className="mt-20 text-center relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <button
                            onClick={() => window.location.hash = "#github-stats"}
                            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-white overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer bg-white/5"
                        >
                            <div className="absolute inset-0 bg-indigo-600/20 group-hover:bg-indigo-600/30 transition-opacity" />
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10" />
                            <span className="relative flex items-center gap-3">
                                View Technical Footprint
                                <div className="p-1 px-2 rounded-md bg-white/10 text-[10px] text-purple-300 font-mono tracking-tighter">
                                    GITHUB_ECOSYSTEM
                                </div>
                                <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all duration-300" />
                            </span>
                        </button>
                        <p className="mt-6 text-slate-500 text-sm font-medium tracking-wide flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Live Metrics & Language Analysis
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
