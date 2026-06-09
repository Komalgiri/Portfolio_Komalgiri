import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import { fadeUp, staggerContainer } from '../../utils/scrollAnimations';
import {
    HiOutlineCommandLine,
    HiOutlineSparkles,
    HiOutlineCpuChip,
    HiOutlineCloud,
    HiOutlineChartBar,
    HiOutlinePaintBrush
} from 'react-icons/hi2';
import {
    SiReact,
    SiNodedotjs,
    SiPostgresql,
    SiPython,
    SiDjango,
    SiMongodb,
    SiFigma,
    SiNumpy,
    SiJupyter
} from 'react-icons/si';

interface SkillItem {
    name: string;
    icon?: React.ReactNode;
}

interface SkillCategory {
    id: string;
    category: string;
    title: string;
    description: string;
    skills: SkillItem[];
    icon: React.ReactNode;
    color: string;
}

const skillCategories: SkillCategory[] = [
    {
        id: 'languages',
        category: 'Foundation',
        title: 'Programming Languages',
        description: 'Strong foundation in core programming languages with problem-solving, OOP, and performance-oriented coding.',
        skills: [
            { name: 'C++', icon: <HiOutlineCpuChip /> },
            { name: 'Python', icon: <SiPython /> },
            { name: 'Java' },
            { name: 'DSA', icon: <HiOutlineCommandLine /> },
            { name: 'OOP', icon: <HiOutlineSparkles /> },
            { name: 'Problem Solving' }
        ],
        icon: <HiOutlineCpuChip className="text-3xl text-indigo-400" />,
        color: 'from-indigo-500/20 to-purple-500/10'
    },
    {
        id: 'fullstack',
        category: 'Development',
        title: 'Full-Stack & Mobile',
        description: 'End-to-end development of scalable web and mobile applications using modern stacks and architectures.',
        skills: [
            { name: 'React JS', icon: <SiReact /> },
            { name: 'React Native', icon: <SiReact /> },
            { name: 'Node JS', icon: <SiNodedotjs /> },
            { name: 'Django', icon: <SiDjango /> },
            { name: 'PostgreSQL', icon: <SiPostgresql /> },
            { name: 'MongoDB', icon: <SiMongodb /> },
            { name: 'SQL' }
        ],
        icon: <HiOutlineCommandLine className="text-3xl text-blue-400" />,
        color: 'from-blue-400/20 to-indigo-500/10'
    },
    {
        id: 'aiml',
        category: 'AI & Data',
        title: 'AI & Data Science',
        description: 'Building AI-integrated applications and data analysis tools with Python-based scientific libraries.',
        skills: [
            { name: 'NumPy', icon: <SiNumpy /> },
            { name: 'Jupyter Notebook', icon: <SiJupyter /> },
            { name: 'AI Services', icon: <HiOutlineSparkles /> },
            { name: 'REST APIs', icon: <HiOutlineCommandLine /> }
        ],
        icon: <HiOutlineSparkles className="text-3xl text-purple-400" />,
        color: 'from-purple-400/20 to-pink-500/10'
    },
    {
        id: 'productivity',
        category: 'Productivity',
        title: 'Tools & Platforms',
        description: 'Professional productivity and project management tools for effective team collaboration and delivery.',
        skills: [
            { name: 'Jira', icon: <HiOutlineChartBar /> },
            { name: 'Git / GitHub' },
            { name: 'Word / Excel' },
            { name: 'PowerPoint' },
            { name: 'Canva' }
        ],
        icon: <HiOutlineChartBar className="text-3xl text-emerald-400" />,
        color: 'from-emerald-400/20 to-cyan-500/10'
    },
    {
        id: 'design',
        category: 'Creative',
        title: 'UI / UX Design',
        description: 'Crafting visually appealing, accessible, and user-centric interfaces with a product mindset.',
        skills: [
            { name: 'Figma', icon: <SiFigma /> },
            { name: 'UI/UX Design', icon: <HiOutlinePaintBrush /> },
            { name: 'Canva' },
            { name: 'Accessibility' }
        ],
        icon: <HiOutlinePaintBrush className="text-3xl text-orange-400" />,
        color: 'from-orange-400/20 to-red-500/10'
    },
    {
        id: 'deployment',
        category: 'Deployment',
        title: 'Deployment & Mobile Dev',
        description: 'Shipping cross-platform mobile and web apps using Firebase, Netlify, and Android Studio.',
        skills: [
            { name: 'Firebase', icon: <HiOutlineCloud /> },
            { name: 'Netlify' },
            { name: 'Android Studio' },
            { name: 'Expo / React Native' },
            { name: 'GitHub' }
        ],
        icon: <HiOutlineCloud className="text-3xl text-sky-400" />,
        color: 'from-sky-400/20 to-blue-500/10'
    }
];

const About = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % skillCategories.length);
        }, 6000);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <section id="about" className="py-24 md:py-28 bg-[#0f172a] relative overflow-hidden border-t border-white/5">

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
                            <span className="w-16 h-[2px] bg-indigo-500"></span>
                            About Me
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Column 1: Condensed Bio */}
                    <ScrollReveal variant="fadeLeft" className="lg:col-span-4 space-y-10">
                        <div className="space-y-6">
                            <p className="text-lg text-slate-300 font-medium leading-relaxed">
                                I build <span className="text-white">scalable web and mobile applications</span> integrating AI-driven features and clean, responsive interfaces.
                                Specializing in React, React Native, and Node.js.
                            </p>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                B.Tech CSE graduate (CGPA 8.9) from Roorkee College of Engineering, actively seeking full-time software development roles.
                            </p>
                        </div>

                        <motion.div
                            className="space-y-4"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <motion.p variants={fadeUp} className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Soft Skills</motion.p>
                            <div className="flex flex-wrap gap-2">
                                {['Problem-solving', 'Team Collaboration', 'Adaptability', 'Communication'].map(skill => (
                                    <motion.span
                                        key={skill}
                                        variants={fadeUp}
                                        className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-wider"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </ScrollReveal>

                    {/* Column 2: Focused Tech Stack */}
                    <ScrollReveal variant="scaleIn" delay={0.1} className="lg:col-span-4 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                className={`w-full min-h-[420px] p-10 rounded-xl bg-[#1e293b] border-2 border-white/10 relative shadow-2xl flex flex-col justify-center`}
                            >
                                <div className="space-y-6 relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-indigo-400 font-bold uppercase tracking-[4px] text-[10px]">
                                                {skillCategories[index].category}
                                            </span>
                                            <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-tight">
                                                {skillCategories[index].title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            {skillCategories[index].description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 content-start">
                                    {skillCategories[index].skills.map((skill) => (
                                        <div key={skill.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-200 font-bold">
                                            <span className="text-indigo-400">{skill.icon || <HiOutlineSparkles />}</span>
                                            {skill.name}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Minimalist Progress */}
                        <div className="flex gap-2 mt-8 px-2">
                            {skillCategories.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 flex-grow rounded-full transition-all duration-700 ${i === index ? 'bg-indigo-500' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Column 3: Professional Metrics */}
                    <motion.div
                        className="lg:col-span-4 grid grid-cols-2 gap-y-12 gap-x-8 pl-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {[
                            { id: 'experience', value: 1.5, decimals: 1, suffix: '+', label: <>Years Professional<br />Experience</> },
                            { id: 'projects', value: 10, decimals: 0, suffix: '+', label: <>Projects &<br />Deployments</> },
                            { id: 'certs', value: 7, decimals: 0, suffix: '+', label: <>Certifications<br />Earned</> },
                            { id: 'awards', value: 3, decimals: 0, suffix: '+', label: <>Major Awards &<br />Recognitions</> },
                        ].map((metric) => (
                            <motion.div key={metric.id} variants={fadeUp} className="space-y-1">
                                <h4 className="text-4xl font-black text-white italic tracking-tighter">
                                    <AnimatedCounter
                                        value={metric.value}
                                        decimals={metric.decimals}
                                        suffix={metric.suffix}
                                    />
                                </h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-tight">{metric.label}</p>
                            </motion.div>
                        ))}

                        <motion.div variants={fadeUp} className="col-span-2 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                <h4 className="text-sm font-black text-white uppercase tracking-[0.3em]">Available for Hire</h4>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section >
    );
};

export default About;
