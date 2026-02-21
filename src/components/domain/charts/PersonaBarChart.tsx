"use client";

import type { TooltipProps } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MOCK_TOP_PLANS = [
  { name: "저렴이 요금제", users: 3245, percent: 40 },
  { name: "저렴이 요금제", users: 2124, percent: 35 },
  { name: "저렴이 요금제", users: 1234, percent: 25 },
];

const MOCK_TOTAL_USERS = 6607;

type ChartItem = {
  name: string;
  value: number;
};

const data: ChartItem[] = [
  { name: "데이터 헤비 유저", value: 25 },
  { name: "실속형", value: 20 },
  { name: "비즈니스", value: 18 },
  { name: "소셜", value: 15 },
  { name: "게이밍", value: 12 },
  { name: "베이직", value: 10 },
];

const COLORS = ["#6366F1", "#10B981", "#8B5CF6", "#EC4899", "#F59E0B", "#6B7280"];

function CustomTooltip({ active }: TooltipProps<number, string>) {
  if (!active) return null;

  return (
    <div
      className="w-60 rounded-md border border-gray-200 bg-white p-4 text-sm"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <p className="mb-1 font-semibold text-gray-800">데이터 절약 유저</p>

      <p className="mb-3 text-xs text-gray-400">데이터 절약 유저의 요금제 Top 3</p>

      <div className="space-y-2">
        {MOCK_TOP_PLANS.map((plan, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-gray-700">{plan.name}</span>
            </div>

            <div className="flex gap-1">
              <span className="text-gray-700">{plan.users.toLocaleString()}명</span>
              <span className="text-blue-600">({plan.percent}%)</span>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-gray-200" />

      <div className="flex justify-between">
        <span className="text-gray-600">총 사용자수</span>
        <span className="font-semibold text-gray-800">{MOCK_TOTAL_USERS.toLocaleString()}명</span>
      </div>
    </div>
  );
}

export default function PersonaBarChart() {
  return (
    <div className="h-65 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="35%">
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 28]} />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />

          <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={120}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
