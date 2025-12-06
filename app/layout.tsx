import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { Inter } from "next/font/google"; // Or keep local if preferred, but Inter is standard for Pro apps

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oil Sense - 국내 유가 예측",
  description: "국내 휘발유 및 경유 가격 예측 및 분석 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-[var(--bg-main)]">
          <Sidebar />
          <TopBar />
          <main className="lg:ml-64 p-6 lg:p-10 relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
