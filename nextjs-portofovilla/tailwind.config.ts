import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        krona: ['"Krona One"', 'sans-serif'], // Add Krona One
        montserrat: ['"Montserrat"', 'sans-serif'], // Add Montserrat
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#1A520F', // Fill in your primary hex code
        secondary: '#047C36', // Fill in your secondary hex code
        tertier: '#7cc097', // Fill in your secondary hex code
        lightbg: '#f4f7f1', // Fill in your secondary hex code
        darkbg: '#06270B', // Fill in your secondary hex code
        graymuted: '#d9d9d9',
        subtle: '#DBEEFE',
        bluelink: '#0064D3',
      },
      backgroundImage: {
        'contact-bg': "url('/contact-bg.jpg')",
        'contact-bg-2': "url('/contact-placeholder.jpg')",
        'contact-bg-3': "url('/contact-placeholder2.jpg')",
        'announcement-bg': "url('/mingcute_leaf-line-group.svg')",
        'cta': "url('/palm-bg-cta.png')",
        'trivia': "url('/trivia-bg.png')",
      },
    },
  },
  plugins: [],
};

export default config;
