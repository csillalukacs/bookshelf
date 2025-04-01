import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
  title: "Create Next App",
  description: "Generated by create next app",
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
          <NavBar/>
          <div 
            className="bg-orange-50 container w-m mx-auto h-xxl p-4">
            <main className="flex flex-col gap-2 row-start-2 items-center">
              <Image
                src="/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg"
                alt="books"
                width={357}
                height={200}
                priority
              />
              <div>
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                </div>
              </div>
              {children}
            </main>
          </div>
        </SessionProvider>
        </div>
      </body>
    </html>
  );
}
