import type { IconType } from 'react-icons';
import { SiGoogle } from 'react-icons/si';

export type CertCategory = 'ai-ml' | 'cloud' | 'web';

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    issued: string;
    category: CertCategory;
    skills: string[];
    credentialId?: string;
    badge?: 'certificate' | 'participation' | 'badge';
    Icon?: IconType;
    iconColor?: string;
    issuerAbbr?: string;
    imageSrc: string;
}

export const LINKEDIN_CERTIFICATIONS_URL =
    'https://www.linkedin.com/in/komalgiri/details/certifications/';

export const certificates: Certificate[] = [
    {
        id: 'isro-geodata',
        title: 'AI/ML for Geodata Analysis',
        issuer: 'Indian Institute of Remote Sensing (IIRS), ISRO',
        issued: 'Sep 2024',
        category: 'ai-ml',
        skills: ['Artificial Intelligence (AI)', 'Machine Learning'],
        badge: 'certificate',
        iconColor: '#1E40AF',
        issuerAbbr: 'ISRO',
        imageSrc: '/certs/isro-geodata.svg',
    },
    {
        id: 'google-startup',
        title: 'AI for Startup',
        issuer: 'Google Israel',
        issued: 'Mar 2024',
        category: 'ai-ml',
        skills: ['Artificial Intelligence (AI)', 'Startups'],
        badge: 'participation',
        Icon: SiGoogle,
        iconColor: '#4285F4',
        imageSrc: '/certs/google-startup.svg',
    },
    {
        id: 'azure-ai',
        title: 'Microsoft Certified: Azure AI Fundamentals',
        issuer: 'Microsoft',
        issued: 'Jan 2024',
        category: 'cloud',
        skills: ['Microsoft Azure', 'AI Fundamentals'],
        badge: 'certificate',
        iconColor: '#00A4EF',
        issuerAbbr: 'MS',
        imageSrc: '/certs/azure-ai.svg',
    },
    {
        id: 'google-genai',
        title: 'Introduction to Generative AI',
        issuer: 'Google',
        issued: 'Jan 2024',
        category: 'ai-ml',
        skills: ['Generative AI'],
        credentialId: '7115931',
        badge: 'badge',
        Icon: SiGoogle,
        iconColor: '#4285F4',
        imageSrc: '/certs/google-genai.svg',
    },
    {
        id: 'ibm-ml-python',
        title: 'Machine Learning with Python',
        issuer: 'IBM',
        issued: 'Aug 2023',
        category: 'ai-ml',
        skills: ['Machine Learning', 'Python', 'Data Science'],
        badge: 'badge',
        iconColor: '#052FAD',
        issuerAbbr: 'IBM',
        imageSrc: '/certs/ibm-ml-python.svg',
    },
    {
        id: 'ibm-js-react',
        title: 'Introduction to JavaScript and React',
        issuer: 'IBM',
        issued: 'Jul 2023',
        category: 'web',
        skills: ['JavaScript', 'React'],
        credentialId: 'URL-23A8A189D7F5',
        badge: 'badge',
        iconColor: '#052FAD',
        issuerAbbr: 'IBM',
        imageSrc: '/certs/ibm-js-react.svg',
    },
    {
        id: 'internshala-web',
        title: 'Web Development',
        issuer: 'Internshala',
        issued: 'Sep 2022',
        category: 'web',
        skills: ['Web Development'],
        credentialId: '05BFA947-E3A0-30BA-B332-142779DB3FF1',
        badge: 'certificate',
        iconColor: '#0EA5E9',
        issuerAbbr: 'IS',
        imageSrc: '/certs/internshala-web.svg',
    },
    {
        id: 'nsdc-web',
        title: 'Web Technology',
        issuer: 'National Skill Development Corporation',
        issued: 'Jan 2022',
        category: 'web',
        skills: ['Web Development'],
        credentialId: 'WTech-WBT-1121',
        badge: 'certificate',
        iconColor: '#059669',
        issuerAbbr: 'NSDC',
        imageSrc: '/certs/nsdc-web.svg',
    },
];

export const categoryLabels: Record<CertCategory, string> = {
    'ai-ml': 'AI & ML',
    cloud: 'Cloud',
    web: 'Web Dev',
};
