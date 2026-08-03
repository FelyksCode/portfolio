import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { ChunkLoadGuard } from "./chunk-load-guard";
import { LanguageProvider } from "./components/language-provider";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  preload: false,
});

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  preload: false,
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://felixivander.vercel.app"),
  title: "Felix Ivander — Software Engineer",
  description:
    "Final-year Informatics Engineering student at Universitas Multimedia Nusantara building full-stack business applications with Laravel — REST APIs, React/Next.js frontends, Flutter, and ML research in clinical mortality prediction.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Felix Ivander — Software Engineer",
    description:
      "Final-year Informatics Engineering student at Universitas Multimedia Nusantara building full-stack business applications with Laravel — REST APIs, React/Next.js frontends, Flutter, and ML research in clinical mortality prediction.",
    url: "https://felixivander.vercel.app",
    siteName: "Felix Ivander",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("felix-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light";var l=localStorage.getItem("felix-lang");var v=l==="id"?"id":"en";window.__LANG__=v;document.documentElement.lang=v;}catch(e){try{window.__LANG__="en";}catch(_){}}})();`,
          }}
        />
        <ChunkLoadGuard />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
