import {
    HiOutlineBuildingOffice2,
    HiOutlineShieldCheck,
    HiOutlineSparkles,
    HiOutlineCodeBracket,
    HiOutlineDevicePhoneMobile
} from "react-icons/hi2";
import codpodImage from "../assets/codpod.png";
import mentoraImage from "../assets/mentora.png";
import agetechImage from "../assets/agetech.jpg";
import udyampathImage from "../assets/udyampath.png";
import aisewaImage from "../assets/aisewa.png";

export const projects = [
    {
        id: "codepod",
        title: "CodePodAI",
        type: "Web",
        description: "AI-driven project orchestration for dev teams — GitHub-linked pods, Gemini roadmaps, task boards, and contribution rewards in one platform.",
        tech: ["React", "Node.js", "PostgreSQL", "Gemini AI", "GitHub OAuth"],
        color: "from-indigo-600 via-blue-500 to-cyan-400",
        icon: <HiOutlineCodeBracket className="text-indigo-400" />,
        features: ["AI Roadmaps", "GitHub Sync", "Pod Workspaces", "Rewards & Leaderboards"],
        image: codpodImage,
        liveUrl: "https://codepod-six.vercel.app/"
    },
    {
        id: "udyampath",
        title: "UdyamPath",
        type: "Web",
        description: "Team web platform — I built the job portal with city expense recommendations and AI resume analysis.",
        tech: ["React", "Firebase", "Recharts", "Gemini AI"],
        color: "from-blue-600 via-indigo-500 to-blue-400",
        icon: <HiOutlineBuildingOffice2 className="text-blue-400" />,
        features: ["City Expense Jobs", "AI Resume Analysis", "Job Filters & Apply"],
        image: udyampathImage
    },
    {
        id: "mentora",
        title: "Mentora",
        type: "Web",
        description: "Mental wellness SPA — mentor chat, mood tracking, journaling, sleep logs, and XP gamification with Firebase.",
        tech: ["React", "Firebase", "Firestore", "Recharts", "Framer Motion"],
        color: "from-emerald-600 via-teal-500 to-green-400",
        icon: <HiOutlineSparkles className="text-emerald-400" />,
        features: ["Mentor Chat", "Mood Studio", "Gamification", "Guest Mode"],
        image: mentoraImage,
        liveUrl: "https://mentora-gray-eight.vercel.app/"
    },
    {
        id: "ai-sewa",
        title: "AI Sewa",
        type: "Mobile App",
        description: "State-level hackathon winning AI application addressing civic challenges through real-time disaster alerts, emergency medical access, and agricultural support.",
        tech: ["React Native", "APIs", "Firebase", "AI Services", "GitHub"],
        color: "from-purple-600 via-violet-500 to-fuchsia-400",
        icon: <HiOutlineShieldCheck className="text-purple-400" />,
        features: ["Disaster Alerts", "AI Complaint Filing", "Agricultural Tools"],
        image: aisewaImage
    },
    {
        id: "agetech-app",
        title: "Agetech Connect",
        type: "Mobile App",
        description: "A matching platform connecting families, care facilities, and aging-tech innovators to discover the right aging technology faster.",
        tech: ["React Native", "Firebase", "Expo", "Native APIs"],
        color: "from-rose-600 via-pink-500 to-red-400",
        icon: <HiOutlineDevicePhoneMobile className="text-rose-400" />,
        features: ["Care Matching", "Trusted Providers", "Mobile-First UX"],
        image: agetechImage
    },
];
