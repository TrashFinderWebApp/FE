import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: "Pretendard-Regular",
      },
      colors: {
        "dark-blue": "#05668D",
        "light-blue": "#028090",
        "dark-green": "#00A896",
        "light-green": "#02C39A",
        "light-yellow": "#F0F3BD",
      },
      fontSize: {
        sm: "0.75rem", // 12px
        base: "0.875rem", // 14px
        xl: "1rem", // 16px
      },
    },
  },
  plugins: [],
};
export default config;
