import { lazy, Suspense } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Experience from '../components/home/Experience';
import Between from '../components/home/Between';
import DesignPathBridge from '../components/home/DesignPathBridge';
import Projects from '../components/home/Projects';
import GithubFootprint from '../components/home/GithubFootprint';
import Achievements from '../components/home/Achievements';
import Contact from '../components/home/Contact';
import ScrollReveal from '../components/ui/ScrollReveal';
import { SiGithub, SiLinkedin } from 'react-icons/si';

const About = lazy(() => import('../components/home/About'));

const SectionFallback = () => (
    <div className="flex min-h-[200px] items-center justify-center bg-theme-bg py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
    </div>
);

const Home = () => {
    return (
        <div className="bg-theme-bg min-h-screen transition-colors duration-300">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
            >
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <Hero />
                <Suspense fallback={<SectionFallback />}>
                    <About />
                </Suspense>
                <Experience />
                <Between />
                <DesignPathBridge />
                <Projects />
                <GithubFootprint />
                <Achievements />
                <Contact />
            </main>
            <ScrollReveal as="footer" variant="fadeUp" className="py-12 border-t border-theme-border text-center text-theme-muted text-sm">
                <p>
                    © {new Date().getFullYear()} Komal Giri · React · React Native · Node.js
                </p>
                <div className="mt-4 flex items-center justify-center gap-4">
                    <a
                        href="https://github.com/Komalgiri"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-theme-muted transition-colors hover:text-indigo-400"
                    >
                        <SiGithub className="text-lg" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/komalgiri/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-theme-muted transition-colors hover:text-indigo-400"
                    >
                        <SiLinkedin className="text-lg" />
                    </a>
                    <a
                        href="mailto:komalgiri789@gmail.com"
                        className="text-theme-muted transition-colors hover:text-indigo-400"
                    >
                        Email
                    </a>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Home;
