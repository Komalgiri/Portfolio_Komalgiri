export type ArchNodeKind = 'client' | 'api' | 'database' | 'auth' | 'external' | 'data' | 'ai';

export type ArchIconKey =
    | 'cloud'
    | 'server'
    | 'database'
    | 'shield'
    | 'github'
    | 'sparkles'
    | 'fire'
    | 'document'
    | 'magnifier'
    | 'chat'
    | 'chart'
    | 'users';

export type ArchSystemNode = {
    id: string;
    label: string;
    sublabel: string;
    kind: ArchNodeKind;
    icon: ArchIconKey;
    layer: number;
    connectsTo?: string[];
    details?: string[];
};

export type ArchCompleteEdge = {
    from: string;
    to: string;
    label?: string;
};

export type ArchCompleteLayer = {
    id: string;
    title: string;
    nodes: ArchSystemNode[];
};

export type ArchCompleteDiagram = {
    title: string;
    description: string;
    layers: ArchCompleteLayer[];
    edges: ArchCompleteEdge[];
};

export type ArchEndpoint = {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    path: string;
    label: string;
};

export type ArchEntity = {
    name: string;
    fields: string[];
    links?: string[];
};

export type ArchPipeline = {
    id: string;
    title: string;
    accent: string;
    steps: { icon: ArchIconKey; label: string }[];
};

export type ProjectArchitectureVisual = {
    backendSkills: string[];
    completeDiagram: ArchCompleteDiagram;
    systemNodes: ArchSystemNode[];
    endpoints: ArchEndpoint[];
    entities: ArchEntity[];
    pipelines: ArchPipeline[];
};

export const projectArchitectureVisuals: Record<
    'codepod' | 'udyampath' | 'mentora',
    ProjectArchitectureVisual
> = {
    codepod: {
        backendSkills: ['REST API design', 'JWT + OAuth', 'Prisma ORM', 'PostgreSQL', 'Webhooks'],
        completeDiagram: {
            title: 'CodePodAI — full stack',
            description: 'React SPA → Express API → PostgreSQL with GitHub OAuth and Gemini AI integrations.',
            layers: [
                {
                    id: 'presentation',
                    title: 'Presentation',
                    nodes: [
                        {
                            id: 'client',
                            label: 'React 18 Client',
                            sublabel: 'Vite · TypeScript',
                            kind: 'client',
                            icon: 'cloud',
                            layer: 0,
                            details: ['Dashboard · Pods · Tasks', 'authService · podService'],
                        },
                    ],
                },
                {
                    id: 'application',
                    title: 'Application',
                    nodes: [
                        {
                            id: 'github',
                            label: 'GitHub API',
                            sublabel: 'OAuth 2.0',
                            kind: 'external',
                            icon: 'github',
                            layer: 1,
                            details: ['Repos · commits · PRs'],
                        },
                        {
                            id: 'api',
                            label: 'Express 5 API',
                            sublabel: 'REST + JWT middleware',
                            kind: 'api',
                            icon: 'server',
                            layer: 1,
                            details: ['/users · /pods · /tasks', '/github · /ai · /rewards'],
                        },
                        {
                            id: 'gemini',
                            label: 'Gemini AI',
                            sublabel: 'Google AI API',
                            kind: 'ai',
                            icon: 'sparkles',
                            layer: 1,
                            details: ['Roadmaps · task brain', '7-day cache TTL'],
                        },
                    ],
                },
                {
                    id: 'data',
                    title: 'Data',
                    nodes: [
                        {
                            id: 'db',
                            label: 'PostgreSQL',
                            sublabel: 'Prisma ORM',
                            kind: 'database',
                            icon: 'database',
                            layer: 2,
                            details: ['User · Pod · Task', 'Activity · Reward'],
                        },
                    ],
                },
            ],
            edges: [
                { from: 'client', to: 'api', label: 'REST · Bearer JWT' },
                { from: 'api', to: 'db', label: 'Prisma queries' },
                { from: 'api', to: 'github', label: 'OAuth + sync' },
                { from: 'api', to: 'gemini', label: 'AI planning' },
            ],
        },
        systemNodes: [
            { id: 'client', label: 'React Client', sublabel: 'Vite · TypeScript', kind: 'client', icon: 'cloud', layer: 0, connectsTo: ['api'] },
            { id: 'api', label: 'Express 5 API', sublabel: 'Helmet · CORS · Rate limit', kind: 'api', icon: 'server', layer: 1, connectsTo: ['db', 'github', 'gemini'] },
            { id: 'db', label: 'PostgreSQL', sublabel: 'Prisma ORM', kind: 'database', icon: 'database', layer: 2 },
            { id: 'github', label: 'GitHub API', sublabel: 'Repos · commits · PRs', kind: 'external', icon: 'github', layer: 1 },
            { id: 'gemini', label: 'Gemini AI', sublabel: 'Roadmaps · task brain', kind: 'ai', icon: 'sparkles', layer: 1 },
        ],
        endpoints: [
            { method: 'POST', path: '/api/users/login', label: 'Issue JWT' },
            { method: 'GET', path: '/api/auth/github/login', label: 'OAuth redirect' },
            { method: 'POST', path: '/api/pods', label: 'Create pod + member' },
            { method: 'GET', path: '/api/pods/:id', label: 'Pod detail + tasks' },
            { method: 'GET', path: '/api/ai/pods/:id/plan', label: 'Gemini roadmap cache' },
            { method: 'POST', path: '/api/github/sync', label: 'Activity → rewards' },
        ],
        entities: [
            { name: 'User', fields: ['email', 'githubToken', 'reliability'], links: ['PodMember', 'Reward'] },
            { name: 'Pod', fields: ['repoOwner', 'aiRoadmap', 'projectBrain'], links: ['Task', 'Activity'] },
            { name: 'Task', fields: ['status', 'assignee', 'podId'], links: ['Pod'] },
            { name: 'Activity', fields: ['type', 'metadata', 'podId'], links: ['Pod', 'Reward'] },
        ],
        pipelines: [
            {
                id: 'auth',
                title: 'JWT + GitHub OAuth',
                accent: '#6366f1',
                steps: [
                    { icon: 'cloud', label: 'Login request' },
                    { icon: 'shield', label: 'bcrypt + JWT' },
                    { icon: 'github', label: 'OAuth callback' },
                    { icon: 'database', label: 'User upsert' },
                ],
            },
            {
                id: 'sync',
                title: 'GitHub → Rewards',
                accent: '#22d3ee',
                steps: [
                    { icon: 'github', label: 'Fetch commits/PRs' },
                    { icon: 'server', label: 'Store Activity' },
                    { icon: 'chart', label: 'Points + badges' },
                    { icon: 'users', label: 'Leaderboard' },
                ],
            },
        ],
    },
    udyampath: {
        backendSkills: ['Data modeling', 'Search/filter logic', 'Firebase Auth', 'AI integration', 'REST design'],
        completeDiagram: {
            title: 'UdyamPath — job portal module',
            description: 'City-aware job search with expense engine, static data layer, Firebase auth, and AI resume analysis.',
            layers: [
                {
                    id: 'presentation',
                    title: 'Presentation',
                    nodes: [
                        {
                            id: 'portal',
                            label: 'Job Portal UI',
                            sublabel: 'React · Recharts',
                            kind: 'client',
                            icon: 'cloud',
                            layer: 0,
                            details: ['/jobpage · /base', 'Filters · apply flows'],
                        },
                    ],
                },
                {
                    id: 'services',
                    title: 'Services',
                    nodes: [
                        {
                            id: 'auth',
                            label: 'Firebase Auth',
                            sublabel: 'Google + email',
                            kind: 'auth',
                            icon: 'fire',
                            layer: 1,
                            details: ['Team-wide login', 'users/{uid}'],
                        },
                        {
                            id: 'logic',
                            label: 'Expense Engine',
                            sublabel: 'Affordability logic',
                            kind: 'api',
                            icon: 'magnifier',
                            layer: 1,
                            details: ['salary > total_expense', 'City + type filters'],
                        },
                        {
                            id: 'gemini',
                            label: 'Resume AI',
                            sublabel: 'Gemini analysis',
                            kind: 'ai',
                            icon: 'sparkles',
                            layer: 1,
                            details: ['/resume-check', 'Skills · role fit'],
                        },
                    ],
                },
                {
                    id: 'data',
                    title: 'Data',
                    nodes: [
                        {
                            id: 'json',
                            label: 'Static JSON',
                            sublabel: 'public/*.json',
                            kind: 'data',
                            icon: 'document',
                            layer: 2,
                            details: ['citydata · jobdata', 'interndata · 9 cities'],
                        },
                        {
                            id: 'api-planned',
                            label: 'Node REST API',
                            sublabel: 'Planned layer',
                            kind: 'api',
                            icon: 'server',
                            layer: 2,
                            details: ['/api/jobs · /cities', 'Applications · admin'],
                        },
                    ],
                },
            ],
            edges: [
                { from: 'portal', to: 'logic', label: 'fetch + filter' },
                { from: 'portal', to: 'auth', label: 'signIn' },
                { from: 'logic', to: 'json', label: 'read listings' },
                { from: 'portal', to: 'gemini', label: 'resume upload' },
                { from: 'logic', to: 'api-planned', label: 'target migration' },
            ],
        },
        systemNodes: [
            { id: 'portal', label: 'Job Portal', sublabel: '/jobpage · /base', kind: 'client', icon: 'cloud', layer: 0, connectsTo: ['logic', 'auth'] },
            { id: 'logic', label: 'Expense Engine', sublabel: 'salary > total_expense', kind: 'api', icon: 'magnifier', layer: 1, connectsTo: ['json', 'gemini'] },
            { id: 'json', label: 'citydata + jobdata', sublabel: 'Static JSON layer', kind: 'data', icon: 'document', layer: 2 },
            { id: 'auth', label: 'Firebase Auth', sublabel: 'Google + email', kind: 'auth', icon: 'fire', layer: 1 },
            { id: 'gemini', label: 'Resume AI', sublabel: '/resume-check', kind: 'ai', icon: 'sparkles', layer: 1 },
        ],
        endpoints: [
            { method: 'GET', path: '/citydata.json', label: '9-city cost breakdown' },
            { method: 'GET', path: '/jobdata.json', label: 'Job listings' },
            { method: 'GET', path: '/interndata.json', label: 'Internships' },
            { method: 'POST', path: '/api/jobs?affordable=true', label: 'Planned filter API' },
            { method: 'GET', path: '/api/cities/:name', label: 'Planned city endpoint' },
            { method: 'POST', path: '/api/applications', label: 'Planned apply record' },
        ],
        entities: [
            { name: 'Cities', fields: ['rent', 'food', 'total_expense'], links: ['Jobs'] },
            { name: 'Jobs', fields: ['salary', 'type', 'level'], links: ['Applications'] },
            { name: 'Applications', fields: ['userId', 'jobId', 'status'], links: ['Users'] },
            { name: 'Users', fields: ['role', 'profile'], links: ['Applications'] },
        ],
        pipelines: [
            {
                id: 'afford',
                title: 'City expense filter',
                accent: '#3b82f6',
                steps: [
                    { icon: 'magnifier', label: 'City lookup' },
                    { icon: 'document', label: 'Load jobs' },
                    { icon: 'chart', label: 'Compare salary' },
                    { icon: 'cloud', label: 'Badge affordable' },
                ],
            },
            {
                id: 'resume',
                title: 'AI resume analysis',
                accent: '#8b5cf6',
                steps: [
                    { icon: 'document', label: 'Upload PDF' },
                    { icon: 'sparkles', label: 'Gemini parse' },
                    { icon: 'server', label: 'Skill gaps' },
                    { icon: 'users', label: 'Role-fit score' },
                ],
            },
        ],
    },
    mentora: {
        backendSkills: ['Firestore schema', 'Auth flows', 'Real-time writes', 'Gamification logic', 'Guest mode'],
        completeDiagram: {
            title: 'Mentora.AI — wellness platform',
            description: 'React SPA with guest mode, Firebase auth, Firestore persistence, and scripted mentor chat trees.',
            layers: [
                {
                    id: 'presentation',
                    title: 'Presentation',
                    nodes: [
                        {
                            id: 'spa',
                            label: 'React 18 SPA',
                            sublabel: 'CRA · Bottom nav',
                            kind: 'client',
                            icon: 'cloud',
                            layer: 0,
                            details: ['Chat · Mood Studio', 'Self-care · Profile'],
                        },
                    ],
                },
                {
                    id: 'services',
                    title: 'Services',
                    nodes: [
                        {
                            id: 'auth',
                            label: 'Firebase Auth',
                            sublabel: 'Email + Google',
                            kind: 'auth',
                            icon: 'shield',
                            layer: 1,
                            details: ['Guest → signed-in', 'RequireAuth routes'],
                        },
                        {
                            id: 'chat',
                            label: 'Mentor Engine',
                            sublabel: 'Decision trees',
                            kind: 'data',
                            icon: 'chat',
                            layer: 1,
                            details: ['5 personas', 'chatresponse.json'],
                        },
                        {
                            id: 'gamify',
                            label: 'Gamification',
                            sublabel: 'XP + levels',
                            kind: 'api',
                            icon: 'chart',
                            layer: 1,
                            details: ['Points on mood/journal', 'Neural Insight'],
                        },
                    ],
                },
                {
                    id: 'data',
                    title: 'Data',
                    nodes: [
                        {
                            id: 'firestore',
                            label: 'Firestore',
                            sublabel: 'NoSQL collections',
                            kind: 'database',
                            icon: 'database',
                            layer: 2,
                            details: ['mood_logs · journal', 'sleep_logs · stats'],
                        },
                    ],
                },
            ],
            edges: [
                { from: 'spa', to: 'auth', label: 'login / signup' },
                { from: 'spa', to: 'chat', label: 'fetch JSON tree' },
                { from: 'auth', to: 'firestore', label: 'uid-scoped writes' },
                { from: 'spa', to: 'firestore', label: 'mood · journal' },
                { from: 'gamify', to: 'firestore', label: 'stats/gamification' },
            ],
        },
        systemNodes: [
            { id: 'spa', label: 'React SPA', sublabel: 'CRA · Router v6', kind: 'client', icon: 'cloud', layer: 0, connectsTo: ['auth', 'firestore', 'chat'] },
            { id: 'auth', label: 'Firebase Auth', sublabel: 'Email + Google', kind: 'auth', icon: 'shield', layer: 1, connectsTo: ['firestore'] },
            { id: 'firestore', label: 'Firestore', sublabel: 'moods · journal · sleep', kind: 'database', icon: 'database', layer: 2 },
            { id: 'chat', label: 'Mentor trees', sublabel: 'chatresponse.json', kind: 'data', icon: 'chat', layer: 1 },
        ],
        endpoints: [
            { method: 'POST', path: 'users/{uid}/mood_logs', label: 'Log mood score' },
            { method: 'POST', path: 'users/{uid}/journal', label: 'Journal entry' },
            { method: 'POST', path: 'users/{uid}/sleep_logs', label: 'Sleep duration' },
            { method: 'PATCH', path: 'users/{uid}/stats/gamification', label: 'XP + level up' },
            { method: 'GET', path: '/chatresponse.json', label: 'Mentor decision tree' },
        ],
        entities: [
            { name: 'mood_logs', fields: ['score', 'mood', 'createdAt'], links: ['stats'] },
            { name: 'journal', fields: ['text', 'createdAt'], links: ['stats'] },
            { name: 'sleep_logs', fields: ['hours', 'notes'], links: ['stats'] },
            { name: 'gamification', fields: ['totalPoints', 'level'], links: [] },
        ],
        pipelines: [
            {
                id: 'mood',
                title: 'Mood → Firestore',
                accent: '#10b981',
                steps: [
                    { icon: 'chart', label: 'Emoji pick' },
                    { icon: 'shield', label: 'Auth check' },
                    { icon: 'database', label: 'setDoc mood_logs' },
                    { icon: 'sparkles', label: '+10 XP' },
                ],
            },
            {
                id: 'guest',
                title: 'Guest → signed-in',
                accent: '#14b8a6',
                steps: [
                    { icon: 'cloud', label: 'Browse free' },
                    { icon: 'chat', label: 'Chat mentors' },
                    { icon: 'shield', label: 'Sign up' },
                    { icon: 'database', label: 'Persist wellness' },
                ],
            },
        ],
    },
};
