import type { IconType } from 'react-icons';
import {
    HiOutlineMagnifyingGlass,
    HiOutlineRectangleStack,
    HiOutlineCodeBracket,
    HiOutlineCpuChip,
    HiOutlineRocketLaunch,
    HiOutlineLightBulb,
    HiOutlineDevicePhoneMobile,
    HiOutlinePaintBrush,
    HiOutlineBeaker,
    HiOutlineUserGroup,
    HiOutlineShieldCheck,
    HiOutlineGlobeAlt,
    HiOutlineHeart,
    HiOutlineArrowPath,
} from 'react-icons/hi2';
import {
    SiReact,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiGithub,
    SiDocker,
    SiVite,
    SiTailwindcss,
    SiFirebase,
    SiExpress,
    SiNetlify,
    SiExpo,
    SiGooglegemini,
    SiFigma,
} from 'react-icons/si';
import codpodImage from '../assets/codpod.png';
import mentoraImage from '../assets/mentora.png';
import agetechImage from '../assets/agetech.jpg';
import udyampathImage from '../assets/udyampath.png';
import aisewaImage from '../assets/aisewa.png';

export type CaseStudyStat = {
    value: string;
    unit: string;
};

export type CaseStudyTool = {
    name: string;
    Icon: IconType;
    color: string;
};

export type CaseStudyProcessStep = {
    label: string;
    Icon: IconType;
};

export type CaseStudyFeature = {
    title: string;
    description: string;
};

export type CaseStudyData = {
    title: string;
    studyLabel: string;
    overview: string;
    heroImage: string;
    problem: string[];
    solution: string[];
    durationStats: CaseStudyStat[];
    tools: CaseStudyTool[];
    processIntro: string;
    processSteps: CaseStudyProcessStep[];
    features: CaseStudyFeature[];
    links: {
        live?: string;
        github?: string;
    };
    showArchitecture?: boolean;
};

export const caseStudies: Record<string, CaseStudyData> = {
    codepod: {
        title: 'CodePodAI',
        studyLabel: 'Product Case Study',
        overview:
            'CodePodAI is an AI-driven project orchestration platform for small engineering teams. Link GitHub repos to collaborative pods, generate Gemini roadmaps, sync tasks with commits and PRs, and reward real shipping behavior.',
        heroImage: codpodImage,
        problem: [
            'Modern dev teams split planning (Notion, Jira) from execution (GitHub). Context scatters across repos, tasks, and skills profiles — especially painful for distributed pods across time zones.',
            'Commits and PRs rarely map to project progress or recognition. Teams lack a single view of who is shipping and whether the roadmap reflects reality.',
        ],
        solution: [
            'A unified pod workspace that links GitHub repos to AI-generated roadmaps, Kanban task boards, team allocation, and a gamification layer — turning live repository activity into points, badges, and pod health metrics.',
        ],
        durationStats: [
            { value: '6+', unit: 'months' },
            { value: '25+', unit: 'screens' },
        ],
        tools: [
            { name: 'React', Icon: SiReact, color: '#61DAFB' },
            { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
            { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
            { name: 'Prisma', Icon: SiPrisma, color: '#2D3748' },
            { name: 'Gemini', Icon: SiGooglegemini, color: '#8E75B2' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
            { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
            { name: 'Vite', Icon: SiVite, color: '#646CFF' },
        ],
        processIntro:
            'I designed the system around four core request flows — authentication, pod lifecycle, AI planning, and GitHub sync — before shipping the React dashboard and Express API layer.',
        processSteps: [
            { label: 'Auth Flow', Icon: HiOutlineShieldCheck },
            { label: 'Pod Lifecycle', Icon: HiOutlineRectangleStack },
            { label: 'AI Planning', Icon: HiOutlineCpuChip },
            { label: 'GitHub Sync', Icon: HiOutlineArrowPath },
            { label: 'Beta Launch', Icon: HiOutlineRocketLaunch },
        ],
        features: [
            {
                title: 'AI Roadmaps & Project Brain',
                description: 'Gemini generates strategic roadmaps, phases, and PM insights from live pod state.',
            },
            {
                title: 'GitHub-Native Pods',
                description: 'OAuth, repo linking, commit/PR tracking, and profile-based role inference.',
            },
            {
                title: 'Task Boards & Teams',
                description: 'Kanban boards, invitations, notifications, and public pod exploration.',
            },
            {
                title: 'Rewards & Pod Health',
                description: 'Points, badges, leaderboards, reliability scores, and health index.',
            },
        ],
        links: {
            live: 'https://codepod-six.vercel.app/',
            github: 'https://github.com/Komalgiri/codepods-backend',
        },
        showArchitecture: true,
    },
    udyampath: {
        title: 'UdyamPath',
        studyLabel: 'Product Case Study',
        overview:
            'UdyamPath connects students with jobs, internships, and courses — plus productivity and wellness tools — in one career growth platform with 50+ active listings.',
        heroImage: udyampathImage,
        problem: [
            'Students struggle to find relevant jobs and upskilling paths. Listings, courses, and career tools live on separate platforms with no shared context.',
            'Early-career users need filters, recommendations, and admin workflows that traditional job boards do not offer out of the box.',
        ],
        solution: [
            'A unified discovery platform with job & course search, cost-of-living tools, admin dashboards, and REST APIs designed for scale and clear role-based access.',
        ],
        durationStats: [
            { value: '4+', unit: 'months' },
            { value: '30+', unit: 'screens' },
        ],
        tools: [
            { name: 'React', Icon: SiReact, color: '#61DAFB' },
            { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
            { name: 'Express', Icon: SiExpress, color: '#000000' },
            { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
            { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
        ],
        processIntro:
            'I led frontend UX, API design, and database modeling — from user research through deployment of search, filters, and admin flows.',
        processSteps: [
            { label: 'Research', Icon: HiOutlineMagnifyingGlass },
            { label: 'Wireframes', Icon: HiOutlinePaintBrush },
            { label: 'API Design', Icon: HiOutlineCodeBracket },
            { label: 'Build & Test', Icon: HiOutlineBeaker },
            { label: 'Launch', Icon: HiOutlineRocketLaunch },
        ],
        features: [
            { title: 'Job & Course Discovery', description: 'Search, filters, and listings for students and employers.' },
            { title: 'City Budget Tool', description: 'Cost-of-living breakdown by rent, food, transport, and more.' },
            { title: 'Admin Workflows', description: 'Role-based dashboards for managing listings and users.' },
            { title: 'REST APIs', description: 'Structured backend with auth, pagination, and validation.' },
        ],
        links: {
            github: 'https://github.com/Komalgiri',
        },
    },
    mentora: {
        title: 'Mentora',
        studyLabel: 'Product Case Study',
        overview:
            'Mentora is a mental well-being hub with mood tracking, an AI chatbot companion, mentor support, and self-care resources for students and professionals.',
        heroImage: mentoraImage,
        problem: [
            'Mental health resources are fragmented, expensive, or hard to access when users need immediate support.',
            'Students lack a single place to track mood patterns, get guided help, and discover self-care content.',
        ],
        solution: [
            'An integrated web app combining AI chat support, visual mood analytics, mentor connections, and a curated wellness library — built with React and Firebase.',
        ],
        durationStats: [
            { value: '3+', unit: 'months' },
            { value: '20+', unit: 'screens' },
        ],
        tools: [
            { name: 'React', Icon: SiReact, color: '#61DAFB' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
            { name: 'Netlify', Icon: SiNetlify, color: '#00C7B7' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
            { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
        ],
        processIntro:
            'I designed and built the product experience — from empathy mapping and UI flows through Firebase integration and Netlify deployment.',
        processSteps: [
            { label: 'Empathize', Icon: HiOutlineHeart },
            { label: 'Define', Icon: HiOutlineLightBulb },
            { label: 'Design', Icon: HiOutlinePaintBrush },
            { label: 'Develop', Icon: HiOutlineCodeBracket },
            { label: 'Deploy', Icon: HiOutlineRocketLaunch },
        ],
        features: [
            { title: 'AI Chatbot', description: 'Conversational support with moderation and safe fallbacks.' },
            { title: 'Mood Tracker', description: 'Visual analytics for emotional patterns over time.' },
            { title: 'Mentor Network', description: 'Connect users with mentors and peer support.' },
            { title: 'Self-Care Library', description: 'Guides, exercises, and wellness articles.' },
        ],
        links: {
            live: 'https://mentora-gray-eight.vercel.app/',
            github: 'https://github.com/Komalgiri',
        },
    },
    'ai-sewa': {
        title: 'AI Sewa',
        studyLabel: 'Mobile Case Study',
        overview:
            'AI Sewa is a civic mobile app for Uttarakhand — real-time disaster alerts, emergency access, safety guides, and AI-powered help for rural communities.',
        heroImage: aisewaImage,
        problem: [
            'Rural communities lack timely disaster information, emergency routing, and accessible civic services — often compounded by language and connectivity barriers.',
            'Existing government tools are fragmented and not designed for mobile-first, low-literacy users in the field.',
        ],
        solution: [
            'A React Native app with disaster alert cards, map-based shelter zones, safety PDFs, and an Ask AI entry point — built for hackathon-scale impact and real civic use cases.',
        ],
        durationStats: [
            { value: '48', unit: 'hours' },
            { value: '12+', unit: 'screens' },
        ],
        tools: [
            { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
            { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
        ],
        processIntro:
            'Built during UTKARSH 1.0 — I owned mobile UI, Firebase backend hooks, and AI-assisted civic flows under tight hackathon constraints.',
        processSteps: [
            { label: 'Research', Icon: HiOutlineGlobeAlt },
            { label: 'Ideate', Icon: HiOutlineLightBulb },
            { label: 'Prototype', Icon: HiOutlineDevicePhoneMobile },
            { label: 'Build', Icon: HiOutlineCodeBracket },
            { label: 'Present', Icon: HiOutlineRocketLaunch },
        ],
        features: [
            { title: 'Disaster Alerts', description: 'Live flood and weather warnings by region and risk level.' },
            { title: 'Shelter Maps', description: 'Google Maps integration for safe zones and danger areas.' },
            { title: 'Safety Guides', description: 'Offline-ready PDFs and tips for emergencies.' },
            { title: 'Ask AI', description: 'Floating assistant for civic questions and complaints.' },
        ],
        links: {
            github: 'https://github.com/Komalgiri',
        },
    },
    'agetech-app': {
        title: 'Agetech Connect',
        studyLabel: 'Mobile Case Study',
        overview:
            'Agetech Connect matches families, care facilities, and aging-tech innovators — helping users discover trusted aging technology through a mobile-first experience.',
        heroImage: agetechImage,
        problem: [
            'Families struggle to find the right aging-tech products and care providers among scattered, hard-to-trust listings.',
            'Senior-friendly UX is often an afterthought — complex interfaces exclude the people who need these tools most.',
        ],
        solution: [
            'A React Native + Expo app with accessible UI, care matching flows, and Firebase-backed profiles — designed for clarity, trust, and mobile discovery.',
        ],
        durationStats: [
            { value: '2+', unit: 'months' },
            { value: '15+', unit: 'screens' },
        ],
        tools: [
            { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
            { name: 'Expo', Icon: SiExpo, color: '#000020' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
        ],
        processIntro:
            'I focused on accessible mobile UX, provider matching logic, and Firebase integration for profiles and discovery flows.',
        processSteps: [
            { label: 'Research', Icon: HiOutlineUserGroup },
            { label: 'Design', Icon: HiOutlinePaintBrush },
            { label: 'Prototype', Icon: HiOutlineDevicePhoneMobile },
            { label: 'Develop', Icon: HiOutlineCodeBracket },
            { label: 'Validate', Icon: HiOutlineShieldCheck },
        ],
        features: [
            { title: 'Care Matching', description: 'Connect families with facilities and innovators.' },
            { title: 'Trusted Providers', description: 'Curated listings with clear provider metadata.' },
            { title: 'Accessible UI', description: 'Large targets, high contrast, simple navigation.' },
            { title: 'Mobile-First', description: 'Expo-powered builds for iOS and Android.' },
        ],
        links: {
            github: 'https://github.com/Komalgiri',
        },
    },
};
