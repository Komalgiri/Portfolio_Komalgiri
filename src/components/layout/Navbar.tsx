import { useState, useEffect } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'What I Do', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-theme-nav backdrop-blur-lg border-b border-theme-border' : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        K
                    </div>
                    <span className="text-xl font-bold text-theme-text tracking-tight">Komal Giri</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-theme-muted hover:text-theme-text font-medium transition-colors duration-200 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <ThemeToggle />
                    <a
                        href="#contact"
                        className="px-5 py-2.5 rounded-xl bg-theme-surface/50 border border-theme-border text-theme-text font-semibold hover:bg-theme-surface transition-all duration-200"
                    >
                        Hire Me
                    </a>
                </div>

                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
