/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "../.storybook/*"],
  theme: {
    extend: {
      screens: {
        iPhone: "391px",
      },
    },
  },
  plugins: [],
};
