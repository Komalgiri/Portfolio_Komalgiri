import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineServerStack,
    HiOutlineCircleStack,
    HiOutlineCloud,
    HiOutlineMagnifyingGlass,
    HiOutlineDocumentText,
    HiOutlineFire,
} from 'react-icons/hi2';
import {
    udyampathTargetLayers,
    udyampathCurrentLayers,
    udyampathRequestFlows,
    udyampathSchemaRelations,
    udyampathEntities,
} from '../../constants/udyampathArchitecture';

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

interface UdyampathArchitectureProps {
    showHeader?: boolean;
    detail?: 'diagram' | 'full';
    compact?: boolean;
}

const UdyampathArchitecture = ({ showHeader = true, detail = 'full', compact = false }: UdyampathArchitectureProps) => {
    const [activeFlow, setActiveFlow] = useState(0);
    const flow = udyampathRequestFlows[activeFlow];
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
                    <h2 className="codepod-arch-title">UdyamPath system design</h2>
                    <p className="codepod-arch-lead">
                        Team-built career platform — I owned the job portal module: city-aware
                        recommendations (salary vs cost of living), filters, apply flows, and AI resume
                        analysis. Architecture spans my scope plus the wider platform design.
                    </p>
                </motion.div>
            )}

            {!compact && (
            <section>
                <h3 className="codepod-arch-section-title">
                    <span>Target</span> architecture
                </h3>
                <p className="codepod-arch-sub">Planned production stack from system design diagrams</p>
                <div className="codepod-diagram">
                    <DiagramNode
                        title={udyampathTargetLayers.client.title}
                        nodes={udyampathTargetLayers.client.nodes}
                        icon={HiOutlineCloud}
                    />
                    <DiagramConnector label="REST · JSON" />
                    <DiagramNode
                        title={udyampathTargetLayers.api.title}
                        nodes={udyampathTargetLayers.api.nodes}
                        icon={HiOutlineServerStack}
                    />
                    <DiagramConnector label="Query · filter · paginate" />
                    <div className="codepod-diagram-row">
                        <DiagramNode
                            title={udyampathTargetLayers.search.title}
                            nodes={udyampathTargetLayers.search.nodes}
                            icon={HiOutlineMagnifyingGlass}
                        />
                        <DiagramNode
                            title={udyampathTargetLayers.data.title}
                            nodes={udyampathTargetLayers.data.nodes}
                            icon={HiOutlineCircleStack}
                        />
                    </div>
                    <p className="codepod-diagram-footnote">
                        Signature feature: affordable jobs where salary &gt; city total_expense
                    </p>
                </div>
            </section>
            )}

            <section>
                {!compact && (
                    <>
                        <h3 className="codepod-arch-section-title">
                            <span>Current</span> implementation
                        </h3>
                        <p className="codepod-arch-sub">Job portal module — my contribution on the team build</p>
                    </>
                )}
                <div className={`codepod-diagram ${compact ? 'is-compact' : ''}`}>
                    <DiagramNode
                        title={udyampathCurrentLayers.client.title}
                        nodes={udyampathCurrentLayers.client.nodes}
                        icon={HiOutlineCloud}
                        compact={compact}
                    />
                    <DiagramConnector label="fetch · signIn / signUp" />
                    <div className="codepod-diagram-row">
                        <DiagramNode
                            title={udyampathCurrentLayers.json.title}
                            nodes={udyampathCurrentLayers.json.nodes}
                            icon={HiOutlineDocumentText}
                            compact={compact}
                        />
                        <DiagramNode
                            title={udyampathCurrentLayers.firebase.title}
                            nodes={udyampathCurrentLayers.firebase.nodes}
                            icon={HiOutlineFire}
                            compact={compact}
                        />
                    </div>
                    {!compact && (
                        <p className="codepod-diagram-footnote">
                            Teammates own courses, interview tools, and recruiter UI on the same codebase
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
                                {udyampathRequestFlows.map((item, index) => (
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
                            <span>Database</span> ER model
                        </h3>
                        <p className="codepod-arch-sub">Planned relational schema (PostgreSQL / MongoDB)</p>
                        <div className="codepod-schema-relations">
                            {udyampathSchemaRelations.map((rel) => (
                                <span key={rel} className="codepod-schema-chip">
                                    {rel}
                                </span>
                            ))}
                        </div>
                        <div className="codepod-entity-grid">
                            {udyampathEntities.map((entity) => (
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

export default UdyampathArchitecture;
