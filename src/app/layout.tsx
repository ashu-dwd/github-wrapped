import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
