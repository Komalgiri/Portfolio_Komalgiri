import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import Between from '../components/home/Between';
import Projects from '../components/home/Projects';
import Achievements from '../components/home/Achievements';
import Contact from '../components/home/Contact';
import LetsConnectBanner from '../components/layout/LetsConnectBanner';
import ScrollReveal from '../components/ui/ScrollReveal';

const Home = () => {
    return (
        <div className="bg-theme-bg min-h-screen transition-colors duration-300">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
                <Between />
                <Projects />
                <Achievements />
                <Contact />
                <LetsConnectBanner />
            </main>
            <ScrollReveal as="footer" variant="fadeUp" className="py-12 border-t border-theme-border text-center text-theme-muted text-sm">
                <p>© {new Date().getFullYear()} Portfolio. Built with passion and code.</p>
            </ScrollReveal>
        </div>
    );
};


export default Home;
