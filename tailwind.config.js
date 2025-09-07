module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#02101B",
        primary: "#08397B",
        secondary: "#64A3D8",
        accent: "#E6E4B0",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(59,130,246,0.6)" },
          "50%": { boxShadow: "0 0 20px rgba(59,130,246,1)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
