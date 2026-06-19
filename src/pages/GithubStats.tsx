import { motion } from 'framer-motion';
import SubpageHeader from '../components/layout/SubpageHeader';
import {
    HiOutlineCalendarDays,
    HiOutlineCodeBracket,
    HiOutlineExclamationTriangle,
    HiOutlineFire,
    HiOutlineFolder,
    HiOutlineSparkles,
    HiOutlineStar,
    HiOutlineUsers,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import { useGithubStats, toShortDate } from '../hooks/useGithubStats';

const GithubStats = ({ onBack }: { onBack: () => void }) => {
    const {
        username,
        user,
        loading,
        error,
        lastUpdated,
        fetchStats,
        totalStars,
        totalForks,
        activeRepos,
        topLanguages,
        recentRepos,
        mostStarred,
    } = useGithubStats();

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text selection:bg-indigo-500/30 transition-colors duration-300">
            <SubpageHeader
                onBack={onBack}
                rightContent={
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-theme-muted transition-colors hover:text-theme-text"
                    >
                        <SiGithub className="text-xl" />
                        <span className="font-bold tracking-tight hidden sm:inline">@{username}</span>
                    </a>
                }
            />

            <main className="px-6 pt-32 pb-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-300"
                        >
                            <HiOutlineFire /> Live GitHub Data
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black tracking-tight md:text-7xl"
                        >
                            Technical <span className="text-indigo-400">Footprint</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="mt-6 max-w-3xl text-lg leading-relaxed text-theme-muted md:text-xl"
                        >
                            Real-time repository activity, language usage, and profile metrics pulled directly from the GitHub API.
                        </motion.p>
                    </div>

                    {loading && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, idx) => (
                                <div key={idx} className="h-36 animate-pulse rounded-2xl border border-theme-border bg-theme-surface/50" />
                            ))}
                        </div>
                    )}

                    {!loading && error && (
                        <div className="mb-10 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
                            <div className="flex items-start gap-3">
                                <HiOutlineExclamationTriangle className="mt-0.5 text-xl text-red-400" />
                                <div>
                                    <p className="font-semibold text-red-300">Unable to load Technical Footprint</p>
                                    <p className="mt-1 text-sm text-red-200/80">{error}</p>
                                    <button
                                        onClick={fetchStats}
                                        className="mt-4 rounded-lg border border-theme-border bg-theme-surface/50 px-4 py-2 text-sm font-semibold text-theme-text transition-colors hover:bg-theme-surface"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && !error && user && (
                        <>
                            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-2xl border border-theme-border bg-theme-card p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-theme-muted">Public Repos</p>
                                        <HiOutlineFolder className="text-lg text-indigo-400" />
                                    </div>
                                    <p className="text-3xl font-black">{user.public_repos}</p>
                                </div>

                                <div className="rounded-2xl border border-theme-border bg-theme-card p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-theme-muted">Stars Earned</p>
                                        <HiOutlineStar className="text-lg text-amber-400" />
                                    </div>
                                    <p className="text-3xl font-black">{totalStars}</p>
                                </div>

                                <div className="rounded-2xl border border-theme-border bg-theme-card p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-theme-muted">Active Repos</p>
                                        <HiOutlineSparkles className="text-lg text-indigo-400" />
                                    </div>
                                    <p className="text-3xl font-black">{activeRepos}</p>
                                    <p className="mt-1 text-xs text-theme-muted">Updated in last 90 days</p>
                                </div>

                                <div className="rounded-2xl border border-theme-border bg-theme-card p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-theme-muted">Followers</p>
                                        <HiOutlineUsers className="text-lg text-indigo-400" />
                                    </div>
                                    <p className="text-3xl font-black">{user.followers}</p>
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
                                <div className="rounded-2xl border border-theme-border bg-theme-card p-6 xl:col-span-3">
                                    <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
                                        <HiOutlineCodeBracket className="text-indigo-400" />
                                        Language Usage by Repository
                                    </h3>
                                    <div className="space-y-4">
                                        {topLanguages.length > 0 ? (
                                            topLanguages.map((lang) => (
                                                <div key={lang.name}>
                                                    <div className="mb-1.5 flex items-center justify-between text-sm">
                                                        <span className="font-semibold text-theme-text">{lang.name}</span>
                                                        <span className="font-mono text-indigo-300">{lang.count} repos</span>
                                                    </div>
                                                    <div className="h-2 w-full overflow-hidden rounded-full bg-theme-surface/50">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${lang.percent}%` }}
                                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                                            className="h-full rounded-full bg-indigo-500"
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-theme-muted">No language data available yet.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-theme-border bg-theme-card p-6 xl:col-span-2">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                                        <HiOutlineStar className="text-amber-400" />
                                        Profile Snapshot
                                    </h3>
                                    <div className="mb-5 flex items-center gap-4">
                                        <img
                                            src={user.avatar_url}
                                            alt={`${user.login} avatar`}
                                            className="h-16 w-16 rounded-2xl border border-theme-border"
                                        />
                                        <div>
                                            <a
                                                href={user.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-bold text-theme-text transition-colors hover:text-indigo-300"
                                            >
                                                @{user.login}
                                            </a>
                                            <p className="text-sm text-theme-muted">Joined {toShortDate(user.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between rounded-xl bg-theme-surface/50 px-4 py-3">
                                            <span className="text-theme-muted">Total Forks</span>
                                            <span className="font-bold text-theme-text">{totalForks}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl bg-theme-surface/50 px-4 py-3">
                                            <span className="text-theme-muted">Following</span>
                                            <span className="font-bold text-theme-text">{user.following}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl bg-theme-surface/50 px-4 py-3">
                                            <span className="text-theme-muted">Most Starred Repo</span>
                                            <span className="font-bold text-theme-text">{mostStarred ? mostStarred.stargazers_count : 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 rounded-2xl border border-theme-border bg-theme-card p-6">
                                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                                    <HiOutlineCalendarDays className="text-indigo-400" />
                                    Recently Updated Repositories
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {recentRepos.map((repo) => (
                                        <a
                                            key={repo.id}
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group rounded-2xl border border-theme-border bg-theme-bg p-4 transition-all hover:border-indigo-500/40"
                                        >
                                            <p className="font-bold text-theme-text transition-colors group-hover:text-indigo-300">{repo.name}</p>
                                            <p className="mt-2 line-clamp-2 text-sm text-theme-muted">
                                                {repo.description || 'No description available.'}
                                            </p>
                                            <div className="mt-4 flex items-center justify-between text-xs text-theme-muted">
                                                <span>{repo.language || 'Unknown'}</span>
                                                <span>Updated {toShortDate(repo.pushed_at)}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-theme-border bg-theme-card p-6">
                                <h3 className="mb-5 text-lg font-bold">Contribution Graph</h3>
                                <div className="overflow-x-auto">
                                    <img
                                        src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=1e293b&color=94a3b8&line=818cf8&point=cbd5e1&area=true&area_color=818cf8&hide_border=true`}
                                        alt="GitHub contribution graph"
                                        className="w-full min-w-[640px] rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-theme-muted">
                                    Last synced: {lastUpdated ? toShortDate(lastUpdated) : 'just now'}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default GithubStats;
