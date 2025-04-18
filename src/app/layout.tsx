import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Bookshelf',
    default: 'Bookshelf',
  },
  description: "Let your friends browse your books.",
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
        <div className="">
          <SessionProvider>
            <NavBar />
            <div
              className="bg-white container w-[70%] mx-auto p-4 shadow-md min-h-screen font-family-[var(--font-body)]" >
              <main className="flex flex-col gap-3 row-start-2 items-start">
                {children}
              </main>
            </div>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
