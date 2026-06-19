import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import PhoneMockup from '../ui/PhoneMockup';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { SiFirebase, SiReact, SiExpo } from 'react-icons/si';

const features = [
    'Profile discovery & connection cards',
    'Real-time Firebase data sync',
    'Polished light & dark mobile UI',
    'Firebase authentication & database',
];

const techStack = [
    { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
    { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
    { name: 'Expo', Icon: SiExpo, color: '#000020', invertOnDark: true },
];

const Between = () => (
    <section
        id="between"
        className="relative overflow-hidden border-y border-theme-border py-24 md:py-28 mesh-bg transition-colors duration-300"
    >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-teal-500/[0.04]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                {/* Left — copy */}
                <ScrollReveal variant="fadeLeft" className="order-1 space-y-8 lg:pr-4">
                    <div className="space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-300">
                            Featured App
                        </span>
                        <h2 className="text-5xl font-black tracking-tight text-theme-text md:text-6xl lg:text-7xl">
                            BETWEEN
                        </h2>
                        <p className="text-lg font-medium text-indigo-500 dark:text-indigo-300">
                            Connect beyond the scroll.
                        </p>
                        <p className="max-w-lg text-base leading-relaxed text-theme-muted">
                            A mobile-first social experience with a refined UI, real-time Firebase backend,
                            and flows built for discovery, profiles, and meaningful connections.
                        </p>
                    </div>

                    <motion.ul
                        className="space-y-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.08 } },
                        }}
                    >
                        {features.map((feature) => (
                            <motion.li
                                key={feature}
                                variants={{
                                    hidden: { opacity: 0, x: -12 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                                className="flex items-start gap-3 text-sm text-theme-muted"
                            >
                                <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-500" />
                                <span>{feature}</span>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <div className="flex flex-wrap gap-3">
                        {techStack.map(({ name, Icon, color, invertOnDark }) => (
                            <span
                                key={name}
                                className="inline-flex items-center gap-2 rounded-xl border border-theme-border bg-theme-surface/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-theme-text"
                            >
                                <Icon
                                    className={`text-base ${invertOnDark ? 'dark:brightness-0 dark:invert' : ''}`}
                                    style={{ color }}
                                />
                                {name}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Right — phone mockups */}
                <ScrollReveal variant="fadeRight" delay={0.15} className="order-2 w-full lg:min-h-[620px]">
                    <PhoneMockup />
                </ScrollReveal>
            </div>
        </div>
    </section>
);

export default Between;
