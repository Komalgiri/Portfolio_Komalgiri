import type { ReactNode } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import ThemeToggle from '../ui/ThemeToggle';

interface SubpageHeaderProps {
    backLabel?: string;
    onBack: () => void;
    rightContent?: ReactNode;
}

const SubpageHeader = ({ backLabel = 'Back to Home', onBack, rightContent }: SubpageHeaderProps) => (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-theme-border bg-theme-nav py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <button
                type="button"
                onClick={onBack}
                className="group flex items-center gap-2 text-theme-muted transition-colors hover:text-theme-text"
            >
                <HiOutlineArrowLeft className="transition-transform group-hover:-translate-x-1" />
                {backLabel}
            </button>
            <div className="flex items-center gap-3">
                {rightContent}
                <ThemeToggle />
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600 font-bold text-sm text-white">
                        K
                    </div>
                    <span className="hidden font-bold tracking-tight text-theme-text sm:block">Komal Giri</span>
                </div>
            </div>
        </div>
    </header>
);

export default SubpageHeader;
