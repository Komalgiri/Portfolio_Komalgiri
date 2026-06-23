export const mentoraTargetLayers = {
    client: {
        title: 'Web Client (React)',
        nodes: [
            { label: 'HomePage · App shell · Bottom nav' },
            { label: 'Chat Mentors · Mood Studio · Self-Care · Profile' },
            { label: 'Guest mode + authenticated wellness flows' },
        ],
    },
    firebase: {
        title: 'Firebase',
        nodes: [
            { label: 'Authentication — email/password + Google OAuth' },
            { label: 'Firestore — moods, journals, sleep, gamification' },
        ],
    },
    chat: {
        title: 'Chat Layer (target)',
        nodes: [
            { label: 'Live AI mentor API — persisted chat_logs' },
            { label: 'Five personas with session history' },
        ],
    },
    hosting: {
        title: 'Hosting',
        nodes: [
            { label: 'Static CRA build → Netlify / Vercel' },
            { label: 'Firestore security rules + CI/CD' },
        ],
    },
};

export const mentoraCurrentLayers = {
    client: {
        title: 'React 18 SPA',
        nodes: [
            { label: 'CRA + React Router v6 — /chat/* app shell' },
            { label: 'Framer Motion · Recharts · dark glassmorphism UI' },
        ],
    },
    firebase: {
        title: 'Firebase 10',
        nodes: [
            { label: 'Auth — browserLocalPersistence, RequireAuth routes' },
            { label: 'Firestore — mood_logs, journal, sleep_logs, stats' },
        ],
    },
    static: {
        title: 'Static Assets',
        nodes: [
            { label: 'chatresponse.json — scripted mentor decision trees' },
            { label: 'localStorage — guest grounding & creative tools' },
        ],
    },
};

export const mentoraRequestFlows = [
    {
        title: 'Guest & auth',
        steps: [
            'Landing at / → enter app without account (guest mode)',
            'Sign up / login — email+password or Google OAuth popup',
            'onAuthStateChanged → session state via AuthContext',
            '/chat/profile requires RequireAuth — moods & journals need login',
        ],
    },
    {
        title: 'Mentor chat',
        steps: [
            'Pick mentor — Mood, Stress, Dream, Anxiety, or Relationship persona',
            'Fetch /chatresponse.json → nested decision tree lookup',
            'User chips or text traverse greetings → options → responses',
            'GIF responses — not a live LLM; chat_logs not persisted yet',
        ],
    },
    {
        title: 'Mood Studio',
        steps: [
            'Quick mood log (emoji → score) · 5-question wellness quiz',
            'Daily journal → users/{uid}/journal in Firestore',
            '30-day Recharts area chart · streak & average stats',
            'Breathing modal · tic-tac-toe mini-game',
        ],
    },
    {
        title: 'Gamification',
        steps: [
            'Points — mood 10 · journal 15 · meditation 20 · sleep 10 · quiz 15',
            'users/{uid}/stats/gamification — totalPoints, level',
            'Level = floor(totalPoints / 100) + 1',
            'Neural Insight — mood correlation with ≥7.5h sleep days',
        ],
    },
];

export const mentoraEntities = [
    {
        name: 'mood_logs',
        fields: '{ score, mood, createdAt } — emoji-based wellness scores',
    },
    {
        name: 'journal',
        fields: '{ text, createdAt } — daily journal entries',
    },
    {
        name: 'sleep_logs',
        fields: '{ hours, notes, createdAt } — sleep/wake tracking',
    },
    {
        name: 'preferences/selfcare',
        fields: '{ choice, updatedAt } — self-care hub selections',
    },
    {
        name: 'stats/gamification',
        fields: 'totalPoints, level, lastAction — XP loop',
    },
    {
        name: 'chat_logs (planned)',
        fields: 'mentor sessions — not implemented in MVP',
    },
];

export const mentoraSchemaRelations = [
    'User → mood_logs · journal · sleep_logs',
    'User → preferences/selfcare',
    'User → stats/gamification',
    'Sleep data → Neural Insight mood correlation',
];
