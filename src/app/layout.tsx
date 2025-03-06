import { cn } from "@/lib/utils";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: true,
});

const oswald = localFont({
  src: "../../public/assets/fonts/OswaldVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-oswald",
  preload: true,
});

export const metadata: Metadata = {
  title: "BR.DEV",
  description: "BORA KIM 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(oswald.variable, pretendard.variable)}>
        {children}
      </body>
    </html>
  );
}
