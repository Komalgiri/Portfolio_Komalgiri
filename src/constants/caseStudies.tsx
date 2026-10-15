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
    HiOutlineUserGroup,
    HiOutlineShieldCheck,
    HiOutlineGlobeAlt,
    HiOutlineHeart,
    HiOutlineArrowPath,
    HiOutlineChartBar,
    HiOutlineSparkles,
} from 'react-icons/hi2';
import {
    SiReact,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiGithub,
    SiDocker,
    SiVite,
    SiFirebase,
    SiExpo,
    SiGooglegemini,
    SiFigma,
} from 'react-icons/si';
import orbivaiImage from '../assets/orbivai.png';
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
    architectureId?: 'codepod' | 'udyampath' | 'mentora';
};

export const caseStudies: Record<string, CaseStudyData> = {
    codepod: {
        title: 'OrbiVAI',
        studyLabel: 'Product Case Study',
        overview:
            'From GitHub activity to AI-powered team execution. OrbiVAI is an AI-assisted collaboration platform designed to help small engineering teams plan projects, organize development work, understand team activity, and turn progress into actionable insights. It brings together project workspaces called Pods, GitHub integration, AI-generated development roadmaps, task management, team activity tracking, and developer rewards in one workspace.',
        heroImage: orbivaiImage,
        problem: [
            'Software development involves more than writing code. Teams must decide what to build, divide work, coordinate responsibilities, track progress, review contributions, and identify blockers across disconnected tools (Jira, GitHub, chat, and separate task lists).',
            'This causes fragmented workflows: disconnected planning and execution where roadmaps drift from real codebase activity, manual coordination overhead, limited visibility into team workload/blockers, unclear task ownership, generic planning, and low team engagement.',
        ],
        solution: [
            'OrbiVAI connects planning, execution, and team progress in a unified workspace. Teams create a Pod, invite collaborators, connect GitHub, generate AI-assisted roadmaps via Gemini, track tasks across pending/in-progress/done states with automated notifications, and review real-time team insights alongside gamified developer rewards.',
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
            'I designed the platform around an integrated end-to-end workflow: Pod workspace creation, GitHub activity synchronization, Gemini-powered roadmap generation, task management, and developer reward calculations.',
        processSteps: [
            { label: 'Collaborative Pods', Icon: HiOutlineRectangleStack },
            { label: 'GitHub Sync', Icon: HiOutlineArrowPath },
            { label: 'Gemini Roadmaps', Icon: HiOutlineCpuChip },
            { label: 'Task Execution', Icon: HiOutlineCodeBracket },
            { label: 'Team Insights', Icon: HiOutlineChartBar },
        ],
        features: [
            {
                title: 'Collaborative Pods & Workspaces',
                description: 'Central collaboration unit with role-based access, member invitations, join-request workflows, and GitHub repo bindings.',
            },
            {
                title: 'GitHub Integration & Sync',
                description: 'OAuth account linking, commit and repository sync via Octokit/Axios, profile role inference, and activity-to-reward tracking.',
            },
            {
                title: 'AI-Powered Gemini Roadmaps',
                description: 'Strategic plans generated from Pod state, tech stacks, and team context, cached with a 7-day TTL.',
            },
            {
                title: 'Task Management & Notifications',
                description: 'Kanban boards across pending, in-progress, and done, with automated notifications and role-based permissions.',
            },
            {
                title: 'Developer Rewards & Gamification',
                description: 'Points, badges, Pod leaderboards, and achievement views celebrating real shipping momentum.',
            },
            {
                title: 'Team Activity & Operational Insights',
                description: 'Developer reliability scores, role analysis, deadline tracking, task-rescue metrics, and execution signals.',
            },
        ],
        links: {
            live: 'https://codepod-six.vercel.app/',
            github: 'https://github.com/Komalgiri/codepods-backend',
        },
        architectureId: 'codepod',
    },
    udyampath: {
        title: 'UdyamPath',
        studyLabel: 'Team Project Case Study',
        overview:
            'UdyamPath is a team-built career platform — courses, tools, and recruiter flows by teammates. I owned the job portal: city-aware listings where salary is compared to cost of living across 9 Indian metros, plus an AI resume analysis tool for application readiness.',
        heroImage: udyampathImage,
        problem: [
            'Students applying in unfamiliar cities rarely know if a job’s salary covers rent, food, and transport — listings show packages, not purchasing power.',
            'Without quick resume feedback, candidates apply blind and miss gaps in skills, formatting, or role fit before submissions.',
        ],
        solution: [
            'I built the job portal module end-to-end: city expense lookup, affordable-job badges (salary > total_expense), filters, apply flows, and the /base budget explorer — alongside an AI resume analyzer integrated into the job sidebar.',
        ],
        durationStats: [
            { value: '4+', unit: 'months' },
            { value: '12+', unit: 'screens owned' },
        ],
        tools: [
            { name: 'React', Icon: SiReact, color: '#61DAFB' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
            { name: 'Recharts', Icon: HiOutlineChartBar, color: '#8884d8' },
            { name: 'Gemini', Icon: SiGooglegemini, color: '#8E75B2' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
            { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
        ],
        processIntro:
            'On a cross-functional team, I scoped and shipped the job portal — from city expense research and Recharts visualizations through AI resume analysis and integration with the shared React app.',
        processSteps: [
            { label: 'City Research', Icon: HiOutlineMagnifyingGlass },
            { label: 'Job Portal UX', Icon: HiOutlinePaintBrush },
            { label: 'Expense Logic', Icon: HiOutlineCodeBracket },
            { label: 'AI Resume Tool', Icon: HiOutlineCpuChip },
            { label: 'Team Ship', Icon: HiOutlineUserGroup },
        ],
        features: [
            {
                title: 'City-Aware Job Portal',
                description:
                    '/jobpage listings with type & level filters, internship tabs, and affordable-job badges when salary beats city expenses.',
            },
            {
                title: 'City Budget Explorer',
                description:
                    '/base cost-of-living page — expense category cards and monthly variation charts for 9 metros via citydata.json.',
            },
            {
                title: 'AI Resume Analysis',
                description:
                    '/resume-check tool in the job sidebar — upload a resume for AI-powered feedback on skills, gaps, and role fit.',
            },
            {
                title: 'Team Platform Context',
                description:
                    'Courses, interview prep, and recruiter tools built by teammates on the same React + Firebase codebase.',
            },
        ],
        links: {
            github: 'https://github.com/Komalgiri',
        },
        architectureId: 'udyampath',
    },
    mentora: {
        title: 'Mentora',
        studyLabel: 'Product Case Study',
        overview:
            'Mentora.AI is a mental wellness web app — five guided mentor personas, Mood Studio with 30-day charts, journaling, sleep tracking, self-care mini-tools, and XP gamification. Guest mode lets users explore without an account; moods and journals persist via Firebase when signed in.',
        heroImage: mentoraImage,
        problem: [
            'Mental health support is fragmented and often behind paywalls — students need immediate, low-friction access without committing to an account first.',
            'Tracking mood, sleep, and journal patterns in one place is rare; most tools either chat or chart, not both with a reward loop.',
        ],
        solution: [
            'A dark, mobile-first React SPA with guest + auth flows, Firestore-backed wellness data, scripted mentor chat via decision trees, and gamification that ties mood logs, meditation, and sleep into levels and insights.',
        ],
        durationStats: [
            { value: '3+', unit: 'months' },
            { value: '20+', unit: 'screens' },
        ],
        tools: [
            { name: 'React', Icon: SiReact, color: '#61DAFB' },
            { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
            { name: 'Recharts', Icon: HiOutlineChartBar, color: '#8884d8' },
            { name: 'Framer Motion', Icon: HiOutlineSparkles, color: '#a78bfa' },
            { name: 'GitHub', Icon: SiGithub, color: '#181717' },
        ],
        processIntro:
            'I designed and built the full product — landing page, app shell, AuthContext, Firestore schema, mentor chat trees, Mood Studio charts, and the gamification loop.',
        processSteps: [
            { label: 'Empathize', Icon: HiOutlineHeart },
            { label: 'Guest UX', Icon: HiOutlineUserGroup },
            { label: 'Firebase', Icon: HiOutlineShieldCheck },
            { label: 'Mood Studio', Icon: HiOutlineChartBar },
            { label: 'Ship', Icon: HiOutlineRocketLaunch },
        ],
        features: [
            {
                title: 'Mentor Chat',
                description:
                    'Five personas (Mood, Stress, Dream, Anxiety, Relationship) — nested decision tree from chatresponse.json with GIF responses.',
            },
            {
                title: 'Mood Studio',
                description:
                    'Emoji mood logs, wellness quiz, daily journal, breathing modal, and 30-day Recharts area chart with streak stats.',
            },
            {
                title: 'Self-Care & Sleep',
                description:
                    'Hub for meditation timer, sleep logging, creative prompts, and 5-4-3-2-1 grounding — Firestore or localStorage.',
            },
            {
                title: 'Gamification',
                description:
                    'XP for mood, journal, meditation, and sleep — levels, Neural Insight (sleep vs mood correlation), and profile insights.',
            },
        ],
        links: {
            live: 'https://mentora-gray-eight.vercel.app/',
            github: 'https://github.com/Komalgiri',
        },
        architectureId: 'mentora',
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

caseStudies.orbivai = caseStudies.codepod;
