module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        leftLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)'},
        },
        rightLine: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)'},
        },
        upLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateX(0)'},
        },
        downLine: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateX(0)'},
        },
      },
      animation: {
        leftLine: 'leftLine 0.2s ease-in-out forwards',
        rightLine:'rightLine 0.2s ease-in-out forwards',
        upLine:   'upLine 0.2s ease-in-out forwards',
        downLine: 'downLine 0.2s ease-in-out forwards',
      },
      spacing: { 
      }
    },
  },
  plugins: [],
}
