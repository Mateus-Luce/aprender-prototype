import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const recursive = localFont({ src: "./recursive.ttf", variable: "--font-recursive", display: "swap" });

export const metadata: Metadata = {
  title: "Aprender + Fala Tio | Protótipo",
  description: "Protótipo navegável da plataforma de aprendizagem Aprender + Fala Tio. Dados fictícios.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${recursive.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
