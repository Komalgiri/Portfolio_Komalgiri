import type { GalleryMediaItem } from './mediaGallery';
import codpod from '../assets/codpod.png';
import mentora from '../assets/mentora.png';
import agetech from '../assets/agetech.jpg';
import udyampath from '../assets/udyampath.png';

/** Add diagrams to src/assets/system/ and register here */
export const systemDesignItems: GalleryMediaItem[] = [
    {
        id: 'mentora-architecture',
        title: 'Mentora — App Architecture',
        caption: 'React SPA, Firebase Auth + Firestore, scripted mentor chat & wellness tracking',
        src: mentora,
        type: 'image',
    },
    {
        id: 'codepod-architecture',
        title: 'CodePodAI — System Architecture',
        caption: 'React + Express + Prisma, GitHub OAuth & Gemini AI flows',
        src: codpod,
        type: 'image',
    },
    {
        id: 'udyampath-architecture',
        title: 'UdyamPath — Backend Architecture',
        caption: 'React frontend → Node.js REST API → Database → search/filter layer → admin panel',
        src: udyampath,
        type: 'image',
    },
    {
        id: 'udyampath-database-er',
        title: 'UdyamPath — Database ER Diagram',
        caption: 'Users, Jobs, Courses, Applications, Categories, Admin — keys and relationships',
        src: udyampath,
        type: 'image',
    },
    {
        id: 'fullstack-overview',
        title: 'Full-Stack Product Overview',
        caption: 'End-to-end web & mobile integration patterns',
        src: agetech,
        type: 'image',
    },
];
