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
      },
      backgroundImage: {
        'contact-bg': "url('/contact-bg.jpg')",
        'contact-bg-2': "url('/contact-placeholder.jpg')",
        'contact-bg-3': "url('/contact-placeholder2.jpg')",
        'announcement-bg': "url('/mingcute_leaf-line-group.svg')",
        'cta': "url('/palm-bg-cta.png')"
      },
    },
  },
  plugins: [],
};

export default config;
