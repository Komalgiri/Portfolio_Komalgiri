import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp } from '../../utils/scrollAnimations';
import { HiOutlineBriefcase, HiOutlineMapPin } from 'react-icons/hi2';

interface ExperienceMetric {
    value: string;
    label: string;
}

interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    employmentType: string;
    location: string;
    workMode: string;
    period: string;
    duration: string;
    summary: string;
    highlights: string[];
    metrics?: ExperienceMetric[];
    tech: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: 1,
        role: 'Software Developer',
        company: 'Creditor Academy',
        employmentType: 'Full-time',
        location: 'Kirkland, Washington, United States',
        workMode: 'Remote',
        period: 'May 2025 - Present',
        duration: '1 yr 2 mos',
        summary:
            'Leading full-stack development for AI-powered eBook, Virtual Instructor, and LMS platforms — from architecture to production.',
        highlights: [
            'Shipped scalable React frontends with REST API integrations for real-time learning experiences.',
            'Standardized 10+ reusable UI components, improving consistency and accelerating delivery by 30%.',
        ],
        metrics: [
            { value: '25%', label: 'LMS load boost' },
            { value: '10+', label: 'UI components' },
            { value: '30%', label: 'Faster delivery' },
        ],
        tech: ['Full-Stack', 'MEAN Stack', 'React', 'REST APIs', 'LMS'],
    },
    {
        id: 2,
        role: 'Software Developer',
        company: 'VanTech Med',
        employmentType: 'Part-time',
        location: 'Vancouver, British Columbia, Canada',
        workMode: 'Remote',
        period: 'Aug 2024 - Present',
        duration: '1 yr 11 mos',
        summary:
            'Building a cross-platform healthcare app with React Native and Firebase for health tracking and analytics.',
        highlights: [
            'Implemented 5+ analytics modules to track and interpret user health patterns.',
            'Delivered Firebase auth, real-time data, and polished mobile UI across iOS and Android.',
        ],
        metrics: [{ value: '5+', label: 'Analytics modules' }],
        tech: ['React Native', 'Firebase', 'iOS', 'Android', 'Healthcare'],
    },
    {
        id: 3,
        role: 'Software Development Intern',
        company: 'UMA ROBOTIC TECHNOLOGY',
        employmentType: 'Internship',
        location: 'Roorkee, Uttarakhand, India',
        workMode: 'Hybrid',
        period: 'Jan 2024 - Apr 2024',
        duration: '4 mos',
        summary: 'Contributed to robotic automation software through testing, debugging, and performance improvements.',
        highlights: [
            'Ran 50+ software tests to improve system reliability before deployment.',
            'Helped raise industrial task efficiency by 40% through automation enhancements.',
        ],
        metrics: [
            { value: '50+', label: 'Tests executed' },
            { value: '40%', label: 'Efficiency gain' },
        ],
        tech: ['Testing', 'Robotics', 'Automation', 'Debugging'],
    },
];

const Experience = () => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 85%', 'end 40%'],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" className="relative overflow-hidden bg-theme-bg py-24 transition-colors duration-300 md:py-28">
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="flex items-center gap-6 text-5xl font-black text-theme-text md:text-7xl">
                            <span className="h-[2px] w-16 bg-purple-500" />
                            What do I do
                        </h2>
                        <p className="max-w-2xl pl-20 text-lg font-medium text-theme-muted">
                            A chronological journey through my professional growth, technical milestones, and hands-on
                            experience.
                        </p>
                    </motion.div>
                </div>

                <div className="relative" ref={timelineRef}>
                    <div className="pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-purple-500/20 md:left-1/2 md:-translate-x-1/2" />
                    <motion.div
                        className="pointer-events-none absolute left-6 top-0 w-px origin-top bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-500/30 md:left-1/2 md:-translate-x-1/2"
                        style={{ scaleY: lineScale, height: '100%' }}
                    />

                    <div className="relative space-y-12 md:space-y-16">
                        {experiences.map((exp, idx) => {
                            const isLeft = idx % 2 === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-80px' }}
                                    variants={fadeUp}
                                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                                    className="grid grid-cols-[3rem_1fr] gap-x-5 md:grid-cols-[1fr_3rem_1fr] md:gap-x-10"
                                >
                                    {/* Desktop — left column content */}
                                    <div
                                        className={`hidden md:block ${isLeft ? 'md:col-start-1' : 'md:col-start-3'}`}
                                    >
                                        {isLeft && <ExperienceCard exp={exp} align="right" />}
                                    </div>

                                    {/* Timeline rail — icon always centered in this column */}
                                    <div
                                        className={`relative col-start-1 row-start-1 flex justify-center md:col-start-2 md:row-start-1 ${
                                            !isLeft ? 'md:col-start-2' : ''
                                        }`}
                                    >
                                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-purple-500/40 bg-theme-bg shadow-[0_0_0_4px_var(--color-bg)]">
                                            <HiOutlineBriefcase className="text-xl text-purple-400" />
                                        </div>
                                    </div>

                                    {/* Mobile + desktop right-side content */}
                                    <div className={`col-start-2 row-start-1 md:col-start-3 ${!isLeft ? 'md:col-start-3' : ''}`}>
                                        <div className="md:hidden">
                                            <ExperienceCard exp={exp} align="left" />
                                        </div>
                                        <div className="hidden md:block">
                                            {!isLeft && <ExperienceCard exp={exp} align="left" />}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="relative z-20 mt-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                       
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ExperienceCard = ({ exp, align }: { exp: ExperienceItem; align: 'left' | 'right' }) => (
    <div className={`space-y-4 ${align === 'right' ? 'md:text-right' : ''}`}>
        <div className={`flex flex-col gap-1.5 ${align === 'right' ? 'md:items-end' : 'md:items-start'}`}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
                {exp.period} · {exp.duration}
            </span>
            <h3 className="text-2xl font-black text-theme-text">{exp.role}</h3>
            <p className="text-sm font-bold text-theme-muted">
                {exp.company} · {exp.employmentType}
            </p>
            <div
                className={`flex items-center gap-2 text-sm text-theme-muted ${
                    align === 'right' ? 'md:flex-row-reverse' : ''
                }`}
            >
                <HiOutlineMapPin className="shrink-0 text-purple-500" />
                <span>
                    {exp.location} · {exp.workMode}
                </span>
            </div>
        </div>

        <p className="text-sm leading-relaxed text-theme-muted">{exp.summary}</p>

        {exp.metrics && exp.metrics.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${align === 'right' ? 'md:justify-end' : ''}`}>
                {exp.metrics.map((m) => (
                    <div
                        key={m.label}
                        className="rounded-xl border border-purple-500/20 bg-purple-500/5 px-3 py-2 text-center"
                    >
                        <p className="text-base font-black text-purple-400">{m.value}</p>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-theme-muted">{m.label}</p>
                    </div>
                ))}
            </div>
        )}

        <ul className={`space-y-2 ${align === 'right' ? 'md:text-right' : ''}`}>
            {exp.highlights.map((point) => (
                <li
                    key={point}
                    className={`flex gap-2 text-sm leading-relaxed text-theme-muted ${
                        align === 'right' ? 'md:flex-row-reverse' : ''
                    }`}
                >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-500" />
                    <span>{point}</span>
                </li>
            ))}
        </ul>

        <div className={`flex flex-wrap gap-2 ${align === 'right' ? 'md:justify-end' : ''}`}>
            {exp.tech.map((t) => (
                <span
                    key={t}
                    className="rounded-md border border-theme-border bg-theme-surface/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-theme-muted"
                >
                    {t}
                </span>
            ))}
        </div>
    </div>
);

export default Experience;
