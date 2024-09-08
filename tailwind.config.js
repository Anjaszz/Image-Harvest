/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        transitionDuration: {
            '200': '200ms',
        },
        transitionTimingFunction: {
            'in-out': 'ease-in-out',
        },
        animation: {
          blur: 'blur 0.5s ease-in-out forwards',
      },
      backdropBlur: {
          '1rem': '1rem',
          '2rem': '2rem',
      },
      keyframes: {
          blur: {
              '100%': { backdropFilter: 'blur(2rem)' },
          },
      },
      gridTemplateColumns: {
                'auto-fit-minmax': 'repeat(auto-fit, minmax(14rem, 1fr))',
            },
    },
    },
  },
  plugins: [],
}

