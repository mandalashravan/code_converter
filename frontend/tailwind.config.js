/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#a259ff',
        'brand-pink': '#ff5cdb',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #a259ff 0%, #ff5cdb 100%)',
      },
      fontFamily: {
        sans: [
          "'Poppins'",
          "'Clash Grotesk'",
          "'Inter'",
          "'Segoe UI'",
          "Arial",
          "sans-serif"
        ],
        heading: [
          "'Clash Grotesk'",
          "'Poppins'",
          "'Inter'",
          "'Segoe UI'",
          "Arial",
          "sans-serif"
        ],
        mono: [
          "'Fira Mono'",
          "'JetBrains Mono'",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ]
      }
    },
  },
  plugins: [],
}
