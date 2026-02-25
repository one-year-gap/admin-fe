import React from "react";

import { ChurnRow } from "./ChurnRow";

export function ChurnFeed() {
  return (
    <div className="bg-neutral-0 flex flex-col gap-4 rounded-xl border border-neutral-300 p-6">
      <h3 className="text-lg font-semibold text-neutral-900">실시간 이탈 고객 피드</h3>

      <div className="flex h-74 px-6">
        <div className="h-full w-px bg-neutral-300"></div>

        <div className="w-full overflow-auto py-6">
          <ChurnRow level="위험" time="10:28" name="박*형" reason="해지 위약금 키워드 검색" />
          <ChurnRow level="경고" time="09:57" name="박*이" reason="부정 감정 상담 1회 누적" />
          <ChurnRow level="위험" time="09:30" name="이*빈" reason="해지 위약금 키워드 검색" />
        </div>
      </div>
    </div>
  );
}
