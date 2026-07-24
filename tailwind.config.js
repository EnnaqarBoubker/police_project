import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Tajawal', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    50: '#f0f5fe',
                    100: '#dce6fc',
                    200: '#b7cdf9',
                    300: '#85acf5',
                    400: '#5488ef',
                    500: '#2f68e0',
                    600: '#204ec2',
                    700: '#1c3f9c',
                    800: '#18317a',
                    900: '#122450',
                    950: '#0a1730',
                },
            },
            boxShadow: {
                soft: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 2px 8px -2px rgb(15 23 42 / 0.06)',
                card: '0 1px 3px 0 rgb(15 23 42 / 0.06), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
                popover: '0 12px 32px -8px rgb(15 23 42 / 0.18)',
            },
            borderRadius: {
                xl2: '1.25rem',
            },
        },
    },

    plugins: [forms],
};
