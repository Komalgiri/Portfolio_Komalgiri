import { useEffect, useMemo, useState } from 'react';

export type GitHubUser = {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
};

export type GitHubRepo = {
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

export const toShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const useGithubStats = () => {
    const username = import.meta.env.VITE_GITHUB_USERNAME || 'Komalgiri';

    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState('');

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

    return {
        username,
        user,
        repos,
        loading,
        error,
        lastUpdated,
        fetchStats,
        ownRepos,
        totalStars,
        totalForks,
        activeRepos,
        topLanguages,
        recentRepos,
        mostStarred,
    };
};
