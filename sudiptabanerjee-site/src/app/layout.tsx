import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GTMClient from "./components/GTMClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sudiptabanerjee.com"),
  title: "Sudipta Banerjee: Bridging Technology & Leadership",
  description: "Hello, I'm Sudipta. Bridging the gap between complex technology and strategic leadership. I specialize in leading hybrid teams in the AI-augmented era.",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "sudiptabanerjee.com",
  },
  openGraph: {
    title: "Sudipta Banerjee: Bridging Technology & Leadership",
    description: "Hello, I'm Sudipta. Bridging the gap between complex technology and strategic leadership. I specialize in leading hybrid teams in the AI-augmented era.",
    url: "https://www.sudiptabanerjee.com",
    siteName: "Sudipta Banerjee",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Sudipta Banerjee - Leadership in Technology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudipta Banerjee: Bridging Technology & Leadership",
    description: "Hello, I'm Sudipta. Bridging the gap between complex technology and strategic leadership. I specialize in leading hybrid teams in the AI-augmented era.",
    creator: "@sudipta2707",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM noscript (keeps tracking available when JS is disabled) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TN54WWK3"}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Client-only GTM loader: initializes dataLayer, loads gtm.js and pushes SPA page_view events */}
        <GTMClient />

        {children}
      </body>
    </html>
  );
}
