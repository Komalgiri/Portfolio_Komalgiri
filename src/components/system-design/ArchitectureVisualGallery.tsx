import { useState, useEffect, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
    HiOutlineCloud,
    HiOutlineServerStack,
    HiOutlineCircleStack,
    HiOutlineShieldCheck,
    HiOutlineDocumentText,
    HiOutlineMagnifyingGlass,
    HiOutlineChatBubbleLeftRight,
    HiOutlineChartBar,
    HiOutlineUserGroup,
    HiOutlineSparkles,
    HiOutlineFire,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import type {
    ArchIconKey,
    ArchPipeline,
    ProjectArchitectureVisual,
} from '../../constants/projectArchitectureVisuals';
import { projectArchitectureVisuals } from '../../constants/projectArchitectureVisuals';
import type { SystemDesignProjectId } from '../../constants/systemDesignGallery';
import CompleteSystemDiagram from './CompleteSystemDiagram';

const iconMap: Record<ArchIconKey, IconType> = {
    cloud: HiOutlineCloud,
    server: HiOutlineServerStack,
    database: HiOutlineCircleStack,
    shield: HiOutlineShieldCheck,
    github: SiGithub,
    sparkles: HiOutlineSparkles,
    fire: HiOutlineFire,
    document: HiOutlineDocumentText,
    magnifier: HiOutlineMagnifyingGlass,
    chat: HiOutlineChatBubbleLeftRight,
    chart: HiOutlineChartBar,
    users: HiOutlineUserGroup,
};

const methodColors: Record<string, string> = {
    GET: 'arch-method-get',
    POST: 'arch-method-post',
    PATCH: 'arch-method-patch',
    PUT: 'arch-method-put',
    DELETE: 'arch-method-delete',
};

const ArchIcon = ({
    name,
    className = '',
    style,
}: {
    name: ArchIconKey;
    className?: string;
    style?: CSSProperties;
}) => {
    const Icon = iconMap[name];
    return <Icon className={className} style={style} />;
};

const ApiEndpointGrid = ({ visual }: { visual: ProjectArchitectureVisual }) => (
    <div className="arch-api-grid">
        {visual.endpoints.map((ep, i) => (
            <motion.div
                key={ep.path}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="arch-api-row"
            >
                <span className={`arch-method ${methodColors[ep.method]}`}>{ep.method}</span>
                <code className="arch-api-path">{ep.path}</code>
                <span className="arch-api-label">{ep.label}</span>
            </motion.div>
        ))}
    </div>
);

const DataModelDiagram = ({ visual }: { visual: ProjectArchitectureVisual }) => (
    <div className="arch-er-grid">
        {visual.entities.map((entity, i) => (
            <motion.article
                key={entity.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="arch-er-card"
            >
                <div className="arch-er-head">
                    <HiOutlineCircleStack className="text-violet-400" />
                    <h4>{entity.name}</h4>
                </div>
                <ul className="arch-er-fields">
                    {entity.fields.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
                {entity.links && entity.links.length > 0 && (
                    <div className="arch-er-links">
                        {entity.links.map((link) => (
                            <span key={link} className="arch-er-link">
                                → {link}
                            </span>
                        ))}
                    </div>
                )}
            </motion.article>
        ))}
    </div>
);

const FlowPipeline = ({ pipelines }: { pipelines: ArchPipeline[] }) => {
    const [active, setActive] = useState(0);
    const pipeline = pipelines[active];

    return (
        <div className="arch-flow">
            <div className="arch-flow-tabs" role="tablist">
                {pipelines.map((p, i) => (
                    <button
                        key={p.id}
                        type="button"
                        role="tab"
                        aria-selected={active === i}
                        onClick={() => setActive(i)}
                        className={`arch-flow-tab ${active === i ? 'is-active' : ''}`}
                        style={active === i ? { borderColor: p.accent, color: p.accent } : undefined}
                    >
                        {p.title}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={pipeline.id}
                    role="tabpanel"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="arch-flow-track"
                >
                    {pipeline.steps.map((step, i) => (
                        <div key={step.label} className="arch-flow-step-wrap">
                            <div className="arch-flow-step" style={{ borderColor: `${pipeline.accent}55` }}>
                                <ArchIcon name={step.icon} className="text-lg" style={{ color: pipeline.accent }} />
                                <span>{step.label}</span>
                            </div>
                            {i < pipeline.steps.length - 1 && (
                                <span className="arch-flow-arrow" style={{ color: pipeline.accent }}>
                                    →
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const detailTabs = [
    { id: 'api', title: 'API surface', subtitle: 'Routes & endpoints' },
    { id: 'data', title: 'Data model', subtitle: 'Entities & relations' },
    { id: 'flow', title: 'Backend flow', subtitle: 'Request pipelines' },
] as const;

type DetailTabId = (typeof detailTabs)[number]['id'];

interface ArchitectureVisualGalleryProps {
    projectId: SystemDesignProjectId;
}

const ArchitectureVisualGallery = ({ projectId }: ArchitectureVisualGalleryProps) => {
    const visual = projectArchitectureVisuals[projectId];
    const [activeDetail, setActiveDetail] = useState<DetailTabId>('api');

    useEffect(() => {
        setActiveDetail('api');
    }, [projectId]);

    const renderDetail = (id: DetailTabId) => {
        switch (id) {
            case 'api':
                return <ApiEndpointGrid visual={visual} />;
            case 'data':
                return <DataModelDiagram visual={visual} />;
            case 'flow':
                return <FlowPipeline pipelines={visual.pipelines} />;
        }
    };

    return (
        <div className="arch-gallery">
            <div className="arch-skills">
                {visual.backendSkills.map((skill) => (
                    <span key={skill} className="arch-skill-chip">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="arch-gallery-split">
                <section className="arch-complete-section">
                    <p className="arch-section-eyebrow">Complete architecture</p>
                    <div className="arch-complete-stage">
                        <CompleteSystemDiagram diagram={visual.completeDiagram} />
                    </div>
                </section>

                <section className="arch-detail-section">
                    <p className="arch-section-eyebrow">Deep dive</p>

                    <div className="arch-diagram-tabs arch-diagram-tabs-detail">
                        {detailTabs.map((card) => (
                            <button
                                key={card.id}
                                type="button"
                                onClick={() => setActiveDetail(card.id)}
                                aria-pressed={activeDetail === card.id}
                                className={`arch-diagram-tab ${activeDetail === card.id ? 'is-active' : ''}`}
                            >
                                <span className="arch-diagram-tab-title">{card.title}</span>
                                <span className="arch-diagram-tab-sub">{card.subtitle}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${projectId}-${activeDetail}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.28 }}
                            className="arch-diagram-stage"
                        >
                            {renderDetail(activeDetail)}
                        </motion.div>
                    </AnimatePresence>
                </section>
            </div>
        </div>
    );
};

export default ArchitectureVisualGallery;
