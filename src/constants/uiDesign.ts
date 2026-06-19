import type { GalleryMediaItem } from './mediaGallery';
import app1 from '../assets/app1.jpg';
import app2 from '../assets/app2.jpg';
import app3 from '../assets/app3.jpg';
import app4 from '../assets/app4.png';
import app5 from '../assets/app5.jpg';
import app6 from '../assets/app6.jpg';
import app7 from '../assets/app7.jpg';
import app8 from '../assets/app8.jpg';

/** Add UI screens to src/assets/ui/ and register here */
export const uiDesignItems: GalleryMediaItem[] = [
    {
        id: 'between-splash',
        title: 'BETWEEN — Splash',
        caption: 'Cinematic dark UI with brand identity',
        src: app1,
        type: 'image',
    },
    {
        id: 'between-home',
        title: 'BETWEEN — Home & Mood Sync',
        caption: 'Daily connection hub with live partner status',
        src: app2,
        type: 'image',
    },
    {
        id: 'between-ai-letters',
        title: 'BETWEEN — AI Letters',
        caption: 'Gemini-powered letter drafting flow',
        src: app3,
        type: 'image',
    },
    {
        id: 'between-vault',
        title: 'BETWEEN — Private Vault',
        caption: 'Biometric-secured personal memories',
        src: app5,
        type: 'image',
    },
    {
        id: 'between-anniversary',
        title: 'BETWEEN — Anniversaries',
        caption: 'Countdowns, milestones & shared reminders',
        src: app6,
        type: 'image',
    },
    {
        id: 'between-play-hub',
        title: 'BETWEEN — Play Hub',
        caption: 'Couple games with live answer sync',
        src: app7,
        type: 'image',
    },
    {
        id: 'between-live-canvas',
        title: 'BETWEEN — Shared Story',
        caption: 'Real-time collaborative drawing canvas',
        src: app8,
        type: 'image',
    },
    {
        id: 'between-moment',
        title: 'BETWEEN — Share Moment',
        caption: 'Photo canvas with stickers & captions',
        src: app4,
        type: 'image',
    },
];
