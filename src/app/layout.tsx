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
          <div className="flex h-screen w-full overflow-hidden">
            <SideBar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="overflow-aut flex-1 bg-neutral-200">{children}</main>
            </div>
          </div>
        </TanstackProvider>
      </body>
    </html>
  );
}
