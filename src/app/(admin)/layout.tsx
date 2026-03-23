import type { ReactNode } from "react";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full min-w-[1200px] overflow-x-auto overflow-y-hidden">
      <SideBar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-neutral-200 p-6">{children}</main>
      </div>
    </div>
  );
}
