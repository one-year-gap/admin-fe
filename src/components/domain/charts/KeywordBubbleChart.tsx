"use client";

import { useCounselKeywords } from "@/lib/tanstack/query/useCounselKeywords";

interface Item {
  name: string;
  value: number;
}

const FONT_SCALE_RATIO = 0.12;

export default function KeywordBubbleChart() {
  const { data, isLoading } = useCounselKeywords(2026, 3);

  if (isLoading) return <div>Loading...</div>;

  const items: Item[] =
    data?.map((d) => ({
      name: d.keywordName,
      value: d.totalCount,
    })) ?? [];

  const max = Math.max(...items.map((d) => d.value));
  const minSize = 60;
  const maxSize = 140;

  const scale = (v: number) => (v / max) * (maxSize - minSize) + minSize;

  return (
    <div className="w-full rounded-xl bg-neutral-100 py-12">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {items.map((item) => {
          const size = scale(item.value);
          return <Bubble key={item.name} item={item} size={size} />;
        })}
      </div>
    </div>
  );
}

function Bubble({ item, size }: { item: Item; size: number }) {
  return (
    <div
      className="border-primary-500 bg-primary-100 text-primary-700 flex items-center justify-center rounded-full border-4 font-semibold transition-transform duration-300 hover:scale-105"
      style={{
        width: size,
        height: size,
        fontSize: size * FONT_SCALE_RATIO,
      }}>
      <div className="text-center">
        <div>{item.name}</div>
        <div className="mt-1 text-xs opacity-70">{item.value.toLocaleString()}건</div>
      </div>
    </div>
  );
}
