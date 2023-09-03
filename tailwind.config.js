/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    corePlugins: {
        preflight: false,
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            height: {
                calc: 'calc(100vh - 80px)',
            },
            colors: {
                // primary: {
                //     light: '#EDE7DC',
                //     main: '#DCD2CC',
                //     dark: '#BDC3CB',
                //     accent: '#CCAFA5', // 强调色
                //     contrastText: '#ffffff', //对比色
                // },
                primary: {
                    light: '#5eead4',
                    main: '#14b8a6',
                    dark: '#0f766e',
                    accent: '#0d9488', // 强调色
                    contrastText: '#ffffff', //对比色
                },
                secondary: {
                    light: '#EAEDF6',
                    main: '#DCD2CC',
                    dark: '#000320',
                    accent: '#0f30ab',
                    contrastText: '#BDC3CB',
                },
                neutral: {
                    light: '#42a5f5',
                    main: '#EDE7DC',
                    dark: '#1565c0',
                    accent: '#0f30ab',
                    contrastText: '#ffffff',
                },
            },
        },
    },
    plugins: [],
}
