import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    HiOutlineArrowLeft,
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

type GitHubUser = {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
};

type GitHubRepo = {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
    fork: boolean;
};

const toShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const GithubStats = ({ onBack }: { onBack: () => void }) => {
    const username = import.meta.env.VITE_GITHUB_USERNAME || 'Komalgiri';

    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);

            const [userResponse, reposResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
            ]);

            if (!userResponse.ok || !reposResponse.ok) {
                throw new Error('Could not fetch GitHub data. Check username or API rate limit.');
            }

            const [userData, repoData] = await Promise.all([
                userResponse.json() as Promise<GitHubUser>,
                reposResponse.json() as Promise<GitHubRepo[]>,
            ]);

            setUser(userData);
            setRepos(Array.isArray(repoData) ? repoData : []);
            setLastUpdated(new Date().toISOString());
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to load GitHub stats.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [username]);

    const ownRepos = useMemo(() => repos.filter((repo) => !repo.fork), [repos]);

    const totalStars = useMemo(
        () => ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        [ownRepos],
    );

    const totalForks = useMemo(
        () => ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
        [ownRepos],
    );

    const activeRepos = useMemo(() => {
        const days90Ago = Date.now() - 1000 * 60 * 60 * 24 * 90;
        return ownRepos.filter((repo) => new Date(repo.pushed_at).getTime() >= days90Ago).length;
    }, [ownRepos]);

    const topLanguages = useMemo(() => {
        const counts: Record<string, number> = {};
        ownRepos.forEach((repo) => {
            if (!repo.language) return;
            counts[repo.language] = (counts[repo.language] || 0) + 1;
        });

        const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([name, count]) => ({
                name,
                count,
                percent: total > 0 ? Math.round((count / total) * 100) : 0,
            }));
    }, [ownRepos]);

    const recentRepos = useMemo(
        () => [...ownRepos].sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at)).slice(0, 5),
        [ownRepos],
    );

    const mostStarred = useMemo(() => {
        if (ownRepos.length === 0) return null;
        return [...ownRepos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
    }, [ownRepos]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30">
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f172a]/85 py-4 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
                    >
                        <HiOutlineArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </button>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
                    >
                        <SiGithub className="text-xl" />
                        <span className="font-bold tracking-tight">@{username}</span>
                    </a>
                </div>
            </header>

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
                            className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl"
                        >
                            Real-time repository activity, language usage, and profile metrics pulled directly from the GitHub API.
                        </motion.p>
                    </div>

                    {loading && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, idx) => (
                                <div key={idx} className="h-36 animate-pulse rounded-2xl border border-white/5 bg-white/5" />
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
                                        className="mt-4 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
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
                                <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Public Repos</p>
                                        <HiOutlineFolder className="text-lg text-indigo-400" />
                                    </div>
                                    <p className="text-3xl font-black">{user.public_repos}</p>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Stars Earned</p>
                                        <HiOutlineStar className="text-lg text-amber-400" />
                                    </div>
                                    <p className="text-3xl font-black">{totalStars}</p>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Active Repos</p>
                                        <HiOutlineSparkles className="text-lg text-indigo-400" />
                                    </div>
                                    <p className="text-3xl font-black">{activeRepos}</p>
                                    <p className="mt-1 text-xs text-slate-500">Updated in last 90 days</p>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Followers</p>
                                        <HiOutlineUsers className="text-lg text-indigo-400" />
                                    </div>
                                    <p className="text-3xl font-black">{user.followers}</p>
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
                                <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-6 xl:col-span-3">
                                    <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
                                        <HiOutlineCodeBracket className="text-indigo-400" />
                                        Language Usage by Repository
                                    </h3>
                                    <div className="space-y-4">
                                        {topLanguages.length > 0 ? (
                                            topLanguages.map((lang) => (
                                                <div key={lang.name}>
                                                    <div className="mb-1.5 flex items-center justify-between text-sm">
                                                        <span className="font-semibold text-slate-300">{lang.name}</span>
                                                        <span className="font-mono text-indigo-300">{lang.count} repos</span>
                                                    </div>
                                                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
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
                                            <p className="text-sm text-slate-500">No language data available yet.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-6 xl:col-span-2">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                                        <HiOutlineStar className="text-amber-400" />
                                        Profile Snapshot
                                    </h3>
                                    <div className="mb-5 flex items-center gap-4">
                                        <img
                                            src={user.avatar_url}
                                            alt={`${user.login} avatar`}
                                            className="h-16 w-16 rounded-2xl border border-white/10"
                                        />
                                        <div>
                                            <a
                                                href={user.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-bold text-white transition-colors hover:text-indigo-300"
                                            >
                                                @{user.login}
                                            </a>
                                            <p className="text-sm text-slate-400">Joined {toShortDate(user.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                                            <span className="text-slate-400">Total Forks</span>
                                            <span className="font-bold text-white">{totalForks}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                                            <span className="text-slate-400">Following</span>
                                            <span className="font-bold text-white">{user.following}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                                            <span className="text-slate-400">Most Starred Repo</span>
                                            <span className="font-bold text-white">{mostStarred ? mostStarred.stargazers_count : 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 rounded-2xl border border-white/5 bg-[#1e293b] p-6">
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
                                            className="group rounded-2xl border border-white/5 bg-[#0f172a] p-4 transition-all hover:border-indigo-500/40"
                                        >
                                            <p className="font-bold text-white transition-colors group-hover:text-indigo-300">{repo.name}</p>
                                            <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                                                {repo.description || 'No description available.'}
                                            </p>
                                            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                                <span>{repo.language || 'Unknown'}</span>
                                                <span>Updated {toShortDate(repo.pushed_at)}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-6">
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
                                <p className="text-sm text-slate-500">
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
