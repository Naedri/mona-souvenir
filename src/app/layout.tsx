import "./globals.css";

import { Providers } from "./providers";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "mona-souvenir",
  description: "Museum artwork explorer",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
