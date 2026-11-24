import type { Config } from "tailwindcss";

/**
 * Identidade da parceria: predominância Aprender (verdes e preto do logo oficial),
 * com o Fala Tio como parceiro tecnológico (azul e laranja da marca, usados com moderação).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "Arial", "sans-serif"],
        titulo: ["var(--font-recursive)", "var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        ap: {
          // verdes do logo da Aprender
          verde: "#81bc44",
          lima: "#bbd152",
          folha: "#cde2b5",
          // tons derivados para texto/botões com contraste AA sobre branco
          escuro: "#2f6a14",
          medio: "#3f7d1c",
          fundo: "#f4f9ec",
          tinta: "#1d1d1b",
        },
        ft: {
          azul: "#0022D1",
          laranja: "#FF6428",
          marinho: "#071056",
        },
      },
    },
  },
  plugins: [],
};
export default config;
