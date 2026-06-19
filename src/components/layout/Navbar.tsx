import { useState, useEffect, useRef, useCallback } from 'react';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'What I Do', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!menuOpen) return;

        document.body.style.overflow = 'hidden';
        firstLinkRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [menuOpen, closeMenu]);

    const handleNavClick = () => closeMenu();

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
                    <a
                        href="/resume.pdf"
                        download
                        className="text-theme-muted hover:text-theme-text font-medium transition-colors duration-200"
                    >
                        Resume
                    </a>
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
                    <button
                        ref={menuButtonRef}
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav-menu"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-theme-border bg-theme-surface/50 text-theme-text transition-colors hover:bg-theme-surface"
                    >
                        {menuOpen ? <HiOutlineXMark className="text-xl" /> : <HiOutlineBars3 className="text-xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <div
                    id="mobile-nav-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                    className="fixed inset-0 top-0 z-40 md:hidden"
                >
                    <button
                        type="button"
                        aria-label="Close menu"
                        className="absolute inset-0 bg-theme-bg/80 backdrop-blur-sm"
                        onClick={closeMenu}
                    />
                    <div className="absolute right-0 top-0 h-full w-[min(100%,320px)] border-l border-theme-border bg-theme-bg shadow-2xl">
                        <div className="flex flex-col gap-1 px-6 pt-24 pb-8">
                            {navLinks.map((link, i) => (
                                <a
                                    key={link.name}
                                    ref={i === 0 ? firstLinkRef : undefined}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    className="rounded-xl px-4 py-3.5 text-lg font-semibold text-theme-text transition-colors hover:bg-theme-surface/50"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                download
                                onClick={handleNavClick}
                                className="rounded-xl px-4 py-3.5 text-lg font-semibold text-theme-text transition-colors hover:bg-theme-surface/50"
                            >
                                Resume
                            </a>
                            <a
                                href="#contact"
                                onClick={handleNavClick}
                                className="mt-4 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3.5 font-semibold text-white transition-colors hover:bg-indigo-700"
                            >
                                Hire Me
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
