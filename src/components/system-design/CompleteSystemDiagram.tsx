import { useMemo } from 'react';
import { motion } from 'framer-motion';
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
    ArchCompleteDiagram,
    ArchIconKey,
    ArchNodeKind,
    ArchSystemNode,
} from '../../constants/projectArchitectureVisuals';

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

const kindStyles: Record<ArchNodeKind, { border: string; bg: string; dot: string; ring: string }> = {
    client: { border: 'border-sky-500/45', bg: 'bg-sky-500/12', dot: 'bg-sky-400', ring: 'ring-sky-500/20' },
    api: { border: 'border-indigo-500/45', bg: 'bg-indigo-500/12', dot: 'bg-indigo-400', ring: 'ring-indigo-500/20' },
    database: { border: 'border-violet-500/45', bg: 'bg-violet-500/12', dot: 'bg-violet-400', ring: 'ring-violet-500/20' },
    auth: { border: 'border-amber-500/45', bg: 'bg-amber-500/12', dot: 'bg-amber-400', ring: 'ring-amber-500/20' },
    external: { border: 'border-slate-500/45', bg: 'bg-slate-500/12', dot: 'bg-slate-400', ring: 'ring-slate-500/20' },
    data: { border: 'border-cyan-500/45', bg: 'bg-cyan-500/12', dot: 'bg-cyan-400', ring: 'ring-cyan-500/20' },
    ai: { border: 'border-fuchsia-500/45', bg: 'bg-fuchsia-500/12', dot: 'bg-fuchsia-400', ring: 'ring-fuchsia-500/20' },
};

const CompleteNode = ({ node }: { node: ArchSystemNode }) => {
    const style = kindStyles[node.kind];
    const Icon = iconMap[node.icon];
    const isPlanned = node.id.includes('planned');

    return (
        <motion.article
            id={`arch-node-${node.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`arch-complete-node ${style.bg} ${style.border} ring-1 ${style.ring} ${isPlanned ? 'is-planned' : ''}`}
        >
            <span className={`arch-complete-node-dot ${style.dot}`} />
            <Icon className="arch-complete-node-icon" />
            <h4 className="arch-complete-node-title">{node.label}</h4>
            <p className="arch-complete-node-sub">{node.sublabel}</p>
            {node.details && (
                <ul className="arch-complete-node-details">
                    {node.details.map((d) => (
                        <li key={d}>{d}</li>
                    ))}
                </ul>
            )}
        </motion.article>
    );
};

const CompleteSystemDiagram = ({ diagram }: { diagram: ArchCompleteDiagram }) => {
    const nodeLayerMap = useMemo(() => {
        const map = new Map<string, number>();
        diagram.layers.forEach((layer, index) => {
            layer.nodes.forEach((n) => map.set(n.id, index));
        });
        return map;
    }, [diagram.layers]);

    const intraLayerEdges = useMemo(
        () =>
            diagram.edges.filter((e) => {
                const fromLayer = nodeLayerMap.get(e.from);
                const toLayer = nodeLayerMap.get(e.to);
                return fromLayer !== undefined && fromLayer === toLayer;
            }),
        [diagram.edges, nodeLayerMap],
    );

    const getCrossLayerEdges = (fromLayerIndex: number) =>
        diagram.edges.filter((e) => {
            const fromLayer = nodeLayerMap.get(e.from);
            const toLayer = nodeLayerMap.get(e.to);
            return fromLayer === fromLayerIndex && toLayer !== undefined && toLayer > fromLayerIndex;
        });

    return (
        <div className="arch-complete">
            <header className="arch-complete-header">
                <h3 className="arch-complete-title">{diagram.title}</h3>
                <p className="arch-complete-desc">{diagram.description}</p>
            </header>

            <div className="arch-complete-legend" aria-hidden="true">
                {(['client', 'api', 'database', 'auth', 'external', 'ai', 'data'] as ArchNodeKind[]).map((kind) => (
                    <span key={kind} className="arch-complete-legend-item">
                        <span className={`arch-complete-legend-dot ${kindStyles[kind].dot}`} />
                        {kind}
                    </span>
                ))}
            </div>

            <div className="arch-complete-stack">
                {diagram.layers.map((layer, layerIndex) => (
                    <div key={layer.id} className="arch-complete-layer-block">
                        <div className="arch-complete-layer">
                            <div className="arch-complete-layer-rail">
                                <span className="arch-complete-layer-num">{layerIndex + 1}</span>
                                <span className="arch-complete-layer-name">{layer.title}</span>
                            </div>
                            <div
                                className={`arch-complete-layer-nodes ${layer.nodes.length > 1 ? 'is-multi' : ''}`}
                            >
                                {layer.nodes.map((node, nodeIndex) => (
                                    <div key={node.id} className="arch-complete-node-wrap">
                                        {nodeIndex > 0 && (
                                            <span className="arch-complete-h-link" aria-hidden="true">
                                                ↔
                                            </span>
                                        )}
                                        <CompleteNode node={node} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {intraLayerEdges.filter((e) =>
                            layer.nodes.some((n) => n.id === e.from),
                        ).length > 0 && (
                            <div className="arch-complete-intra-edges">
                                {intraLayerEdges
                                    .filter((e) => layer.nodes.some((n) => n.id === e.from))
                                    .map((edge) => (
                                        <span key={`${edge.from}-${edge.to}`} className="arch-complete-edge-pill">
                                            {edge.label}
                                        </span>
                                    ))}
                            </div>
                        )}

                        {layerIndex < diagram.layers.length - 1 && (
                            <div className="arch-complete-v-connector" aria-hidden="true">
                                <span className="arch-complete-v-line" />
                                <div className="arch-complete-v-labels">
                                    {getCrossLayerEdges(layerIndex).map((edge) => (
                                        <span key={`${edge.from}-${edge.to}`} className="arch-complete-edge-pill">
                                            {edge.label}
                                        </span>
                                    ))}
                                </div>
                                <span className="arch-complete-v-arrow">▼</span>
                                <span className="arch-complete-v-line" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompleteSystemDiagram;
