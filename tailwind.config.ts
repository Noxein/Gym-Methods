import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        green: '#3C9F65', //3C9F65 
        'green-200': '#12301f',
        red: '#9F443C',
        'red-200': '#301512',
        marmur: '#D9D9D9',
        dark: '#0D1317',
        darkLight: '#10191E',
        steel: "#121C21",
        borderInteractive: "#19272E",
        notSelected: '#33424C'
      },
      borderWidth:{
        1: '1px'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
