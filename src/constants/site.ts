export const SITE_URL = 'https://portfolio-komalgiri.onrender.com';

/** Primary markets — India + US remote */
export const WORK_LOCATIONS = ['Jaipur', 'Delhi', 'Noida', 'Pune'] as const;

export const US_REMOTE_LABEL = 'US remote · full-time & freelance · EST/PST overlap';

export const BANNER_REMOTE_LABEL = 'US remote freelance · EST/PST overlap';

export const AVAILABILITY_LABEL = 'Open for US & international freelance · contract & full-time.';

export const WORK_LOCATIONS_LABEL = WORK_LOCATIONS.join(' · ');

export const SEO = {
    title: 'Komal Giri | React Native & Full Stack Developer | US Remote · Open to Work',
    description:
        'React Native & full-stack developer open to full-time roles and freelance contract work with US startups and remote teams. Mobile apps, Node.js APIs, Firebase & AI integrations. EST/PST overlap.',
    keywords: [
        'Komal Giri',
        'React Native developer',
        'full stack developer remote',
        'hire React Native developer US',
        'remote full stack developer',
        'freelance mobile app developer',
        'React Native developer jobs',
        'Node.js API developer',
        'Firebase developer remote',
        'US remote software developer',
    ].join(', '),
    ogLocale: 'en_US',
} as const;

export const CORE_SERVICES = [
    'React Native mobile apps',
    'Full-stack web products',
    'REST API & backend development',
    'Firebase & GitHub integrations',
    'AI feature integration (Gemini)',
    'UI/UX implementation',
] as const;
