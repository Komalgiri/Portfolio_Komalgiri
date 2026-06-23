import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineServerStack,
    HiOutlineShieldCheck,
    HiOutlineCircleStack,
    HiOutlineCloud,
    HiOutlineGlobeAlt,
} from 'react-icons/hi2';
import {
    codepodEntities,
    codepodLayers,
    codepodRequestFlows,
    codepodSchemaRelations,
} from '../../constants/codepodArchitecture';

const DiagramNode = ({
    title,
    nodes,
    icon: Icon,
    compact,
}: {
    title: string;
    nodes: { label: string }[];
    icon: typeof HiOutlineCloud;
    compact?: boolean;
}) => (
    <article className={`codepod-diagram-node ${compact ? 'is-compact' : ''}`}>
        <div className="codepod-diagram-node-head">
            <Icon className="text-base text-indigo-400" />
            <h4>{title}</h4>
        </div>
        <ul>
            {(compact ? nodes.slice(0, 2) : nodes).map((node) => (
                <li key={node.label}>{node.label}</li>
            ))}
        </ul>
    </article>
);

const DiagramConnector = ({ label }: { label: string }) => (
    <div className="codepod-diagram-connector" aria-hidden="true">
        <span className="codepod-diagram-connector-line" />
        <span className="codepod-diagram-connector-label">{label}</span>
        <span className="codepod-diagram-connector-line" />
    </div>
);

interface CodePodArchitectureProps {
    showHeader?: boolean;
    /** diagram = architecture only; full = includes request flows + database (case study) */
    detail?: 'diagram' | 'full';
    /** gallery view — tighter nodes, less spacing */
    compact?: boolean;
}

const CodePodArchitecture = ({ showHeader = true, detail = 'full', compact = false }: CodePodArchitectureProps) => {
    const [activeFlow, setActiveFlow] = useState(0);
    const flow = codepodRequestFlows[activeFlow];
    const showDetails = detail === 'full';

    return (
        <div className={`codepod-arch ${compact ? 'space-y-6' : 'space-y-16'}`}>
            {showHeader && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="codepod-arch-header"
                >
                    <p className="codepod-arch-eyebrow">Featured architecture</p>
                    <h2 className="codepod-arch-title">CodePodAI system design</h2>
                    <p className="codepod-arch-lead">
                        React client, Express API, Prisma/PostgreSQL, GitHub OAuth, and Gemini —
                        wired for collaborative software pods.
                    </p>
                </motion.div>
            )}

            <section>
                {!compact && (
                    <h3 className="codepod-arch-section-title">
                        <span>System</span> architecture
                    </h3>
                )}
                <div className={`codepod-diagram ${compact ? 'is-compact' : ''}`}>
                    <DiagramNode
                        title={codepodLayers.client.title}
                        nodes={codepodLayers.client.nodes}
                        icon={HiOutlineCloud}
                        compact={compact}
                    />
                    <DiagramConnector label="REST + Bearer JWT" />
                    <DiagramNode
                        title={codepodLayers.api.title}
                        nodes={codepodLayers.api.nodes}
                        icon={HiOutlineServerStack}
                        compact={compact}
                    />
                    <DiagramConnector label="Routes → Auth · Prisma · GitHub · Gemini" />
                    <div className="codepod-diagram-row">
                        <DiagramNode
                            title={codepodLayers.auth.title}
                            nodes={codepodLayers.auth.nodes}
                            icon={HiOutlineShieldCheck}
                            compact={compact}
                        />
                        <DiagramNode
                            title={codepodLayers.data.title}
                            nodes={codepodLayers.data.nodes}
                            icon={HiOutlineCircleStack}
                            compact={compact}
                        />
                        <DiagramNode
                            title={codepodLayers.external.title}
                            nodes={codepodLayers.external.nodes}
                            icon={HiOutlineGlobeAlt}
                            compact={compact}
                        />
                    </div>
                    {!compact && (
                        <p className="codepod-diagram-footnote">
                            GitHub OAuth callback encrypts token and links to GitHub API for repo sync
                        </p>
                    )}
                </div>
            </section>

            {showDetails && (
            <>
            <section>
                <h3 className="codepod-arch-section-title">
                    <span>Request</span> flow
                </h3>
                <div className="codepod-flow-panel">
                    <div className="codepod-flow-tabs" role="tablist">
                        {codepodRequestFlows.map((item, index) => (
                            <button
                                key={item.title}
                                type="button"
                                role="tab"
                                aria-selected={activeFlow === index}
                                onClick={() => setActiveFlow(index)}
                                className={`codepod-flow-tab ${activeFlow === index ? 'is-active' : ''}`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.ol
                            key={flow.title}
                            role="tabpanel"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="codepod-flow-steps"
                        >
                            {flow.steps.map((step, stepIndex) => (
                                <li key={step} className="codepod-flow-step">
                                    <span className="codepod-flow-step-num">{stepIndex + 1}</span>
                                    <span className="codepod-flow-step-text">{step}</span>
                                </li>
                            ))}
                        </motion.ol>
                    </AnimatePresence>
                </div>
            </section>

            <section>
                <h3 className="codepod-arch-section-title">
                    <span>Database</span> schema
                </h3>
                <p className="codepod-arch-sub">PostgreSQL via Prisma ORM</p>
                <div className="codepod-schema-relations">
                    {codepodSchemaRelations.map((rel) => (
                        <span key={rel} className="codepod-schema-chip">
                            {rel}
                        </span>
                    ))}
                </div>
                <div className="codepod-entity-grid">
                    {codepodEntities.map((entity) => (
                        <article key={entity.name} className="codepod-entity-card">
                            <h4>{entity.name}</h4>
                            <p>{entity.fields}</p>
                        </article>
                    ))}
                </div>
            </section>
            </>
            )}
        </div>
    );
};

export default CodePodArchitecture;
