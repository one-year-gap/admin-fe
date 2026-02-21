"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";

interface StatusItem {
  name: string;
  value: number;
  fill: string;
}

const data: StatusItem[] = [
  { name: "완료", value: 600, fill: "#5865D8" },
  { name: "진행중", value: 200, fill: "#E4C062" },
  { name: "미처리", value: 85, fill: "#E53935" },
];

const total = data.reduce((acc, cur) => acc + cur.value, 0);

export default function StatusDonutChart() {
  return (
    <div className="flex items-center justify-between">
      <div className="relative aspect-square w-65">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              stroke="none"
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-2xl font-bold">{total}</span>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.fill }} />
            <span className="font-medium text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
