import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Question Boards - Ask, Discuss & Learn",
  description:
    "Join Question Boards to ask questions, share knowledge, and engage in insightful discussions with a vibrant community of learners and experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} font-inter antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


