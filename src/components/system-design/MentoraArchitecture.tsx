import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineCloud,
    HiOutlineFire,
    HiOutlineChatBubbleLeftRight,
    HiOutlineGlobeAlt,
    HiOutlineDocumentText,
} from 'react-icons/hi2';
import {
    mentoraTargetLayers,
    mentoraCurrentLayers,
    mentoraRequestFlows,
    mentoraSchemaRelations,
    mentoraEntities,
} from '../../constants/mentoraArchitecture';

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

interface MentoraArchitectureProps {
    showHeader?: boolean;
    detail?: 'diagram' | 'full';
    compact?: boolean;
}

const MentoraArchitecture = ({ showHeader = true, detail = 'full', compact = false }: MentoraArchitectureProps) => {
    const [activeFlow, setActiveFlow] = useState(0);
    const flow = mentoraRequestFlows[activeFlow];
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
                    <h2 className="codepod-arch-title">Mentora system design</h2>
                    <p className="codepod-arch-lead">
                        Mental wellness SPA (Mentora.AI) — guided mentor chat, mood tracking,
                        journaling, self-care tools, and XP gamification. React 18 + Firebase Auth
                        &amp; Firestore; chat uses a local JSON decision tree in the MVP.
                    </p>
                </motion.div>
            )}

            {!compact && (
            <section>
                <h3 className="codepod-arch-section-title">
                    <span>Target</span> architecture
                </h3>
                <p className="codepod-arch-sub">Planned production design</p>
                <div className="codepod-diagram">
                    <DiagramNode
                        title={mentoraTargetLayers.client.title}
                        nodes={mentoraTargetLayers.client.nodes}
                        icon={HiOutlineCloud}
                    />
                    <DiagramConnector label="Auth + Firestore reads/writes" />
                    <div className="codepod-diagram-row">
                        <DiagramNode
                            title={mentoraTargetLayers.firebase.title}
                            nodes={mentoraTargetLayers.firebase.nodes}
                            icon={HiOutlineFire}
                        />
                        <DiagramNode
                            title={mentoraTargetLayers.chat.title}
                            nodes={mentoraTargetLayers.chat.nodes}
                            icon={HiOutlineChatBubbleLeftRight}
                        />
                        <DiagramNode
                            title={mentoraTargetLayers.hosting.title}
                            nodes={mentoraTargetLayers.hosting.nodes}
                            icon={HiOutlineGlobeAlt}
                        />
                    </div>
                </div>
            </section>
            )}

            <section>
                {!compact && (
                    <>
                        <h3 className="codepod-arch-section-title">
                            <span>Current</span> implementation
                        </h3>
                        <p className="codepod-arch-sub">Web-first MVP in the repo today</p>
                    </>
                )}
                <div className={`codepod-diagram ${compact ? 'is-compact' : ''}`}>
                    <DiagramNode
                        title={mentoraCurrentLayers.client.title}
                        nodes={mentoraCurrentLayers.client.nodes}
                        icon={HiOutlineCloud}
                        compact={compact}
                    />
                    <DiagramConnector label="signIn · onSnapshot · setDoc" />
                    <div className="codepod-diagram-row">
                        <DiagramNode
                            title={mentoraCurrentLayers.firebase.title}
                            nodes={mentoraCurrentLayers.firebase.nodes}
                            icon={HiOutlineFire}
                            compact={compact}
                        />
                        <DiagramNode
                            title={mentoraCurrentLayers.static.title}
                            nodes={mentoraCurrentLayers.static.nodes}
                            icon={HiOutlineDocumentText}
                            compact={compact}
                        />
                    </div>
                    {!compact && (
                        <p className="codepod-diagram-footnote">
                            Five mentor personas use chatresponse.json — not a live LLM API yet
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
                                {mentoraRequestFlows.map((item, index) => (
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
                            <span>Firestore</span> schema
                        </h3>
                        <p className="codepod-arch-sub">users/&#123;uid&#125;/ collections</p>
                        <div className="codepod-schema-relations">
                            {mentoraSchemaRelations.map((rel) => (
                                <span key={rel} className="codepod-schema-chip">
                                    {rel}
                                </span>
                            ))}
                        </div>
                        <div className="codepod-entity-grid">
                            {mentoraEntities.map((entity) => (
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

export default MentoraArchitecture;
