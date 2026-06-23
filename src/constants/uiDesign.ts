import type { GalleryMediaItem } from './mediaGallery';
import ui1 from '../assets/UI_1.png';
import ui2 from '../assets/UI_2.png';
import ui3 from '../assets/UI_3.png';
import ui4 from '../assets/UI_4.png';
import ui5 from '../assets/UI_5.png';
import ui6 from '../assets/UI_6.png';
import ui7 from '../assets/UI_7.png';
import ui8 from '../assets/UI_8.png';
import ui9 from '../assets/UI_9.png';
import ui10 from '../assets/UI_10.png';
import ui11 from '../assets/UI_11.png';
import ui12 from '../assets/UI_12.png';
import ui13 from '../assets/UI_13.png';
import ui14 from '../assets/UI_14.png';
import app2 from '../assets/app2.jpg';
import app3 from '../assets/app3.jpg';
import app4 from '../assets/app4.png';
import app6 from '../assets/app6.jpg';
import app7 from '../assets/app7.jpg';
import app8 from '../assets/app8.jpg';
import codpod from '../assets/codpod.png';
import mentora from '../assets/mentora.png';
import agetech from '../assets/agetech.jpg';
import udyampath from '../assets/udyampath.png';
import aisewa from '../assets/aisewa.png';

const uiDesignItemsBase: GalleryMediaItem[] = [
    { id: 'ui-1', title: 'UI Design', caption: 'Visual design exploration', src: ui1, type: 'image' },
    { id: 'ui-2', title: 'UI Design', caption: 'Visual design exploration', src: ui2, type: 'image' },
    { id: 'ui-3', title: 'UI Design', caption: 'Visual design exploration', src: ui3, type: 'image' },
    { id: 'ui-4', title: 'UI Design', caption: 'Visual design exploration', src: ui4, type: 'image' },
    { id: 'ui-5', title: 'UI Design', caption: 'Visual design exploration', src: ui5, type: 'image' },
    { id: 'ui-6', title: 'UI Design', caption: 'Visual design exploration', src: ui6, type: 'image' },
    { id: 'ui-7', title: 'UI Design', caption: 'Visual design exploration', src: ui7, type: 'image' },
    { id: 'ui-8', title: 'UI Design', caption: 'Visual design exploration', src: ui8, type: 'image' },
    { id: 'ui-9', title: 'Athena — Learning Platform', caption: 'Educational landing page with search & course discovery', src: ui9, type: 'image' },
    { id: 'ui-10', title: 'Beyond the Page — Library Hero', caption: 'AI-powered digital library landing section', src: ui10, type: 'image' },
    { id: 'ui-11', title: 'UI Design', caption: 'Visual design exploration', src: ui11, type: 'image' },
    { id: 'ui-12', title: 'UdyamPath — Homepage', caption: 'Team career platform — jobs, courses & tools', src: ui12, type: 'image' },
    { id: 'ui-13', title: 'UI Design', caption: 'Visual design exploration', src: ui13, type: 'image' },
    { id: 'ui-14', title: 'UdyamPath — City Budget Tool', caption: 'Job portal module I built — salary vs cost of living', src: ui14, type: 'image' },
    {
        id: 'between-home',
        title: 'BETWEEN — Home & Mood Sync',
        caption: 'Daily connection hub with live partner status',
        src: app2,
        type: 'image',
        size: 'mobile',
    },
    {
        id: 'between-ai-letters',
        title: 'BETWEEN — AI Letters',
        caption: 'Gemini-powered letter drafting flow',
        src: app3,
        type: 'image',
        size: 'mobile',
    },
    {
        id: 'between-moment',
        title: 'BETWEEN — Share Moment',
        caption: 'Photo canvas with stickers & captions',
        src: app4,
        type: 'image',
        size: 'mobile',
    },
    {
        id: 'between-anniversary',
        title: 'BETWEEN — Anniversaries',
        caption: 'Countdowns, milestones & shared reminders',
        src: app6,
        type: 'image',
        size: 'mobile',
    },
    {
        id: 'between-play-hub',
        title: 'BETWEEN — Play Hub',
        caption: 'Couple games with live answer sync',
        src: app7,
        type: 'image',
        size: 'mobile',
    },
    {
        id: 'between-live-canvas',
        title: 'BETWEEN — Shared Story',
        caption: 'Real-time collaborative drawing canvas',
        src: app8,
        type: 'image',
        size: 'mobile',
    },
    {
        id: 'project-codepod',
        title: 'CodePodAI',
        caption: 'AI project orchestration — pods, roadmaps & GitHub sync',
        src: codpod,
        type: 'image',
    },
    {
        id: 'project-udyampath',
        title: 'UdyamPath',
        caption: 'Team project — job portal, city expenses & AI resume analysis',
        src: udyampath,
        type: 'image',
    },
    {
        id: 'project-mentora',
        title: 'Mentora',
        caption: 'Wellness SPA — mentor chat, mood studio & gamification',
        src: mentora,
        type: 'image',
    },
    {
        id: 'project-ai-sewa',
        title: 'AI Sewa',
        caption: 'Civic AI app — disaster alerts & emergency access',
        src: aisewa,
        type: 'image',
        size: 'mobile',
    },
    {
        id: 'project-agetech',
        title: 'Agetech Connect',
        caption: 'Care matching for aging-tech innovators',
        src: agetech,
        type: 'image',
        size: 'mobile',
    },
];

/** UI_9/10/12/14 sit in row 2 (just below the fold); rest mixed randomly */
const shuffledOrder = [
    'ui-7', 'between-play-hub', 'ui-10',
    'ui-12', 'ui-14', 'between-home',
    'ui-3', 'ui-1', 'project-udyampath',
    'ui-11', 'ui-5', 'between-ai-letters',
    'project-mentora', 'ui-2', 'between-moment',
    'project-codepod', 'ui-8', 'project-agetech',
    'ui-9', 'ui-4', 'between-anniversary',
    'between-live-canvas', 'ui-6', 'ui-13',
    'project-ai-sewa',
];

const itemById = new Map(uiDesignItemsBase.map((item) => [item.id, item]));

export const uiDesignItems: GalleryMediaItem[] = shuffledOrder
    .map((id) => itemById.get(id))
    .filter((item): item is GalleryMediaItem => item !== undefined);
