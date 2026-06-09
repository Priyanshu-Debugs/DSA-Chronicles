import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/Auth/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://dsa-chronicles.vercel.app")
  ),
  title: "DSA Chronicles",
  description: "A platform to practice DSA problems, sync progress, and learn patterns.",
  openGraph: {
    title: "DSA Chronicles",
    description: "A platform to practice DSA problems, sync progress, and learn patterns.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DSA Chronicles",
    description: "A platform to practice DSA problems, sync progress, and learn patterns.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neoCream">
        <AuthContextProvider>
          <AuthGuard>
            <Navbar />
            <div className="flex-1 w-full">{children}</div>
          </AuthGuard>
        </AuthContextProvider>
      </body>
    </html>
  );
}

