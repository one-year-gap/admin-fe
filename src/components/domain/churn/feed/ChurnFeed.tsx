"use client";

import { useChurnLatest } from "@/lib/tanstack/query/churn/useChurnLatest";
import type { ChurnLatestItem } from "@/models/churn/churnLatest";

import { ChurnRow } from "./ChurnRow";

function toRowLevel(level: ChurnLatestItem["churnLevel"]) {
  return level === "HIGH" ? "위험" : "경고";
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function ChurnFeed() {
  const { data, isLoading, isError } = useChurnLatest({
    limit: 50,
    level: ["HIGH", "MEDIUM"],
  });

  const items = data?.data.items ?? [];

  return (
    <div className="bg-neutral-0 flex flex-col gap-4 rounded-xl border border-neutral-300 p-6">
      <h3 className="text-lg font-semibold text-neutral-900">실시간 이탈 고객 피드</h3>

      <div className="flex h-[669px] px-6">
        <div className="h-full w-px bg-neutral-300"></div>

        <div className="w-full overflow-auto py-6">
          {isLoading ? (
            <div className="px-4 text-sm text-neutral-500">불러오는 중...</div>
          ) : isError ? (
            <div className="px-4 text-sm text-neutral-500">
              이탈 고객 피드를 불러오지 못했습니다.
            </div>
          ) : items.length === 0 ? (
            <div className="px-4 text-sm text-neutral-500">표시할 이탈 고객이 없습니다.</div>
          ) : (
            items.map((item) => (
              <ChurnRow
                key={`${item.churnId}-${item.memberId}-${item.timeStamp}`}
                level={toRowLevel(item.churnLevel)}
                time={formatTime(item.timeStamp)}
                name={item.memberName}
                reason={item.reason}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
