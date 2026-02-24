"use client";

interface Item {
  name: string;
  value: number;
}

const data: Item[] = [
  { name: "로밍", value: 300 },
  { name: "할인", value: 240 },
  { name: "속도", value: 120 },
  { name: "데이터", value: 260 },
  { name: "약정", value: 220 },
  { name: "결합", value: 180 },
  { name: "멤버십", value: 200 },
];

const FONT_SCALE_RATIO = 0.12;

export default function KeywordBubbleChart() {
  const max = Math.max(...data.map((d) => d.value));
  const minSize = 60;
  const maxSize = 140;

  const scale = (v: number) => (v / max) * (maxSize - minSize) + minSize;

  return (
    <div className="w-full rounded-xl bg-neutral-100 py-12">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {data.map((item) => {
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
