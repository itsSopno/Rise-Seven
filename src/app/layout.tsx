import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import {RiseHeader} from "@/components/header/RiseHeader"
import TopBanner from "@/components/home/topBanner/topbanner";
export const metadata: Metadata = {
  title: "Rise at Seven Clone",
  description: "Header, navbar and mobile hamburger recreation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <TopBanner></TopBanner>
          <RiseHeader />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
