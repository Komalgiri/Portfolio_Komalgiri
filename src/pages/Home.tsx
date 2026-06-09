import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import Achievements from '../components/home/Achievements';
import Projects from '../components/home/Projects';
import Contact from '../components/home/Contact';
import ScrollReveal from '../components/ui/ScrollReveal';

const Home = () => {
    return (
        <div className="bg-[#0f172a] min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />

                <Projects />
                <Achievements />
                <Contact />
            </main>
            <ScrollReveal as="footer" variant="fadeUp" className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} Portfolio. Built with passion and code.</p>
            </ScrollReveal>
        </div>
    );
};


export default Home;
