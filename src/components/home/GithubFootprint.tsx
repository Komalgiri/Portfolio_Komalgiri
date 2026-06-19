import {
    HiOutlineArrowRight,
    HiOutlineCodeBracket,
    HiOutlineFolder,
    HiOutlineSparkles,
    HiOutlineStar,
    HiOutlineUsers,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import { useGithubStats } from '../../hooks/useGithubStats';

const statItems = (
    publicRepos: number,
    totalStars: number,
    activeRepos: number,
    followers: number,
) => [
    { label: 'Repos', value: publicRepos, icon: HiOutlineFolder },
    { label: 'Stars', value: totalStars, icon: HiOutlineStar },
    { label: 'Active', value: activeRepos, icon: HiOutlineSparkles, hint: '90d' },
    { label: 'Followers', value: followers, icon: HiOutlineUsers },
];

const GithubFootprint = () => {
    const { username, user, loading, error, totalStars, activeRepos, topLanguages } = useGithubStats();

    if (error) return null;

    return (
        <section id="github-footprint" className="border-t border-theme-border bg-theme-bg py-10 md:py-12">
            <div className="mx-auto max-w-7xl px-6">
                <div className="rounded-2xl border border-theme-border bg-theme-card/60 p-5 backdrop-blur-sm md:p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        {/* Label */}
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-theme-border bg-theme-surface/50 text-theme-text">
                                <SiGithub className="text-lg" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-theme-muted">
                                    GitHub Snapshot
                                </p>
                                <p className="mt-0.5 text-sm text-theme-text">
                                    Live stats · @{username}
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        {loading ? (
                            <div className="flex flex-wrap gap-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[52px] w-[88px] animate-pulse rounded-xl bg-theme-surface/50"
                                    />
                                ))}
                            </div>
                        ) : user ? (
                            <div className="flex flex-wrap gap-2.5 sm:gap-3">
                                {statItems(user.public_repos, totalStars, activeRepos, user.followers).map(
                                    ({ label, value, icon: Icon, hint }) => (
                                        <div
                                            key={label}
                                            className="flex min-w-[80px] items-center gap-2.5 rounded-xl border border-theme-border bg-theme-bg/80 px-3.5 py-2.5"
                                        >
                                            <Icon className="shrink-0 text-base text-indigo-400" />
                                            <div>
                                                <p className="text-base font-bold leading-none text-theme-text">
                                                    {value}
                                                    {hint && (
                                                        <span className="ml-1 text-[10px] font-normal text-theme-muted">
                                                            {hint}
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-theme-muted">
                                                    {label}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : null}

                        {/* Languages + CTA */}
                        {!loading && user && (
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 lg:flex-col lg:items-end xl:flex-row xl:items-center">
                                {topLanguages.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <HiOutlineCodeBracket className="hidden shrink-0 text-sm text-theme-muted sm:block" />
                                        {topLanguages.slice(0, 3).map((lang) => (
                                            <span
                                                key={lang.name}
                                                className="rounded-lg border border-theme-border bg-theme-surface/40 px-2.5 py-1 text-xs font-medium text-theme-muted"
                                            >
                                                {lang.name}
                                                <span className="ml-1 text-indigo-400">{lang.count}</span>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <button
                                    onClick={() => {
                                        window.location.hash = '#github-stats';
                                    }}
                                    className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-sm font-semibold text-indigo-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/15 hover:text-indigo-300"
                                >
                                    View Footprint
                                    <HiOutlineArrowRight className="text-base transition-transform group-hover:translate-x-0.5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubFootprint;
