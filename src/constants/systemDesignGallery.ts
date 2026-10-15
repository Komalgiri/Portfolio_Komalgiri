import orbivai from '../assets/orbivai.png';
import udyampath from '../assets/udyampath.png';
import mentora from '../assets/mentora.png';

export type SystemDesignProjectId = 'codepod' | 'udyampath' | 'mentora';

export const systemDesignProjects: {
    id: SystemDesignProjectId;
    title: string;
    tagline: string;
    image: string;
    gradient: string;
    stack: string[];
}[] = [
    {
        id: 'codepod',
        title: 'OrbiVAI',
        tagline: 'Collaborative Pods, GitHub sync & Gemini roadmaps',
        image: orbivai,
        gradient: 'from-emerald-600 via-teal-500 to-cyan-400',
        stack: ['React', 'Express', 'Prisma', 'PostgreSQL'],
    },
    {
        id: 'udyampath',
        title: 'UdyamPath',
        tagline: 'Job portal — salary vs city living costs',
        image: udyampath,
        gradient: 'from-blue-600 via-indigo-500 to-blue-400',
        stack: ['React', 'Firebase', 'Recharts', 'Gemini'],
    },
    {
        id: 'mentora',
        title: 'Mentora',
        tagline: 'Wellness SPA — Firestore moods & mentor chat',
        image: mentora,
        gradient: 'from-emerald-600 via-teal-500 to-green-400',
        stack: ['React', 'Firebase', 'Firestore', 'Recharts'],
    },
];
