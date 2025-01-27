/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  /** @type {import('tailwindcss').Config} */
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Add your preferred themes
  },
};
