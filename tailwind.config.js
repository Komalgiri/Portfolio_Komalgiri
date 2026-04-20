/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in-down': 'fadeInDown 1s ease-out',
                'fade-in-up': 'fadeInUp 1s ease-out backwards',
                'blob': 'blob-bounce 10s infinite alternate',
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
                }
            }
        },
    },
    plugins: [],
}
