"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useSupportStats } from "@/lib/tanstack/query/useSupportStats";

interface StatusItem {
  name: string;
  value: number;
  fill: string;
}

export default function StatusDonutChart() {
  const { data, isLoading, isError } = useSupportStats();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error</div>;

  const chartData: StatusItem[] = [
    { name: "완료", value: data.closedCount, fill: "var(--color-primary-500)" },
    { name: "진행중", value: data.supportingCount, fill: "#E4C062" },
    { name: "미처리", value: data.openCount, fill: "#E53935" },
  ];

  const total = data.totalCount;

  return (
    <div className="flex items-center justify-between">
      <div className="relative aspect-square w-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              stroke="none">
              {chartData.map((entry, index) => (
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
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.fill }} />
            <span className="font-medium text-neutral-700">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
