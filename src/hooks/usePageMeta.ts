import { useEffect } from 'react';
import { SEO } from '../constants/site';

const PAGE_META: Record<string, { title: string; description: string }> = {
    home: { title: SEO.title, description: SEO.description },
    projects: {
        title: 'Projects | Komal Giri — React Native & Full Stack',
        description:
            'Mobile apps, full-stack products, and APIs built by Komal Giri. React Native, Node.js, Firebase, and AI integrations for US and remote teams.',
    },
    github: {
        title: 'GitHub Activity | Komal Giri',
        description: 'Open-source contributions and shipping history — React, React Native, Node.js, and TypeScript.',
    },
    'system-design': {
        title: 'System Design & Architecture | Komal Giri',
        description:
            'Backend architecture, API flows, and system design for production apps including CodePodAI — freelance full-stack developer portfolio.',
    },
    'ui-design': {
        title: 'UI Design Gallery | Komal Giri',
        description:
            'Mobile and web UI design work — React Native screens, dashboards, and product interfaces for startups and contract clients.',
    },
    'case-study': {
        title: 'Case Study | Komal Giri',
        description: SEO.description,
    },
};

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export function usePageMeta(page: string, caseStudyTitle?: string) {
    useEffect(() => {
        const base = PAGE_META[page] ?? PAGE_META.home;
        const title =
            page === 'case-study' && caseStudyTitle
                ? `${caseStudyTitle} Case Study | Komal Giri`
                : base.title;
        const description = base.description;

        document.title = title;
        setMeta('description', description);
        setMeta('og:title', title, 'property');
        setMeta('og:description', description, 'property');
        setMeta('twitter:title', title);
        setMeta('twitter:description', description);
    }, [page, caseStudyTitle]);
}
