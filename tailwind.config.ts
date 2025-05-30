import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '440px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'index-background': "url('/images/background.png')"
      },
      colors: {
        'charcoal': 'rgb(22, 37, 33)',
        'gray1': 'rgb(50,61,60)',
        'navy': 'rgb(29,51,61)',
        'aqua1': 'rgb(158, 239, 229)',
        'blue1': '#4F7CAC',
      },
      
    },
  },
  plugins: [],
} satisfies Config;