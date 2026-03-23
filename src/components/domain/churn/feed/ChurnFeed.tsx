"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { FeedCardSkeleton } from "@/components/common/skeletons/FeedCardSkeleton";
import { useChurnLatest } from "@/lib/tanstack/query/churn/useChurnLatest";
import type {
  ChurnLatestItem,
  ChurnLatestLevel,
  ChurnLatestResponse,
} from "@/models/churn/churnLatest";
import { getChurnChanges } from "@/services/churn/getChurnChanges";

import { ChurnRow } from "./ChurnRow";

const FEED_LEVELS: ChurnLatestLevel[] = ["HIGH", "MEDIUM"];
const INITIAL_LIMIT = 50;
const POLLING_LIMIT = 100;
const MAX_ITEMS = 100;

function toRowLevel(level: ChurnLatestItem["churnLevel"]) {
  return level === "HIGH" ? "고위험" : "경고";
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

function getItemKey(item: ChurnLatestItem) {
  return `${item.churnId}-${item.memberId}-${item.timeStamp}`;
}

function mergeChurnItems(nextItems: ChurnLatestItem[], currentItems: ChurnLatestItem[]) {
  const deduped = new Map<string, ChurnLatestItem>();

  for (const item of [...nextItems, ...currentItems]) {
    deduped.set(getItemKey(item), item);
  }

  return Array.from(deduped.values()).slice(0, MAX_ITEMS);
}

export function ChurnFeed() {
  const queryClient = useQueryClient();
  const latestParams = {
    limit: INITIAL_LIMIT,
    level: FEED_LEVELS,
  };

  const { data, isLoading, isError } = useChurnLatest(latestParams);
  const items = data?.data.items ?? [];
  const afterId = items.length === 0 ? 0 : (data?.data.afterId ?? 0);

  useQuery({
    queryKey: ["churnChangesPolling", { ...latestParams, afterId, limit: POLLING_LIMIT }],
    enabled: !!data,
    retry: 0,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const response = await getChurnChanges({
        afterId,
        limit: POLLING_LIMIT,
        level: FEED_LEVELS,
      });

      queryClient.setQueryData<ChurnLatestResponse>(["churnLatest", latestParams], (current) => {
        if (!current) {
          return current;
        }

        const nextItems = response.data.items;

        return {
          ...current,
          data: {
            ...current.data,
            items:
              nextItems.length === 0
                ? current.data.items
                : mergeChurnItems(nextItems, current.data.items),
            afterId: nextItems.length === 0 ? current.data.afterId : response.data.afterId,
            hasMore: response.data.hasMore,
          },
        };
      });

      return response;
    },
  });

  if (isLoading) {
    return <FeedCardSkeleton />;
  }

  return (
    <div className="bg-neutral-0 flex flex-col gap-4 rounded-xl border border-neutral-300 p-6">
      <h3 className="text-lg font-semibold text-neutral-900">실시간 이탈 고객 피드</h3>

      <div className="flex h-[669px] px-6">
        <div className="h-full w-px bg-neutral-300"></div>

        <div className="w-full overflow-auto py-6">
          {isError ? (
            <div className="px-4 text-sm text-neutral-500">
              이탈 고객 피드를 불러오지 못했습니다.
            </div>
          ) : items.length === 0 ? (
            <div className="px-4 text-sm text-neutral-500">표시할 이탈 고객이 없습니다.</div>
          ) : (
            items.map((item) => (
              <ChurnRow
                key={getItemKey(item)}
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
