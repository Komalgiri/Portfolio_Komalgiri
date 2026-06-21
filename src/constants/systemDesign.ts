import type { GalleryMediaItem } from './mediaGallery';
import codpod from '../assets/codpod.png';
import mentora from '../assets/mentora.png';
import agetech from '../assets/agetech.jpg';

/** Add diagrams to src/assets/system/ and register here */
export const systemDesignItems: GalleryMediaItem[] = [
    {
        id: 'between-architecture',
        title: 'BETWEEN — App Architecture',
        caption: 'Firebase sync, offline-first flows & paired-device model',
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
        id: 'fullstack-overview',
        title: 'Full-Stack Product Overview',
        caption: 'End-to-end web & mobile integration patterns',
        src: agetech,
        type: 'image',
    },
];
