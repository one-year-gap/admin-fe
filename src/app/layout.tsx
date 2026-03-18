import "./globals.css";

import localFont from "next/font/local";

import { Toaster } from "sonner";

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
          {children}
          <Toaster position="top-center" richColors />
        </TanstackProvider>
      </body>
    </html>
  );
}
