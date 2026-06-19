import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import { fadeUp, staggerContainer } from '../../utils/scrollAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
    HiOutlineCommandLine,
    HiOutlineSparkles,
    HiOutlineCpuChip,
    HiOutlineCloud,
    HiOutlineChartBar,
    HiOutlinePaintBrush,
    HiOutlineDevicePhoneMobile,
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
    SiJupyter,
    SiAndroidstudio,
    SiFirebase,
    SiNetlify,
    SiExpo,
    SiGithub,
    SiGit,
    SiJira,
    SiCanva,
    SiMysql,
    SiOpenai,
    SiAnthropic,
    SiClaude,
    SiGooglegemini,
    SiGithubcopilot,
    SiPerplexity,
    SiHuggingface,
    SiReplit,
    SiNotion,
    SiPostman,
    SiLeetcode,
    SiHackerrank,
    SiOpenjdk,
    SiFramer,
    SiCodeium,
    SiLangchain,
    SiOllama,
    SiStackblitz,
    SiGooglecolab,
    SiMeta,
} from 'react-icons/si';
import { FaFileWord, FaFileExcel, FaFilePowerpoint, FaUniversalAccess } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

interface SkillItem {
    name: string;
    Icon?: IconType;
    imageSrc?: string;
    color: string;
    invertOnDark?: boolean;
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

const BrandIcon = ({
    Icon,
    imageSrc,
    color,
    invertOnDark,
    className = 'text-[28px]',
}: {
    Icon?: IconType;
    imageSrc?: string;
    color?: string;
    invertOnDark?: boolean;
    className?: string;
}) => {
    if (imageSrc) {
        return (
            <img
                src={imageSrc}
                alt=""
                aria-hidden="true"
                className={`${className} h-7 w-7 object-contain ${invertOnDark ? 'dark:invert' : ''}`}
            />
        );
    }
    if (Icon) {
        return (
            <Icon
                className={`${className} ${invertOnDark ? 'dark:brightness-0 dark:invert' : ''}`}
                style={{ color }}
            />
        );
    }
    return null;
};

const SkillChip = ({ name, Icon, imageSrc, color, invertOnDark }: SkillItem) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-transparent p-2.5 transition-all duration-300 hover:border-indigo-500/20 hover:bg-theme-surface/40"
    >
        <BrandIcon
            Icon={Icon}
            imageSrc={imageSrc}
            color={color}
            invertOnDark={invertOnDark}
            className="text-[28px] transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-center text-[9px] font-bold uppercase tracking-wide text-theme-muted leading-tight group-hover:text-theme-text">
            {name}
        </span>
    </motion.div>
);

interface AiTool {
    name: string;
    Icon?: IconType;
    imageSrc?: string;
    color: string;
    invertOnDark?: boolean;
}

const aiTools: AiTool[] = [
    { name: 'Cursor', imageSrc: '/icons/cursor.svg', color: '#000000', invertOnDark: true },
    { name: 'Antigravity', imageSrc: '/icons/antigravity.svg', color: '#4285F4' },
    { name: 'ChatGPT', Icon: SiOpenai, color: '#10A37F' },
    { name: 'Claude', Icon: SiClaude, color: '#D97757' },
    { name: 'Gemini', Icon: SiGooglegemini, color: '#8E75B2' },
    { name: 'Windsurf', imageSrc: '/icons/windsurf.svg', color: '#0B8FCC' },
    { name: 'v0', imageSrc: '/icons/v0.svg', color: '#000000', invertOnDark: true },
    { name: 'DeepSeek', imageSrc: '/icons/deepseek.svg', color: '#4D6BFE' },
    { name: 'Mistral', imageSrc: '/icons/mistral.svg', color: '#F7D046' },
    { name: 'GitHub Copilot', Icon: SiGithubcopilot, color: '#000000', invertOnDark: true },
    { name: 'Codeium', Icon: SiCodeium, color: '#09B6A2' },
    { name: 'Perplexity', Icon: SiPerplexity, color: '#1FB8CD' },
    { name: 'Hugging Face', Icon: SiHuggingface, color: '#FFD21E' },
    { name: 'Ollama', Icon: SiOllama, color: '#000000', invertOnDark: true },
    { name: 'LangChain', Icon: SiLangchain, color: '#1C3C3C' },
    { name: 'Bolt', Icon: SiStackblitz, color: '#1385FD' },
    { name: 'Colab', Icon: SiGooglecolab, color: '#F9AB00' },
    { name: 'Anthropic', Icon: SiAnthropic, color: '#CC785C' },
    { name: 'Meta AI', Icon: SiMeta, color: '#0081FB' },
    { name: 'Replit', Icon: SiReplit, color: '#F26207' },
    { name: 'Notion AI', Icon: SiNotion, color: '#000000', invertOnDark: true },
];

const AiToolsMarquee = () => {
    const reducedMotion = useReducedMotion();
    const items = [...aiTools, ...aiTools];

    return (
        <div className="mt-16 w-full md:mt-20">
            <p className="mb-8 text-center text-xs font-black uppercase tracking-[0.35em] text-theme-muted">
                AI Tools I Work With
            </p>
            <div className="relative w-full overflow-hidden py-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-theme-bg to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-theme-bg to-transparent" />
                <div className={`flex w-max items-center gap-14 px-8 ${reducedMotion ? 'flex-wrap justify-center' : 'animate-marquee'}`}>
                    {items.map((tool, i) => (
                        <div
                            key={`${tool.name}-${i}`}
                            className="flex shrink-0 flex-col items-center gap-2.5 opacity-85 transition-opacity hover:opacity-100"
                        >
                            <BrandIcon
                                Icon={tool.Icon}
                                imageSrc={tool.imageSrc}
                                color={tool.color}
                                invertOnDark={tool.invertOnDark}
                                className="text-3xl"
                            />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-theme-muted whitespace-nowrap">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const skillCategories: SkillCategory[] = [
    {
        id: 'fullstack',
        category: 'Full Stack',
        title: 'Web Development',
        description: 'Building scalable web applications with modern frontend frameworks, backend APIs, and databases.',
        skills: [
            { name: 'React JS', Icon: SiReact, color: '#61DAFB' },
            { name: 'Node JS', Icon: SiNodedotjs, color: '#339933' },
            { name: 'Django', Icon: SiDjango, color: '#092E20' },
            { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
            { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
            { name: 'SQL', Icon: SiMysql, color: '#4479A1' },
            { name: 'REST APIs', Icon: SiPostman, color: '#FF6C37' },
        ],
        icon: <HiOutlineCommandLine className="text-3xl text-blue-400" />,
        color: 'from-blue-400/20 to-indigo-500/10',
    },
    {
        id: 'mobile',
        category: 'Mobile Dev',
        title: 'Mobile Development',
        description: 'Cross-platform mobile apps with React Native, Expo, Firebase, and Android Studio.',
        skills: [
            { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
            { name: 'Android Studio', Icon: SiAndroidstudio, color: '#3DDC84' },
            { name: 'Expo', Icon: SiExpo, color: '#000020', invertOnDark: true },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
        ],
        icon: <HiOutlineDevicePhoneMobile className="text-3xl text-cyan-400" />,
        color: 'from-cyan-400/20 to-blue-500/10',
    },
    {
        id: 'languages',
        category: 'Languages',
        title: 'Programming Languages',
        description: 'Strong foundation in core programming with problem-solving, OOP, and performance-oriented coding.',
        skills: [
            { name: 'Python', Icon: SiPython, color: '#3776AB' },
            { name: 'Java', Icon: SiOpenjdk, color: '#437291' },
            { name: 'DSA', Icon: SiLeetcode, color: '#FFA116' },
            { name: 'OOP', Icon: SiOpenjdk, color: '#ED8B00' },
            { name: 'Problem Solving', Icon: SiHackerrank, color: '#00EA64' },
        ],
        icon: <HiOutlineCpuChip className="text-3xl text-indigo-400" />,
        color: 'from-indigo-500/20 to-purple-500/10',
    },
    {
        id: 'design',
        category: 'UI / UX',
        title: 'Design & Prototyping',
        description: 'Crafting visually appealing, accessible, and user-centric interfaces with a product mindset.',
        skills: [
            { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
            { name: 'Framer', Icon: SiFramer, color: '#0055FF' },
            { name: 'Canva', Icon: SiCanva, color: '#00C4CC' },
            { name: 'Accessibility', Icon: FaUniversalAccess, color: '#2563EB' },
        ],
        icon: <HiOutlinePaintBrush className="text-3xl text-orange-400" />,
        color: 'from-orange-400/20 to-red-500/10',
    },
    {
        id: 'aiml',
        category: 'AI & Data',
        title: 'AI & Data Science',
        description: 'Building AI-integrated applications and data analysis tools with Python-based scientific libraries.',
        skills: [
            { name: 'NumPy', Icon: SiNumpy, color: '#013243' },
            { name: 'Jupyter', Icon: SiJupyter, color: '#F37626' },
            { name: 'OpenAI', Icon: SiOpenai, color: '#10A37F' },
            { name: 'Gemini', Icon: SiGooglegemini, color: '#8E75B2' },
        ],
        icon: <HiOutlineSparkles className="text-3xl text-purple-400" />,
        color: 'from-purple-400/20 to-pink-500/10',
    },
    {
        id: 'deployment',
        category: 'Deployment',
        title: 'Deployment & DevOps',
        description: 'Shipping and hosting applications with modern deployment platforms and version control.',
        skills: [
            { name: 'Netlify', Icon: SiNetlify, color: '#00C7B7' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717', invertOnDark: true },
            { name: 'Git', Icon: SiGit, color: '#F05032' },
        ],
        icon: <HiOutlineCloud className="text-3xl text-sky-400" />,
        color: 'from-sky-400/20 to-blue-500/10',
    },
    {
        id: 'productivity',
        category: 'Productivity',
        title: 'Tools & Platforms',
        description: 'Professional productivity and project management tools for effective team collaboration.',
        skills: [
            { name: 'Jira', Icon: SiJira, color: '#0052CC' },
            { name: 'Word', Icon: FaFileWord, color: '#2B579A' },
            { name: 'Excel', Icon: FaFileExcel, color: '#217346' },
            { name: 'PowerPoint', Icon: FaFilePowerpoint, color: '#D24726' },
        ],
        icon: <HiOutlineChartBar className="text-3xl text-emerald-400" />,
        color: 'from-emerald-400/20 to-cyan-500/10',
    },
];

const About = () => {
    const [index, setIndex] = useState(0);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;
        const timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % skillCategories.length);
        }, 6000);
        return () => clearTimeout(timer);
    }, [index, reducedMotion]);

    const activeCategory = skillCategories[index];

    return (
        <section id="about" className="py-24 md:py-28 bg-theme-bg relative overflow-hidden border-t border-theme-border transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-theme-text flex items-center gap-6">
                            <span className="w-16 h-[2px] bg-indigo-500"></span>
                            A little bit about me
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Column 1: Condensed Bio */}
                    <ScrollReveal variant="fadeLeft" className="lg:col-span-4 space-y-10">
                        <div className="space-y-6">
                            <p className="text-lg text-theme-muted font-medium leading-relaxed">
                                I build <span className="text-theme-text">scalable web and mobile applications</span> integrating AI-driven features and clean, responsive interfaces.
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
                                        className="px-3 py-1.5 rounded-md bg-theme-surface/50 border border-theme-border text-theme-muted text-[10px] font-bold uppercase tracking-wider"
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
                                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                                transition={{ duration: 0.55, ease: 'circOut' }}
                                className="relative w-full min-h-[460px] overflow-hidden rounded-2xl border-2 border-theme-border bg-[var(--color-card-glass)] p-8 shadow-2xl backdrop-blur-sm"
                            >
                                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeCategory.color} opacity-20 dark:opacity-55`} />
                                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl dark:bg-indigo-500/10" />

                                <div className="relative z-10 space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 pt-1">
                                            {activeCategory.icon}
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-indigo-400 font-bold uppercase tracking-[0.25em] text-[10px]">
                                                {activeCategory.category}
                                            </span>
                                            <h3 className="text-xl font-black text-theme-text uppercase tracking-tight leading-tight">
                                                {activeCategory.title}
                                            </h3>
                                            <p className="text-xs text-theme-muted leading-relaxed font-medium">
                                                {activeCategory.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 pt-2 sm:grid-cols-3">
                                        {activeCategory.skills.map((skill) => (
                                            <SkillChip key={skill.name} {...skill} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Category progress + labels */}
                        <div className="mt-6 space-y-3 px-1">
                            <div className="flex gap-2">
                                {skillCategories.map((cat, i) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setIndex(i)}
                                        aria-label={`Show ${cat.title}`}
                                        className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${i === index ? 'bg-indigo-500' : 'bg-theme-border hover:bg-indigo-500/40'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-center text-xs font-black uppercase tracking-[0.24em] text-theme-text md:text-sm">
                                {activeCategory.category}
                            </p>
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
                            { id: 'certs', value: 8, decimals: 0, suffix: '+', label: <>Certifications<br />Earned</> },
                            { id: 'awards', value: 3, decimals: 0, suffix: '+', label: <>Major Awards &<br />Recognitions</> },
                        ].map((metric) => (
                            <motion.div key={metric.id} variants={fadeUp} className="space-y-1">
                                <h4 className="text-4xl font-black text-theme-text italic tracking-tighter">
                                    <AnimatedCounter
                                        value={metric.value}
                                        decimals={metric.decimals}
                                        suffix={metric.suffix}
                                    />
                                </h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-tight">{metric.label}</p>
                            </motion.div>
                        ))}

                    </motion.div>

                </div>
            </div>

            <AiToolsMarquee />
        </section>
    );
};

export default About;
