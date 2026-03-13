"use client";

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

import { usePersonaDistribution } from "@/lib/tanstack/query/usePersonaDistribution";

type ChartItem = {
  name: string;
  value: number;
  topPlans: string[];
  userCount: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: ChartItem;
  }>;
};

const COLORS = ["#6366F1", "#10B981", "#8B5CF6", "#EC4899", "#F59E0B", "#6B7280"];

const personaLabelMap: Record<string, string> = {
  SPACE_GUARDIAN: "보안 유저",
  SPACE_EXPLORER: "탐색 유저",
  SPACE_SURFER: "데이터 헤비 유저",
  SPACE_SHERLOCK: "혜택 유저",
  SPACE_OCTOPUS: "멀티 디바이스 유저",
  SPACE_GRAVITY: "가족 유저",
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="w-64 rounded-md border border-neutral-200 bg-white p-4 text-sm shadow-md">
      <p className="mb-1 font-semibold text-neutral-800">{data.name}</p>

      <p className="mb-3 text-xs text-neutral-400">해당 유형의 요금제 Top 3</p>

      <div className="space-y-2">
        {data.topPlans.map((plan, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="bg-primary-500 h-2 w-2 rounded-full" />
            <span className="text-neutral-700">{plan}</span>
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-neutral-200" />

      <div className="flex justify-between">
        <span className="text-neutral-600">총 사용자수</span>
        <span className="font-semibold text-neutral-800">{data.userCount.toLocaleString()}명</span>
      </div>
    </div>
  );
}

export default function PersonaBarChart() {
  const { data } = usePersonaDistribution();

  const chartData: ChartItem[] =
    data?.map((item) => ({
      name: personaLabelMap[item.personaName] ?? item.personaName,
      value: item.percentage,
      topPlans: item.top3PlanNames,
      userCount: item.userCount,
    })) ?? [];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="35%">
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis domain={[0, 30]} />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />

          <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={120}>
            {chartData.map((item, index) => (
              <Cell key={`${item.name}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
