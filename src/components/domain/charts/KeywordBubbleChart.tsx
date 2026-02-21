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
  { name: "로밍2", value: 280 },
  { name: "약정", value: 220 },
  { name: "결합", value: 180 },
  { name: "로밍3", value: 200 },
  { name: "로밍4", value: 210 },
];

const FONT_SCALE_RATIO = 0.11;

export default function KeywordBubbleChart() {
  const max = Math.max(...data.map((d) => d.value));
  const minSize = 60;
  const maxSize = 140;

  const scale = (v: number) => (v / max) * (maxSize - minSize) + minSize;

  return (
    <div className="w-full rounded-xl bg-[#ededed] py-16">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-end justify-center gap-8">
          {data.slice(0, 5).map((item) => {
            const size = scale(item.value);
            return <Bubble key={item.name} item={item} size={size} />;
          })}
        </div>
        <div className="-mt-12 flex items-start justify-center gap-8">
          {data.slice(5).map((item) => {
            const size = scale(item.value);
            return <Bubble key={item.name} item={item} size={size} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Bubble({ item, size }: { item: Item; size: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full border-4 border-blue-500 bg-blue-200/60 font-semibold text-blue-600 transition-transform duration-300 hover:scale-105"
      style={{
        width: size,
        height: size,
        fontSize: size * FONT_SCALE_RATIO,
      }}>
      <div className="text-center">
        <div>{item.name}</div>
        <div className="mt-1 text-xs opacity-70">2654건</div>
      </div>
    </div>
  );
}
