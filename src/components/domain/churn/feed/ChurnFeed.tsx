import React from "react";

import { Clock } from "lucide-react";

import { ChurnRow } from "./ChurnRow";

export function ChurnFeed() {
  return (
    <div className="bg-neutral-0 flex flex-col gap-4 rounded-xl border border-neutral-300 p-6">
      <h3 className="text-lg font-semibold text-neutral-900">실시간 이탈 고객 피드</h3>

      <div className="flex h-74 px-6">
        <div className="h-full w-px bg-neutral-300"></div>

        <div className="w-full overflow-auto py-6">
          <ChurnRow />

          <div className="flex flex-col gap-2 border-t border-neutral-300 px-4 pt-2 pb-4 text-sm text-neutral-700">
            <section className="flex items-center gap-6">
              <div className="text-neutral-0 bg-warning-500 rounded-full px-3 py-1">경고</div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span>09:58</span>
              </div>
            </section>
            <section className="text-md pl-2 font-medium text-neutral-900">박*이님</section>
            <section className="pl-1">부정 감정 상담 1회 누적</section>
          </div>

          <div className="flex flex-col gap-2 border-t border-neutral-300 px-4 pt-2 pb-4 text-sm text-neutral-700">
            <section className="flex items-center gap-6">
              <div className="text-neutral-0 bg-danger-500 rounded-full px-3 py-1">위험</div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span>09:30</span>
              </div>
            </section>
            <section className="text-md pl-2 font-medium text-neutral-900">이*빈님</section>
            <section className="pl-1">해지 위약금 키워드 검색</section>
          </div>
        </div>
      </div>
    </div>
  );
}
