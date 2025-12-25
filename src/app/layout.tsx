import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Wrapped 2025 - Celebrate Your Coding Journey",
  description:
    "Create beautiful, AI-powered summaries of your GitHub activity in 2025. Download and share your year in code with stunning cards.",
  keywords: [
    "GitHub",
    "Wrapped",
    "GitHub Stats",
    "Developer Wrapped",
    "GitHub Summary",
    "2025",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "GitHub Wrapped 2025",
    description:
      "Celebrate your coding journey with beautiful, shareable cards",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Wrapped 2025",
    description:
      "Celebrate your coding journey with beautiful, shareable cards",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
