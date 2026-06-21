import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

export type ProcessStep = {
    label: string;
    Icon: IconType;
};

interface ProcessTimelineProps {
    intro: string;
    steps: ProcessStep[];
}

const ProcessTimeline = ({ intro, steps }: ProcessTimelineProps) => (
    <div className="process-timeline">
        <p className="process-timeline-intro">{intro}</p>
        <div className="process-timeline-grid">
            {steps.map((step, index) => (
                <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: index * 0.06 }}
                    className="process-timeline-step"
                >
                    <div className="process-timeline-step-head">
                        <span className="process-timeline-num">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        {index < steps.length - 1 && (
                            <span className="process-timeline-rail" aria-hidden="true" />
                        )}
                    </div>
                    <div className="process-timeline-card">
                        <div className="process-timeline-icon">
                            <step.Icon className="text-xl" />
                        </div>
                        <p className="process-timeline-label">{step.label}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

export default ProcessTimeline;
