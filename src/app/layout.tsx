import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { ThemeProvider } from "@/contexts/ThemeContext"; // Re-import the ThemeProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cosmos - AI Technology",
  description: "Engineering the Future with Artificial Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The hardcoded "dark" class has been removed from here
    <html lang="en" className="!scroll-smooth">
      <body className={inter.className}>
        {/* The ThemeProvider must wrap all components that use the theme */}
        <ThemeProvider>
          <ParticleBackground />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
