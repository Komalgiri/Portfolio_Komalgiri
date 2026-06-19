import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import ThemeToggle from '../ui/ThemeToggle';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const ctaLabels = ['Hire Me', 'Contact Me'] as const;

const NavCtaButton = ({
    className,
    onClick,
}: {
    className: string;
    onClick?: () => void;
}) => {
    const reducedMotion = useReducedMotion();
    const [ctaIndex, setCtaIndex] = useState(0);

    useEffect(() => {
        if (reducedMotion) return;
        const timer = window.setInterval(() => {
            setCtaIndex((current) => (current + 1) % ctaLabels.length);
        }, 5000);
        return () => window.clearInterval(timer);
    }, [reducedMotion]);

    const label = reducedMotion ? ctaLabels[0] : ctaLabels[ctaIndex];

    return (
        <a href="#contact" onClick={onClick} className={className}>
            <span className="relative inline-flex min-w-[6.75rem] justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={label}
                        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="block"
                    >
                        {label}
                    </motion.span>
                </AnimatePresence>
            </span>
        </a>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        handleScroll();
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
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6">
            <nav
                aria-label="Main navigation"
                className={`mx-auto max-w-6xl transition-all duration-500 ${
                    isScrolled
                        ? 'rounded-2xl border border-theme-border bg-[var(--color-card-glass)] py-2.5 shadow-xl shadow-indigo-500/10 backdrop-blur-xl'
                        : 'rounded-2xl border border-theme-border/50 bg-theme-nav/50 py-3 backdrop-blur-md'
                }`}
            >
                <div className="flex items-center justify-between gap-4 px-4 md:px-5">
                    <a href="#" className="group flex min-w-0 items-center gap-3">
                        <div className="relative shrink-0">
                            <div className="absolute -inset-0.5 rounded-xl bg-indigo-500/40 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                            <img
                                src="/favicon.svg"
                                alt=""
                                aria-hidden="true"
                                className="relative h-10 w-10 rounded-xl shadow-lg shadow-indigo-600/20 transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="min-w-0 hidden sm:block">
                            <span className="truncate text-base font-black tracking-tight text-theme-text md:text-lg">
                                Komal Giri
                            </span>
                            <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 md:text-xs">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                Open to work
                            </p>
                        </div>
                    </a>

                    <div className="hidden items-center gap-1 lg:flex">
                        <div className="flex items-center gap-0.5 rounded-xl border border-theme-border/60 bg-theme-surface/40 p-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-theme-muted transition-colors hover:bg-theme-surface/80 hover:text-theme-text"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                        <a
                            href="/resume.pdf"
                            download
                            className="ml-2 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-theme-muted transition-colors hover:text-indigo-500"
                        >
                            Resume
                        </a>
                        <ThemeToggle />
                        <NavCtaButton className="ml-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40" />
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <NavCtaButton className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/25" />
                        <ThemeToggle />
                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-nav-menu"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-theme-border bg-theme-surface/60 text-theme-text transition-colors hover:bg-theme-surface"
                        >
                            {menuOpen ? <HiOutlineXMark className="text-xl" /> : <HiOutlineBars3 className="text-xl" />}
                        </button>
                    </div>
                </div>
            </nav>

            {menuOpen && (
                <div
                    id="mobile-nav-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                    className="fixed inset-0 z-40 lg:hidden"
                >
                    <button
                        type="button"
                        aria-label="Close menu"
                        className="absolute inset-0 bg-theme-bg/85 backdrop-blur-sm"
                        onClick={closeMenu}
                    />
                    <div className="absolute right-4 top-[5.5rem] w-[min(100%,320px)] overflow-hidden rounded-2xl border border-theme-border bg-[var(--color-card-glass)] shadow-2xl backdrop-blur-xl">
                        <div className="border-b border-theme-border px-5 py-4">
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Open to work
                            </p>
                            <p className="mt-1 text-xs text-theme-muted">Freelance, contract & full-time</p>
                        </div>
                        <div className="flex flex-col gap-0.5 p-3">
                            {navLinks.map((link, i) => (
                                <a
                                    key={link.name}
                                    ref={i === 0 ? firstLinkRef : undefined}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    className="rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-theme-text transition-colors hover:bg-theme-surface/60"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                download
                                onClick={handleNavClick}
                                className="rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-theme-text transition-colors hover:bg-theme-surface/60"
                            >
                                Resume
                            </a>
                            <NavCtaButton
                                onClick={handleNavClick}
                                className="mx-1 mt-2 flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white"
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
