import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import PhoneMockup from '../ui/PhoneMockup';
import {
    HiOutlineArrowRight,
    HiOutlineHeart,
    HiOutlineSparkles,
    HiOutlinePhoto,
    HiOutlinePuzzlePiece,
} from 'react-icons/hi2';
import { SiFirebase, SiReact, SiExpo, SiGooglegemini } from 'react-icons/si';
import { US_REMOTE_LABEL } from '../../constants/site';
import betweenLogo from '../../assets/logo_between.png';
import app1 from '../../assets/app1.jpg';
import app2 from '../../assets/app2.jpg';
import app3 from '../../assets/app3.jpg';
import app4 from '../../assets/app4.png';
import app5 from '../../assets/app5.jpg';
import app6 from '../../assets/app6.jpg';
import app7 from '../../assets/app7.jpg';
import app8 from '../../assets/app8.jpg';

const rightScreens = [app1, app2, app3, app4];
const leftScreens = [app5, app6, app7, app8];

const featureCards = [
    {
        icon: HiOutlineHeart,
        title: 'Mood Sync',
        hook: 'Status + 7-day history',
        accent: 'text-rose-400',
    },
    {
        icon: HiOutlinePhoto,
        title: 'Share Moment',
        hook: 'Draw, sticker & caption',
        accent: 'text-violet-400',
    },
    {
        icon: HiOutlinePuzzlePiece,
        title: 'Play Hub',
        hook: 'Daily Q · NHIE · WYR',
        accent: 'text-indigo-400',
    },
    {
        icon: HiOutlineSparkles,
        title: 'AI Letters',
        hook: 'Gemini love notes',
        accent: 'text-amber-400',
    },
];

const techStack = [
    { Icon: SiReact, color: '#61DAFB', label: 'React Native' },
    { Icon: SiExpo, color: '#000020', invertOnDark: true, label: 'Expo' },
    { Icon: SiFirebase, color: '#FFCA28', label: 'Firebase' },
    { Icon: SiGooglegemini, color: '#8E75B2', label: 'Gemini' },
];

const buildStack = ['React Native', 'Firebase', 'Gemini AI', 'Biometrics', 'Offline-first'];

const FreelanceCta = ({ id, className = '' }: { id?: string; className?: string }) => (
    <div
        id={id}
        className={`rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 ${className}`}
    >
        <p className="text-base font-bold leading-snug text-theme-text md:text-lg">
            Have an app idea? I design & ship polished mobile experiences like this.
        </p>
        <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700"
        >
            Let&apos;s build yours
            <HiOutlineArrowRight className="text-lg" />
        </a>
        <p className="mt-2 text-xs text-theme-muted">{US_REMOTE_LABEL}</p>
    </div>
);

const Between = () => (
    <section
        id="between"
        className="relative overflow-hidden border-y border-theme-border bg-theme-bg py-20 md:py-24"
    >
        <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,28rem)_1fr] xl:gap-14">
                <ScrollReveal variant="fadeLeft" className="space-y-8">
                    <div className="flex items-center gap-3">
                        {techStack.map(({ Icon, color, invertOnDark, label }) => (
                            <span
                                key={label}
                                title={label}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-border bg-theme-surface/50"
                            >
                                <Icon
                                    className={`text-base ${invertOnDark ? 'dark:brightness-0 dark:invert' : ''}`}
                                    style={{ color }}
                                />
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <img
                            src={betweenLogo}
                            alt="BETWEEN"
                            width={56}
                            height={56}
                            className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-theme-border"
                        />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-violet-400">
                                Signature Build · Open to work
                            </p>
                            <h2 className="text-4xl font-black tracking-tight text-theme-text md:text-5xl">
                                BETWEEN
                            </h2>
                            <p className="mt-0.5 text-sm font-medium text-theme-muted">Intimacy OS for couples</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-theme-border bg-theme-card/50">
                        <div className="border-b border-theme-border px-4 py-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
                                What it does
                            </p>
                            <p className="mt-2 text-base font-semibold leading-snug text-theme-text">
                                Pair once. Share moods, moments, letters & games — offline or live.
                            </p>
                        </div>
                        <div className="border-b border-theme-border px-4 py-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
                                What I built
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-theme-muted">
                                Full-stack solo build — UI, Firebase sync, Gemini AI, biometrics & offline-first
                                architecture.
                            </p>
                        </div>
                        <div className="px-4 py-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
                                Stack
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {buildStack.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-md border border-theme-border bg-theme-surface/60 px-2.5 py-1 text-[11px] font-semibold text-theme-text"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <FreelanceCta id="work-with-me" />
                </ScrollReveal>

                <ScrollReveal variant="fadeRight" delay={0.1} className="space-y-6">
                    <PhoneMockup
                        leftScreenshots={leftScreens}
                        rightScreenshots={rightScreens}
                        leftScreenshotAlt="BETWEEN app screens"
                        rightScreenshotAlt="BETWEEN app screens"
                    />

                    <motion.div
                        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.06 } },
                        }}
                    >
                        {featureCards.map(({ icon: Icon, title, hook, accent }) => (
                            <motion.div
                                key={title}
                                variants={{
                                    hidden: { opacity: 0, y: 12 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="rounded-xl border border-theme-border bg-theme-card p-3 shadow-sm"
                            >
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-2.5">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-theme-surface/80">
                                        <Icon className={`text-lg ${accent}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-snug text-theme-text">{title}</p>
                                        <p className="mt-0.5 text-[11px] leading-snug text-theme-muted">{hook}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <p className="text-center text-xs text-theme-muted lg:text-left">
                        From idea to App Store-ready — I handle design, build & integration.
                    </p>
                </ScrollReveal>
            </div>
        </div>
    </section>
);

export default Between;
