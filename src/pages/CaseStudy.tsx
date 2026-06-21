import CaseStudyDocument from '../components/case-study/CaseStudyDocument';
import { caseStudies } from '../constants/caseStudies';

interface CaseStudyProps {
    projectId: string;
    onBack: () => void;
}

const CaseStudy = ({ projectId, onBack }: CaseStudyProps) => {
    const project = caseStudies[projectId];

    if (!project) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-theme-bg text-theme-text">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold">Project Not Found</h1>
                    <button type="button" onClick={onBack} className="text-violet-500 hover:underline">
                        ← Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return <CaseStudyDocument project={project} onBack={onBack} />;
};

export default CaseStudy;
