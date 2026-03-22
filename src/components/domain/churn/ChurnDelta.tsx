"use client";

import { useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCardSkeleton } from "@/components/common/skeletons/ChartCardSkeleton";
import { useChurnTrend } from "@/lib/tanstack/query/churn/useChurnTrend";

const COLOR_POS = "var(--danger-500)";
const COLOR_NEG = "var(--chart-2)";
const COLOR_ZERO = "var(--neutral-400)";

export function ChurnDelta() {
  const { data, isLoading, isError } = useChurnTrend();
  const [range, setRange] = useState<9 | 31>(9);

  const rawData = data?.data.data ?? [];
  const chartData = rawData.slice(-range).map((item) => ({
    date: item.date,
    delta: item.delta,
  }));

  if (isLoading) {
    return <ChartCardSkeleton variant="bars" controls titleWidth="w-40" subtitleWidth="w-56" />;
  }

  if (isError) {
    return (
      <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
        <div className="text-danger-500">데이터를 불러오는데 실패하였습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">이탈 위험군 증감 추이</h3>
          <p className="text-sm text-neutral-500">
            전일 대비 위험 고객 변화 (양수 증가 / 음수 감소)
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setRange(9)}
            className={`cursor-pointer rounded-md px-3 py-1 text-sm ${
              range === 9
                ? "bg-primary-500 text-white"
                : "bg-neutral-0 text-neutral-700 hover:bg-neutral-200"
            }`}>
            최근 9일
          </button>

          <button
            onClick={() => setRange(31)}
            className={`cursor-pointer rounded-md px-3 py-1 text-sm ${
              range === 31
                ? "bg-primary-500 text-white"
                : "bg-neutral-0 text-neutral-700 hover:bg-neutral-200"
            }`}>
            최근 한 달
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => String(value).slice(5).replace("-", "/")}
            />
            <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
            <ReferenceLine y={0} stroke="#9ca3af" />
            <Tooltip
              formatter={(value) => {
                const parsed = Number(value ?? 0);
                return [`${parsed > 0 ? "+" : ""}${parsed}명`, "증감"];
              }}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Bar dataKey="delta">
              {chartData.map((item, index) => (
                <Cell
                  key={index}
                  fill={item.delta > 0 ? COLOR_POS : item.delta < 0 ? COLOR_NEG : COLOR_ZERO}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
