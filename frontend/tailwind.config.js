/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'dice-roll': 'diceRoll 0.4s ease-out',
        'dice-exit': 'diceExit 0.3s ease-in forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        diceRoll: {
          '0%': { 
            transform: 'translateX(-50px) rotate(-180deg) scale(0.5)', 
            opacity: '0' 
          },
          '60%': { 
            transform: 'translateX(5px) rotate(20deg) scale(1.1)' 
          },
          '100%': { 
            transform: 'translateX(0) rotate(0deg) scale(1)', 
            opacity: '1' 
          },
        },
        diceExit: {
          '0%': { 
            transform: 'scale(1) rotate(0deg)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'scale(0.5) rotate(90deg)', 
            opacity: '0' 
          },
        }
      }
    },
  },
  plugins: [],
}


