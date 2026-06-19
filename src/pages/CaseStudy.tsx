import { motion } from "framer-motion";
import SubpageHeader from "../components/layout/SubpageHeader";
import {
    HiOutlineCodeBracket,
    HiOutlineGlobeAlt,
    HiOutlineRocketLaunch,
    HiOutlineLightBulb,
    HiOutlineCheckCircle,
    HiOutlineChartBar
} from "react-icons/hi2";

interface CaseStudyProps {
    projectId: string;
    onBack: () => void;
}

// This will be populated from the projects constant
const projectDetails: Record<string, any> = {
    "codepod": {
        title: "Codepod",
        tagline: "Real-time Collaborative Code Editor",
        overview: "Codepod is an advanced collaborative development environment that combines real-time code editing, execution, and project management in a single platform. Built to enhance team productivity and streamline the development workflow.",
        problem: "Developers often struggle with fragmented tools for coding, collaboration, and project management. Switching between multiple platforms reduces productivity and creates communication gaps.",
        solution: "An all-in-one platform that integrates Monaco Editor for professional-grade code editing, real-time collaboration features, built-in code execution, and project roadmap tracking.",
        tech: ["Next.js", "Supabase", "Monaco Editor", "WebSockets", "Tailwind CSS", "TypeScript"],
        features: [
            {
                title: "Live Code Editor",
                description: "Monaco-powered editor with syntax highlighting, IntelliSense, and multi-language support",
                icon: <HiOutlineCodeBracket />
            },
            {
                title: "Real-time Collaboration",
                description: "Multiple users can edit code simultaneously with live cursor tracking and presence indicators",
                icon: <HiOutlineRocketLaunch />
            },
            {
                title: "Roadmap Voting",
                description: "Community-driven feature prioritization with upvoting and discussion threads",
                icon: <HiOutlineChartBar />
            },
            {
                title: "Code Execution",
                description: "Run code directly in the browser with support for 10+ programming languages",
                icon: <HiOutlineLightBulb />
            }
        ],
        challenges: [
            {
                problem: "Real-time synchronization at scale",
                solution: "Implemented operational transformation algorithms and WebSocket connection pooling to handle 100+ concurrent users"
            },
            {
                problem: "Code execution security",
                solution: "Sandboxed execution environment with resource limits and timeout controls"
            },
            {
                problem: "Editor performance with large files",
                solution: "Lazy loading, virtualization, and worker threads for syntax highlighting"
            }
        ],
        impact: {
            users: "500+",
            sessions: "2,000+",
            uptime: "99.8%",
            satisfaction: "4.7/5"
        },
        links: {
            live: "https://codepod-six.vercel.app/",
            github: "https://github.com/yourusername/codepod"
        },
        color: "from-indigo-600 via-blue-500 to-cyan-400",
        type: "Web"
    },
    "udyampath": {
        title: "UdyamPath",
        tagline: "Job & Course Discovery Platform",
        overview: "UdyamPath connects students with employment and upskilling opportunities through an intelligent matching system. The platform serves as a bridge between educational institutions, employers, and learners.",
        problem: "Students struggle to find relevant job opportunities and courses that match their skills and career goals. Traditional job boards lack personalization and context for early-career professionals.",
        solution: "A smart discovery platform with advanced filtering, personalized recommendations, and integrated course suggestions based on job requirements.",
        tech: ["React JS", "Node.js", "Express", "PostgreSQL", "REST APIs", "JWT Auth"],
        features: [
            {
                title: "Smart Job Matching",
                description: "AI-powered recommendations based on skills, interests, and career trajectory",
                icon: <HiOutlineLightBulb />
            },
            {
                title: "Course Integration",
                description: "Discover relevant courses to bridge skill gaps for desired positions",
                icon: <HiOutlineCodeBracket />
            },
            {
                title: "Advanced Filters",
                description: "Filter by location, salary, experience level, company size, and more",
                icon: <HiOutlineChartBar />
            },
            {
                title: "Admin Dashboard",
                description: "Comprehensive admin panel for managing listings, users, and analytics",
                icon: <HiOutlineRocketLaunch />
            }
        ],
        challenges: [
            {
                problem: "Handling 50+ concurrent listings efficiently",
                solution: "Implemented database indexing, query optimization, and Redis caching layer"
            },
            {
                problem: "Search performance with complex filters",
                solution: "Built custom search algorithm with debouncing and server-side pagination"
            },
            {
                problem: "User authentication and authorization",
                solution: "JWT-based auth with role-based access control (RBAC) for students, employers, and admins"
            }
        ],
        impact: {
            users: "1,200+",
            listings: "50+",
            placements: "30+",
            satisfaction: "4.5/5"
        },
        links: {
            live: "https://udyampath-demo.vercel.app",
            github: "https://github.com/yourusername/udyampath"
        },
        color: "from-blue-600 via-indigo-500 to-blue-400",
        type: "Web"
    },
    "mentora": {
        title: "Mentora",
        tagline: "Mental Well-being & Productivity Hub",
        overview: "Mentora is a comprehensive mental health and productivity platform featuring AI-powered chatbot support, mood tracking, and self-care resources. Designed to support students and professionals in managing stress and maintaining work-life balance.",
        problem: "Mental health resources are often fragmented, expensive, or inaccessible. Students need immediate support and tools to track their emotional well-being.",
        solution: "An integrated platform combining AI chatbot therapy, mood tracking analytics, mentor connections, and curated self-care resources.",
        tech: ["React Native", "React JS", "Firebase", "OpenAI API", "Netlify", "Chart.js"],
        features: [
            {
                title: "AI Chatbot Companion",
                description: "24/7 conversational AI trained on CBT principles for immediate emotional support",
                icon: <HiOutlineLightBulb />
            },
            {
                title: "Mood Tracker",
                description: "Visual analytics and insights into emotional patterns over time",
                icon: <HiOutlineChartBar />
            },
            {
                title: "Mentor Network",
                description: "Connect with verified mental health professionals and peer mentors",
                icon: <HiOutlineRocketLaunch />
            },
            {
                title: "Self-Care Library",
                description: "Curated meditation guides, breathing exercises, and wellness articles",
                icon: <HiOutlineCheckCircle />
            }
        ],
        challenges: [
            {
                problem: "AI chatbot accuracy and safety",
                solution: "Implemented content moderation, crisis detection, and fallback to human support"
            },
            {
                problem: "User privacy and data security",
                solution: "End-to-end encryption for conversations, HIPAA-compliant data storage"
            },
            {
                problem: "Cross-platform consistency",
                solution: "Shared component library between React Native (mobile) and React JS (web)"
            }
        ],
        impact: {
            users: "800+",
            sessions: "5,000+",
            avgMoodImprovement: "+23%",
            satisfaction: "4.8/5"
        },
        links: {
            live: "https://mentora-gray-eight.vercel.app/",
            github: "https://github.com/yourusername/mentora"
        },
        color: "from-emerald-600 via-teal-500 to-green-400",
        type: "Web"
    },
    "ai-sewa": {
        title: "AI Sewa",
        tagline: "AI-Powered Civic Services Platform",
        overview: "Winner of state-level hackathon UTKARSH 1.0, AI Sewa addresses critical civic challenges through technology. The app provides real-time disaster alerts, emergency medical access, and agricultural support to rural communities.",
        problem: "Rural communities lack timely access to emergency services, disaster information, and agricultural guidance. Language barriers and low digital literacy compound these challenges.",
        solution: "A mobile-first platform with voice-based AI assistance, multilingual support, and offline-first architecture for areas with poor connectivity.",
        tech: ["React Native", "Firebase", "Google Cloud AI", "TensorFlow Lite", "Maps API"],
        features: [
            {
                title: "Disaster Alert System",
                description: "Real-time notifications for floods, earthquakes, and weather emergencies with evacuation routes",
                icon: <HiOutlineRocketLaunch />
            },
            {
                title: "AI Complaint Filing",
                description: "Voice-based complaint registration in local languages with automatic categorization",
                icon: <HiOutlineLightBulb />
            },
            {
                title: "Emergency Medical Access",
                description: "One-tap ambulance booking with live tracking and hospital availability",
                icon: <HiOutlineCheckCircle />
            },
            {
                title: "Agricultural Tools",
                description: "Crop disease detection via image recognition and weather-based farming tips",
                icon: <HiOutlineChartBar />
            }
        ],
        challenges: [
            {
                problem: "Offline functionality in remote areas",
                solution: "Implemented local database sync with background queue for delayed uploads"
            },
            {
                problem: "Voice recognition for regional languages",
                solution: "Fine-tuned Google Speech API models with local dialect datasets"
            },
            {
                problem: "Low-end device performance",
                solution: "Optimized app size to 15MB, lazy loading, and TensorFlow Lite for on-device ML"
            }
        ],
        impact: {
            users: "2,000+",
            complaints: "150+",
            emergencies: "40+",
            award: "2nd Prize @ UTKARSH 1.0"
        },
        links: {
            live: "https://ai-sewa-demo.app",
            github: "https://github.com/yourusername/ai-sewa"
        },
        color: "from-purple-600 via-violet-500 to-fuchsia-400",
        type: "Mobile App"
    },
    "agetech-app": {
        title: "AgeTech App",
        tagline: "Health & Connectivity for Seniors",
        overview: "AgeTech is a specialized mobile application designed for elderly users, featuring large UI elements, voice commands, medication reminders, and emergency SOS functionality. Built with accessibility and simplicity as core principles.",
        problem: "Elderly users struggle with complex smartphone interfaces. Existing health apps lack senior-friendly design and critical features like emergency alerts.",
        solution: "A simplified, voice-first mobile app with large touch targets, high contrast UI, and essential health management features.",
        tech: ["React Native", "Firebase", "Expo", "Native APIs", "Twilio", "AsyncStorage"],
        features: [
            {
                title: "Emergency SOS",
                description: "One-button emergency alert to pre-configured contacts with GPS location",
                icon: <HiOutlineRocketLaunch />
            },
            {
                title: "Medication Reminders",
                description: "Voice and visual notifications with dosage tracking and refill alerts",
                icon: <HiOutlineCheckCircle />
            },
            {
                title: "Simplified Communication",
                description: "Large contact cards with one-tap calling and video chat",
                icon: <HiOutlineLightBulb />
            },
            {
                title: "Health Monitoring",
                description: "Track vitals, appointments, and share reports with family members",
                icon: <HiOutlineChartBar />
            }
        ],
        challenges: [
            {
                problem: "Accessibility for users with limited vision",
                solution: "High contrast mode, text-to-speech for all UI elements, minimum 18pt font"
            },
            {
                problem: "Emergency contact reliability",
                solution: "Multi-channel alerts (SMS, call, push) with automatic escalation if unacknowledged"
            },
            {
                problem: "User onboarding complexity",
                solution: "Family-assisted setup mode with QR code pairing and remote configuration"
            }
        ],
        impact: {
            users: "300+",
            emergencies: "12+",
            avgAge: "68 years",
            satisfaction: "4.9/5"
        },
        links: {
            live: "https://agetech-demo.app",
            github: "https://github.com/yourusername/agetech"
        },
        color: "from-rose-600 via-pink-500 to-red-400",
        type: "Mobile App"
    }
};

const CaseStudy = ({ projectId, onBack }: CaseStudyProps) => {
    const project = projectDetails[projectId];

    if (!project) {
        return (
            <div className="min-h-screen bg-theme-bg text-theme-text flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <button onClick={onBack} className="text-indigo-400 hover:underline">
                        ← Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text selection:bg-indigo-500/30 transition-colors duration-300">
            <SubpageHeader
                backLabel="Back to Projects"
                onBack={onBack}
                rightContent={
                    <div className="flex items-center gap-4">
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-theme-surface/50 hover:bg-theme-surface transition-colors"
                            >
                                <HiOutlineCodeBracket className="text-xl" />
                            </a>
                        )}
                        {project.links.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors font-bold text-sm flex items-center gap-2 text-white"
                            >
                                <HiOutlineGlobeAlt />
                                View Live
                            </a>
                        )}
                    </div>
                }
            />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${project.color} bg-opacity-20 border border-theme-border text-xs font-bold uppercase tracking-widest mb-6`}>
                            {project.type}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-theme-text via-theme-text to-theme-muted bg-clip-text text-transparent">
                            {project.title}
                        </h1>
                        <p className="text-2xl text-indigo-400 font-light mb-8">
                            {project.tagline}
                        </p>
                        <p className="text-theme-muted text-lg leading-relaxed max-w-3xl">
                            {project.overview}
                        </p>
                    </motion.div>

                    {/* Problem & Solution */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20"
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-red-400">⚠️</span> The Problem
                            </h3>
                            <p className="text-theme-muted leading-relaxed">
                                {project.problem}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20"
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-emerald-400">✓</span> The Solution
                            </h3>
                            <p className="text-theme-muted leading-relaxed">
                                {project.solution}
                            </p>
                        </motion.div>
                    </div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                            <HiOutlineCodeBracket className="text-indigo-400" />
                            Tech Stack
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech: string) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-lg bg-theme-surface/50 border border-theme-border text-sm font-bold text-theme-text hover:bg-white/10 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Key Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                            <HiOutlineRocketLaunch className="text-indigo-400" />
                            Key Features
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {project.features.map((feature: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 rounded-2xl bg-theme-surface/50 border border-theme-border hover:border-indigo-500/30 transition-all group"
                                >
                                    <div className="text-3xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                    <p className="text-theme-muted text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Challenges & Solutions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                            <HiOutlineLightBulb className="text-indigo-400" />
                            Challenges & Solutions
                        </h2>
                        <div className="space-y-6">
                            {project.challenges.map((item: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 rounded-2xl bg-theme-surface/50 border border-theme-border"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold mb-2 text-amber-400">Challenge:</h4>
                                            <p className="text-theme-muted mb-3">{item.problem}</p>
                                            <h4 className="font-bold mb-2 text-emerald-400">Solution:</h4>
                                            <p className="text-theme-text">{item.solution}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Impact Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                            <HiOutlineChartBar className="text-indigo-400" />
                            Impact & Results
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Object.entries(project.impact).map(([key, value]) => (
                                <div key={key} className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-theme-border text-center">
                                    <div className="text-4xl font-black text-white mb-2">{String(value)}</div>
                                    <div className="text-xs uppercase tracking-widest text-theme-muted font-bold">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center p-12 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-theme-border"
                    >
                        <h3 className="text-2xl font-bold mb-4">Interested in this project?</h3>
                        <p className="text-theme-muted mb-8 max-w-2xl mx-auto">
                            Explore the live demo or dive into the source code to see how it works.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            {project.links.live && (
                                <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors font-bold flex items-center gap-2"
                                >
                                    <HiOutlineGlobeAlt />
                                    View Live Demo
                                </a>
                            )}
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-xl bg-theme-surface/50 border border-theme-border hover:bg-theme-surface transition-colors font-bold flex items-center gap-2"
                                >
                                    <HiOutlineCodeBracket />
                                    View Source Code
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default CaseStudy;
