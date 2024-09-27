import type { Metadata } from "next";
import "reflect-metadata";
import "./globals.css";
import Providers from "./providers";
import NavaBar from "./sections/NavaBar";
import { Cormorant_Garamond, Raleway } from "next/font/google";

const comorantFont = Cormorant_Garamond({
  weight: ["300", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-comorant",
  subsets: [],
});

const raleWay = Raleway({
  weight: ["100", "300", "500", "800"],
  style: ["italic", "normal"],
  subsets: [],
  variable: "--font-raleway",
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
      <body className={`${comorantFont.variable} ${raleWay.variable}`}>
        <Providers>
          <NavaBar style="light" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
