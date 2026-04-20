import {
    HiOutlineBuildingOffice2,
    HiOutlineShieldCheck,
    HiOutlineSparkles,
    HiOutlineCodeBracket,
    HiOutlineDevicePhoneMobile
} from "react-icons/hi2";

export const projects = [
    {
        id: "codepod",
        title: "Codepod",
        type: "Web",
        description: "An advanced real-time collaborative code editor and execution environment with built-in project management and roadmap tracking.",
        tech: ["Next.js", "Supabase", "Monaco Editor", "Tailwind"],
        color: "from-indigo-600 via-blue-500 to-cyan-400",
        icon: <HiOutlineCodeBracket className="text-indigo-400" />,
        features: ["Live Code Editor", "Roadmap Voting", "Community Forums"]
    },
    {
        id: "udyampath",
        title: "UdyamPath",
        type: "Web",
        description: "A scalable job and course discovery platform designed to connect students with employment and upskilling opportunities, supporting 50+ active listings.",
        tech: ["React JS", "Node.js", "REST APIs", "Database Management", "GitHub"],
        color: "from-blue-600 via-indigo-500 to-blue-400",
        icon: <HiOutlineBuildingOffice2 className="text-blue-400" />,
        features: ["Job & Course Discovery", "Search & Filters", "Admin Workflows"]
    },
    {
        id: "mentora",
        title: "Mentora",
        type: "Web",
        description: "A mental well-being and productivity hub featuring mentor support, an interactive AI chatbot, and sophisticated mood tracking ecosystems.",
        tech: ["React Native", "React JS", "Firebase", "Netlify", "GitHub"],
        color: "from-emerald-600 via-teal-500 to-green-400",
        icon: <HiOutlineSparkles className="text-emerald-400" />,
        features: ["Mood Tracker", "AI Chatbot", "Self-Care Resources"]
    },
    {
        id: "ai-sewa",
        title: "AI Sewa",
        type: "Mobile App",
        description: "State-level hackathon winning AI application addressing civic challenges through real-time disaster alerts, emergency medical access, and agricultural support.",
        tech: ["React Native", "APIs", "Firebase", "AI Services", "GitHub"],
        color: "from-purple-600 via-violet-500 to-fuchsia-400",
        icon: <HiOutlineShieldCheck className="text-purple-400" />,
        features: ["Disaster Alerts", "AI Complaint Filing", "Agricultural Tools"]
    },
    {
        id: "agetech-app",
        title: "AgeTech App",
        type: "Mobile App",
        description: "A specialized health and connectivity platform for the elderly, featuring medication reminders, emergency SOS, and simplified digital communication.",
        tech: ["React Native", "Firebase", "Expo", "Native APIs"],
        color: "from-rose-600 via-pink-500 to-red-400",
        icon: <HiOutlineDevicePhoneMobile className="text-rose-400" />,
        features: ["Emergency SOS", "Meds Reminder", "Simplified UI"]
    },
];
