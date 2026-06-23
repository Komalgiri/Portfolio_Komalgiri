export const udyampathTargetLayers = {
    client: {
        title: 'React Frontend',
        nodes: [
            { label: 'Homepage · Jobs / Internships · Courses · Tools' },
            { label: 'Admin Panel · Profile · Recruiter Portal' },
            { label: 'City budget explorer · Job cards · Apply flows' },
        ],
    },
    api: {
        title: 'Node.js REST API',
        nodes: [
            { label: 'Auth · Job · Course · User · Admin APIs' },
            { label: 'Validation · pagination · role-based access' },
        ],
    },
    search: {
        title: 'Search / Filter Layer',
        nodes: [
            { label: 'City · Salary · Type · Level filters' },
            { label: 'Affordable jobs: salary > city total_expense' },
        ],
    },
    data: {
        title: 'Database',
        nodes: [
            { label: 'Users · Jobs · Courses · Applications' },
            { label: 'Categories · Admin · Cities (cost of living)' },
        ],
    },
};

export const udyampathCurrentLayers = {
    client: {
        title: 'My modules (React)',
        nodes: [
            { label: '/jobpage — listings, filters, affordable-job badges, apply flows' },
            { label: '/base + CityDetailsModal — expense charts (Recharts)' },
            { label: '/resume-check — AI resume upload & feedback' },
        ],
    },
    json: {
        title: 'Static JSON (public/)',
        nodes: [
            { label: 'jobdata · interndata — job & internship listings' },
            { label: 'citydata — 9 cities, rent, food, transport, total_expense' },
        ],
    },
    firebase: {
        title: 'Shared platform',
        nodes: [
            { label: 'Firebase Auth — team-wide login (Google + email)' },
            { label: 'Courses, tools, recruiter UI — built by teammates' },
        ],
    },
};

export const udyampathRequestFlows = [
    {
        title: 'City expense & jobs',
        steps: [
            'User enters city on /jobpage or explores /base',
            'Fetch citydata.json → lookup by city name (case-insensitive)',
            'Load jobdata.json + interndata.json for listings',
            'Mark affordable: job.salary > city.total_expense',
            'Affordable cards show “View Details” → CityDetailsModal with expense pie chart',
        ],
    },
    {
        title: 'Job search & filters',
        steps: [
            'Sidebar filters — type (On-Site, Part Time) · level (Senior, Junior)',
            'Tab switch — Jobs ↔ Internships',
            'Apply — internship → /intern-apply · job → /jobDetails (state)',
            'Sidebar link → /resume-check for AI resume analysis',
        ],
    },
    {
        title: 'AI resume analysis',
        steps: [
            'User opens /resume-check from job portal sidebar',
            'Upload resume (PDF or document)',
            'AI analyzes skills, formatting, gaps vs selected role',
            'Structured feedback — strengths, improvements, role-fit score',
        ],
    },
    {
        title: 'Target API (planned)',
        steps: [
            'GET /api/cities/:name — single city expense breakdown',
            'GET /api/jobs?city=Mumbai&affordable=true — salary vs expense filter',
            'GET /api/jobs?type=On-Site&level=Senior — sidebar filters',
            'POST /api/applications — user_id + job_id application records',
        ],
    },
];

export const udyampathEntities = [
    {
        name: 'Users',
        fields: 'candidates & recruiters — 1 user → many Applications',
    },
    {
        name: 'Jobs',
        fields: 'full-time & part-time roles — belongs to Categories',
    },
    {
        name: 'Courses',
        fields: 'learning content linked to Categories',
    },
    {
        name: 'Applications',
        fields: 'FK → User, FK → Job — status & applied_at',
    },
    {
        name: 'Categories',
        fields: 'job/course taxonomy — parent of Jobs & Courses',
    },
    {
        name: 'Cities',
        fields: 'monthly_rent, food, transport, utilities, total_expense',
    },
    {
        name: 'Admin',
        fields: 'platform management — Users, Jobs, Courses',
    },
];

export const udyampathSchemaRelations = [
    'User → Application → Job',
    'Job → Category · Course → Category',
    'City → affordability check on Job.salary',
    'Admin → Users · Jobs · Courses',
];
