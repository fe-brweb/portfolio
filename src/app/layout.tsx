import AppLayout from "@/components/AppLayout";
import AppWheelNav from "@/components/ui/AppWheelNav";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";

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
        {/* <AppSmoothScroll> */}
        <div className="flex w-full flex-col bg-primary">
          <AppLayout>{children}</AppLayout>
          <AppWheelNav />
        </div>
        {/* </AppSmoothScroll> */}
      </body>
    </html>
  );
}
