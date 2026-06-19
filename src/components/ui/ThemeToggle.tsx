import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-theme-border bg-theme-surface/50 text-theme-muted transition-all duration-200 hover:border-indigo-500/40 hover:text-theme-text"
        >
            {theme === 'dark' ? <HiOutlineSun className="text-lg" /> : <HiOutlineMoon className="text-lg" />}
        </button>
    );
};

export default ThemeToggle;
