/** @type {import('tailwindcss').Config} */

/*
 * Trilegal AI Design System — single blue palette.
 *
 * Primary       #2762E5  CTAs, active states, links
 * Primary Light #82A9F8  hover / secondary states
 * Primary Pale  #CCDEF9  subtle highlights & backgrounds
 * Navy          #10182B  headings, sidebar, navigation, primary text
 * Navy Blue     #173068  secondary dark accents
 * Background    #EFF4FC  main app background
 * White         #FDFEFE  cards and surfaces
 * Muted         #3E4554  secondary text
 *
 * The neutral and blue-family scales below are remapped onto this palette so
 * every utility class in the product resolves to the system. Only red / amber /
 * green survive as restrained status colours (risk levels, success, warnings).
 */

// Navy-tinted neutrals: surfaces -> borders -> secondary text -> navy.
const neutral = {
  50: "#FDFEFE",
  100: "#EFF4FC",
  200: "#DDE5F2",
  300: "#C3CEE0",
  400: "#8D97AC",
  500: "#5C6577",
  600: "#3E4554",
  700: "#2C3342",
  800: "#1C2435",
  900: "#10182B",
  950: "#0A101F",
};

// The one accent ramp. Every blue/indigo/violet/purple/sky/cyan/teal maps here.
const blue = {
  50: "#F4F8FE",
  100: "#CCDEF9",
  200: "#BAD2F7",
  300: "#A2C1F9",
  400: "#82A9F8",
  500: "#4A7DEA",
  600: "#2762E5",
  700: "#1E4EBE",
  800: "#173068",
  900: "#142A55",
  950: "#10182B",
};

const green = {
  50: "#ECFAF3",
  100: "#D1F2E1",
  200: "#A7E5C6",
  300: "#6FD0A3",
  400: "#3DB681",
  500: "#1F9A67",
  600: "#158055",
  700: "#126746",
  800: "#115239",
  900: "#0F4330",
  950: "#07261B",
};

const amber = {
  50: "#FEF7EC",
  100: "#FCEBCD",
  200: "#F8D599",
  300: "#F2B95E",
  400: "#EA9E33",
  500: "#D4831A",
  600: "#B26914",
  700: "#8E5213",
  800: "#744315",
  900: "#613914",
  950: "#371E08",
};

const red = {
  50: "#FEF1F1",
  100: "#FDE0E0",
  200: "#FBC7C7",
  300: "#F7A2A2",
  400: "#EF6F6F",
  500: "#E14444",
  600: "#CE2A2A",
  700: "#AD2020",
  800: "#8F1E1E",
  900: "#771E1E",
  950: "#410B0B",
};

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FDFEFE",

        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          blue: "#2762E5",
          navy: "#10182B",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // Strict Trilegal AI Design Tokens
        trilegal: {
          primary: "#2762E5",
          primaryLight: "#82A9F8",
          primaryPale: "#CCDEF9",
          navy: "#10182B",
          navyBlue: "#173068",
          sidebar: "#10182B",
          blue: "#2762E5",
          purple: "#173068",
          green: "#158055",
          amber: "#B26914",
          red: "#CE2A2A",
          bg: "#EFF4FC",
          card: "#FDFEFE",
          text: "#10182B",
          muted: "#3E4554",
          border: "#DDE5F2",
        },

        // Neutrals — all remapped onto the navy-tinted ramp.
        slate: neutral,
        gray: neutral,
        zinc: neutral,
        neutral: neutral,
        stone: neutral,

        // Accents — collapsed into the single blue ramp.
        blue: blue,
        indigo: blue,
        violet: blue,
        purple: blue,
        fuchsia: blue,
        sky: blue,
        cyan: blue,
        teal: blue,

        // Restrained status colours.
        emerald: green,
        green: green,
        lime: green,
        amber: amber,
        yellow: amber,
        orange: amber,
        red: red,
        rose: red,
        pink: red,
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: "0.75rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Deliberately light — surfaces are separated by borders, not shadow.
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(16, 24, 43, 0.03)",
        card: "0 1px 2px 0 rgba(16, 24, 43, 0.04)",
        cardHover: "0 4px 12px -2px rgba(16, 24, 43, 0.06), 0 2px 4px -2px rgba(16, 24, 43, 0.03)",
        modal: "0 16px 40px -12px rgba(16, 24, 43, 0.14)",
      },
    },
  },
  plugins: [],
};
