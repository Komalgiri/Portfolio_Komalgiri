import { motion } from "framer-motion";
import {
    HiOutlineTrophy,
    HiOutlineUserGroup,
    HiOutlineAcademicCap,
    HiOutlineStar
} from "react-icons/hi2";

const achievements = [
    {
        title: "2nd Prize @ UTKARSH 1.0",
        organization: "State-Level Hackathon",
        description: "Awarded for developing an AI-powered public service mobile application in a competitive field of 50+ technical teams.",
        icon: <HiOutlineTrophy />,
        color: "from-amber-400 to-orange-500",
        tag: "Award"
    },
    {
        title: "Campus Representative",
        organization: "TechLearn",
        description: "Successfully increased campus event participation by 25% through strategic student engagement and community building initiatives.",
        icon: <HiOutlineUserGroup />,
        color: "from-blue-400 to-indigo-500",
        tag: "Leadership"
    },
    {
        title: "Workshop Coordinator",
        organization: "IIT Roorkee",
        description: "Coordinated 5+ specialized technical workshops at the Design Innovation Center (DIC), bridging the gap between theory and practice.",
        icon: <HiOutlineAcademicCap />,
        color: "from-purple-400 to-pink-500",
        tag: "Management"
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="py-20 md:py-24 bg-[#0f172a] relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                            Milestones & <br />
                            <span className="text-indigo-400">Achievements</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-indigo-500 rounded-full" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-400 max-w-md text-lg font-light leading-relaxed"
                    >
                        Recognitions and contributions that define my proactive approach to technology and leadership.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            {/* Card Background accent */}
                            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 rounded-3xl transition-all duration-500" />

                            <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 rounded-2xl bg-white/10 text-white text-3xl shadow-lg">
                                        {item.icon}
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        {item.tag}
                                    </span>
                                </div>

                                <div className="space-y-4 flex-grow">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-slate-300 transition-all duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-indigo-400 font-bold text-sm uppercase tracking-wider">
                                        {item.organization}
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <HiOutlineStar className="text-amber-400" />
                                    <span>Achievement Unlocked</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
