import type { ReactNode } from "react";

import { DummyHeaderbar } from "@/components/common/DummyHeaderbar";
import { DummySidebar } from "@/components/common/DummySidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <DummySidebar />

        {/* Main */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <DummyHeaderbar />

          {/* Content */}
          <main className="flex-1 p-8">
            {/* 그리드 -> 컬럼: 12개 + 거터: 32px */}
            <div className="grid grid-cols-12 gap-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
