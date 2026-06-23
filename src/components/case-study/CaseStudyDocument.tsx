import { motion } from 'framer-motion';
import {
    HiOutlineArrowLeft,
    HiOutlineCodeBracket,
    HiOutlineGlobeAlt,
    HiOutlineSparkles,
} from 'react-icons/hi2';
import type { CaseStudyData } from '../../constants/caseStudies';
import CodePodArchitecture from '../system-design/CodePodArchitecture';
import UdyampathArchitecture from '../system-design/UdyampathArchitecture';
import MentoraArchitecture from '../system-design/MentoraArchitecture';
import ProcessTimeline from './ProcessTimeline';

const architectureById = {
    codepod: CodePodArchitecture,
    udyampath: UdyampathArchitecture,
    mentora: MentoraArchitecture,
} as const;

interface CaseStudyDocumentProps {
    project: CaseStudyData;
    onBack: () => void;
}

const SectionTitle = ({ emphasis, rest }: { emphasis: string; rest: string }) => (
    <h2 className="case-study-section-title">
        <span className="case-study-emphasis">{emphasis}</span> {rest}
    </h2>
);

const CaseStudyDocument = ({ project, onBack }: CaseStudyDocumentProps) => (
    <div className="case-study-page min-h-screen bg-theme-bg text-theme-text transition-colors duration-300">
        <header className="case-study-topbar">
            <button type="button" onClick={onBack} className="case-study-back">
                <HiOutlineArrowLeft className="text-lg" />
                Back to Projects
            </button>
            <div className="flex items-center gap-3">
                {project.links.github && (
                    <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                        className="case-study-icon-btn"
                    >
                        <HiOutlineCodeBracket className="text-xl" />
                    </a>
                )}
                {project.links.live && (
                    <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="case-study-live-btn"
                    >
                        <HiOutlineGlobeAlt />
                        View Live
                    </a>
                )}
            </div>
        </header>

        <main className="case-study-main">
            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="case-study-hero"
            >
                <div className="case-study-hero-copy">
                    <p className="case-study-brand">{project.title}</p>
                    <h1 className="case-study-headline">{project.studyLabel}</h1>
                    <p className="case-study-overview">{project.overview}</p>
                </div>
                <div className="case-study-hero-visual">
                    <div className="case-study-hero-frame">
                        <img
                            src={project.heroImage}
                            alt={`${project.title} product preview`}
                            className="case-study-hero-image"
                        />
                    </div>
                    <div className="case-study-hero-accent" aria-hidden="true">
                        <HiOutlineSparkles className="text-4xl text-violet-400/80" />
                    </div>
                </div>
            </motion.section>

            {/* Problem */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                className="case-study-block"
            >
                <SectionTitle emphasis="Problem" rest="Statement" />
                <div className="case-study-prose">
                    {project.problem.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </motion.section>

            {/* Solution */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                className="case-study-block"
            >
                <SectionTitle emphasis="Possible" rest="Solution" />
                <div className="case-study-prose">
                    {project.solution.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </motion.section>

            {/* Duration + Tools */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                className="case-study-meta-grid"
            >
                <div>
                    <SectionTitle emphasis="Project" rest="Duration" />
                    <div className="case-study-stats">
                        {project.durationStats.map((stat) => (
                            <div key={stat.unit} className="case-study-stat">
                                <span className="case-study-stat-value">{stat.value}</span>
                                <span className="case-study-stat-unit">{stat.unit}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <SectionTitle emphasis="Tools" rest="Used" />
                    <div className="case-study-tools">
                        {project.tools.map(({ name, Icon, color }) => (
                            <div key={name} className="case-study-tool">
                                <div className="case-study-tool-icon">
                                    <Icon style={{ color }} className="text-2xl" />
                                </div>
                                <span className="case-study-tool-label">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Process */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                className="case-study-block"
            >
                <SectionTitle emphasis="Design" rest="Process" />
                <ProcessTimeline intro={project.processIntro} steps={project.processSteps} />
            </motion.section>

            {project.architectureId && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    className="case-study-block"
                >
                    {(() => {
                        const Architecture = architectureById[project.architectureId];
                        return <Architecture showHeader={false} detail="full" />;
                    })()}
                </motion.section>
            )}

            {/* Key features */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                className="case-study-block"
            >
                <SectionTitle emphasis="Key" rest="Features" />
                <div className="case-study-features">
                    {project.features.map((feature, index) => (
                        <motion.article
                            key={feature.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 }}
                            className="case-study-feature-card"
                        >
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            {/* CTA */}
            {(project.links.live || project.links.github) && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="case-study-cta"
                >
                    <h3>Explore {project.title}</h3>
                    <p>View the live product or browse the repository to see how it was built.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {project.links.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="case-study-live-btn px-8 py-3.5"
                            >
                                <HiOutlineGlobeAlt />
                                View Live Demo
                            </a>
                        )}
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="case-study-secondary-btn"
                            >
                                <HiOutlineCodeBracket />
                                View Source
                            </a>
                        )}
                    </div>
                </motion.section>
            )}
        </main>
    </div>
);

export default CaseStudyDocument;
