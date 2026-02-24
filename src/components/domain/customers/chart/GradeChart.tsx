"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface StatusItem {
  name: string;
  value: number;
  fill: string;
}

const data: StatusItem[] = [
  { name: "우수", value: 5200, fill: "var(--color-chart-3)" },
  { name: "VIP", value: 3400, fill: "var(--color-chart-1)" },
  { name: "VVIP", value: 800, fill: "var(--color-chart-2)" },
];

const total = data.reduce((acc, cur) => acc + cur.value, 0);

export function GradeChart({ isFiltered }: { isFiltered: boolean }) {
  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-neutral-900">등급별 고객 분포도</h3>
        <p className="text-sm text-neutral-500">
          {isFiltered ? "필터링된 고객 기준" : "전체 고객 기준"}
        </p>
      </div>

      <div className="flex items-center justify-evenly">
        <div className="relative aspect-square w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                stroke="none">
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-neutral-500">Total</span>
            <span className="text-2xl font-bold">{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="font-medium text-neutral-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
