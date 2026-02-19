import type { ReactNode } from "react";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-0 min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar column */}
        <div className="w-70 shrink-0">
          <SideBar />
        </div>

        {/* Main column */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Header */}
          <Header />

          {/* Content */}
          <main className="min-h-0 flex-1 overflow-y-auto bg-neutral-100 p-6">{children}</main>
          {/* <main className="flex-1 bg-neutral-100 p-6">
            <div className="grid grid-cols-12 gap-6">{children}</div>
          </main> */}
        </div>
      </div>
    </div>
  );
}
