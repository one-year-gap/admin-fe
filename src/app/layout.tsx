import "./globals.css";

import localFont from "next/font/local";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { TanstackProvider } from "@/lib/tanstack/provider";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <TanstackProvider>
          <div className="flex min-h-screen">
            <SideBar />
            <div className="ml-70 flex flex-1 flex-col">
              <Header />
              <main className="flex h-full w-full overflow-hidden bg-neutral-200">{children}</main>
            </div>
          </div>
        </TanstackProvider>
      </body>
    </html>
  );
}
