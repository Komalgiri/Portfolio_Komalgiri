/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                theme: {
                    bg: 'var(--color-bg)',
                    surface: 'var(--color-surface)',
                    card: 'var(--color-card)',
                    text: 'var(--color-text)',
                    muted: 'var(--color-text-muted)',
                    border: 'var(--color-border)',
                    nav: 'var(--color-nav)',
                },
            },
            animation: {
                'fade-in-down': 'fadeInDown 1s ease-out',
                'fade-in-up': 'fadeInUp 1s ease-out backwards',
                'blob': 'blob-bounce 10s infinite alternate',
                'marquee': 'marquee 35s linear infinite',
            },
            keyframes: {
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'blob-bounce': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '100%': { transform: 'translate(20px, 40px) rotate(10deg)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            }
        },
    },
    plugins: [],
}
