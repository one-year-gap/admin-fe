import type { ReactNode } from "react";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-0 flex h-screen overflow-hidden">
      {/* 1. 사이드바 */}
      {/* <DummySideBar /> */}
      <SideBar />

      {/* 2. 메인 영역 */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* div 태그에  min-h-0 <- 필요 시 추가 */}
        {/* 3. 헤더바 */}
        {/* <DummyHeaderBar /> */}
        <Header />

        {/* 4. 페이지 콘텐츠 */}
        <main className="flex-1 overflow-y-auto bg-neutral-100 p-6">{children}</main>
        {/* <main className="flex-1 bg-neutral-100 p-6">
            <div className="grid grid-cols-12 gap-6">{children}</div>
          </main> */}
      </div>
    </div>
  );
}
