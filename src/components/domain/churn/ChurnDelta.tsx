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

import { useChurnTrend } from "@/lib/tanstack/query/churn/useChurnTrend";

const COLOR_POS = "var(--danger-500)";
const COLOR_NEG = "var(--chart-2)";
const COLOR_ZERO = "var(--neutral-400)";

export function ChurnDelta() {
  const { data, isLoading } = useChurnTrend();

  const [range, setRange] = useState<9 | 31>(9);

  const rawData = data?.data.data ?? [];

  const chartData = rawData.slice(-range).map((d) => ({
    date: d.date,
    delta: d.delta,
  }));

  if (isLoading) {
    return (
      <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
        <div className="text-neutral-500">차트 로딩중...</div>
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

        {/* 기간 선택 */}
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

            <XAxis dataKey="date" tickFormatter={(v) => v.slice(5).replace("-", "/")} />

            <YAxis domain={["dataMin - 1", "dataMax + 1"]} />

            {/* 기준선 */}
            <ReferenceLine y={0} stroke="#9ca3af" />

            <Tooltip
              formatter={(value) => {
                const v = Number(value ?? 0);
                return [`${v > 0 ? "+" : ""}${v}명`, "증감"];
              }}
              labelFormatter={(label) => `날짜: ${label}`}
            />

            <Bar dataKey="delta">
              {chartData.map((d, idx) => (
                <Cell
                  key={idx}
                  fill={d.delta > 0 ? COLOR_POS : d.delta < 0 ? COLOR_NEG : COLOR_ZERO}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
