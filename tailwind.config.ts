import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#05668D",
        "light-blue": "#028090",
        "dark-green": "#00A896",
        "light-green": "#02C39A",
        "light-yellow": "#F0F3BD",
      },
    },
  },
  plugins: [],
};
export default config;
