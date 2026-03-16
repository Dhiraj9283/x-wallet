module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "xwallet-purple": "#a855f7",
        "xwallet-cyan": "#06b6d4",
        "xwallet-pink": "#ec4899",
        "xwallet-dark": "#0B0A10", 
        "custom-bg": "#101214",
        "custom-surface": "#161A1D",
        "custom-border": "#2C333A",
        "custom-text-primary": "#C7D1DB",
        "custom-text-secondary": "#596773",
        "custom-heading": "#DEE4EA"
      },
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
