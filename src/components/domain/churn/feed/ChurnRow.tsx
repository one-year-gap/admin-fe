import React from "react";

import { Clock } from "lucide-react";

export function ChurnRow() {
  return (
    <div className="flex flex-col gap-2 border-t border-neutral-300 px-4 pt-2 pb-4 text-sm text-neutral-700">
      <section className="flex items-center gap-6">
        <div className="text-neutral-0 bg-danger-500 rounded-full px-3 py-1">위험</div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5" />
          <span>10:28</span>
        </div>
      </section>
      <section className="text-md pl-2 font-medium text-neutral-900">박*형님</section>
      <section className="pl-1">위험 사유 (ex- 해지 위약금 키워드 검색)</section>
    </div>
  );
}
