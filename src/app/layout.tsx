import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const general = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  weight: "100 900",
  variable: "--font-general",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const description =
  "Software engineer, 3 years. Ships full-stack products on microservices architecture and AI integrations — from RAG document agents to offline-first logistics software for the Indian Army.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abhirajghosh.tech"),
  title: {
    default: "Abhiraj Ghosh — Software Engineer",
    template: "%s — Abhiraj Ghosh",
  },
  description,
  keywords: [
    "Abhiraj Ghosh",
    "Software Engineer",
    "Full-stack developer",
    "Microservices",
    "AI integrations",
    "RAG",
    "Next.js",
    "Node.js",
    "Chandigarh",
  ],
  authors: [{ name: "Abhiraj Ghosh", url: "https://www.abhirajghosh.tech" }],
  creator: "Abhiraj Ghosh",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Abhiraj Ghosh",
    title: "Abhiraj Ghosh — Software Engineer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiraj Ghosh — Software Engineer",
    description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#151516",
};

// Runs before first paint: if the intro already played this session,
// hide the preloader instantly so it never flashes for repeat views.
const introGuard = `try{if(sessionStorage.getItem('ag:intro'))document.documentElement.classList.add('intro-seen')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${general.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGuard }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-bg-deep focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-fg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
