import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Green: "#1fdf64",
        Black: "#000",
        DeepNightBlack: "#121212",
        MidNightBlack: "#181818",
        EveningBlack: "#1a1a1a",
        DarkGray: "#282828",
        SlateGray: "#404040",
        LightGray: "#959595",
        SilverGray: "#B3B3B3",
        Snow: "#ffffff",
      },
      fontFamily: {
        IR_Aviny: "IR-Aviny",
        IR_Sans: "IR-Sans",
        "cascadia-normal": ["cascadia-normal"],
        circular: ["circular-normal", "sans-serif"],
        "circular-light": ["circular-light", "sans-serif"],
        "circular-normal": ["circular-normal", "sans-serif"],
        "circular-medium": ["circular-medium", "sans-serif"],
        "circular-bold": ["circular-bold", "sans-serif"],
      },
    },
  },
} satisfies Config;
