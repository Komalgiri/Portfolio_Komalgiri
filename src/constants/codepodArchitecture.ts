export const codepodLayers = {
    client: {
        title: 'Client Layer',
        nodes: [
            { label: 'React 18 + TypeScript + Vite' },
            { label: 'Home · Dashboard · Pod Overview · Task Board · Explore' },
            { label: 'authService · podService · aiService · githubService' },
        ],
    },
    api: {
        title: 'API Layer — Express 5',
        nodes: [
            { label: 'Helmet · CORS · Rate Limit · Compression · JWT Middleware' },
            { label: '/users · /pods · /tasks · /rewards · /github · /ai · /notifications' },
        ],
    },
    auth: {
        title: 'Authentication',
        nodes: [
            { label: 'Email + Password → bcrypt + JWT' },
            { label: 'GitHub OAuth 2.0 → /api/auth/github' },
        ],
    },
    data: {
        title: 'Data Layer',
        nodes: [
            { label: 'Prisma ORM' },
            { label: 'PostgreSQL' },
        ],
    },
    external: {
        title: 'External Services',
        nodes: [
            { label: 'GitHub API — repos · commits · PRs · profile' },
            { label: 'Google Gemini — roadmaps · tasks · project brain' },
        ],
    },
};

export const codepodRequestFlows = [
    {
        title: 'Authentication',
        steps: [
            'Browser → POST /api/users/login (or signup)',
            'JWT issued → stored in localStorage',
            'Protected calls: Authorization: Bearer <token>',
            'GitHub link: GET /api/auth/github/login → OAuth → callback',
            'User upserted, token encrypted & stored → redirect to /auth/callback',
        ],
    },
    {
        title: 'Pod lifecycle',
        steps: [
            'Create Pod → POST /api/pods (requires GitHub linked)',
            'Prisma: Pod + PodMember (admin), optional repoOwner + repoName',
            'View Pod → GET /api/pods/:id — members, tasks, stats, activities',
            'Tasks → POST /api/pods/:id/tasks · PATCH /api/tasks/:id/status',
        ],
    },
    {
        title: 'AI planning',
        steps: [
            'GET /api/ai/pods/:id/plan — load pod context (tasks, members, activities, repo)',
            'Call Gemini API → cache roadmap in Pod.aiRoadmap (7-day TTL)',
            'Return phases, assignees, PM insights, team allocation',
            'POST /api/ai/pods/:id/suggest-tasks — Gemini suggests next tasks from board state',
        ],
    },
    {
        title: 'GitHub activity sync',
        steps: [
            'POST /api/github/sync (user-level) · POST /api/pods/:id/sync (pod-level)',
            'Fetch repos / commits / PRs from GitHub API',
            'Store in Activity table → convert to Reward points',
            'Feed leaderboard + pod health metrics',
        ],
    },
];

export const codepodEntities = [
    {
        name: 'User',
        fields: 'email, GitHub ID/token, inferred role, tech stack, reliability score',
    },
    {
        name: 'Pod',
        fields: 'project unit linked to a GitHub repo',
    },
    {
        name: 'Task',
        fields: 'kanban items — pending / in-progress / done',
    },
    {
        name: 'Activity',
        fields: 'GitHub events (commits, PRs) with JSON metadata',
    },
    {
        name: 'Reward',
        fields: 'points + badges from shipping activity',
    },
];

export const codepodSchemaRelations = [
    'User → PodMember → Pod',
    'Pod → Task · Activity',
    'Pod → aiRoadmap · projectBrain',
    'User → Reward · Notification · Skill',
    'Badge registry',
];
