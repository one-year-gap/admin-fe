"use client";

import { useState } from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChurnTrend } from "@/lib/tanstack/query/churn/useChurnTrend";

export function ChurnTotal() {
  const { data, isLoading, isError } = useChurnTrend();

  const [range, setRange] = useState<9 | 31>(9);

  const rawData = data?.data.data ?? [];

  const chartData = rawData.slice(-range).map((d) => ({
    date: d.date,
    riskCount: d.riskCount,
  }));

  if (isLoading) {
    return (
      <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
        <div className="text-neutral-500">차트 로딩중...</div>
      </div>
    );
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
          <h3 className="text-lg font-semibold text-neutral-900">날짜 별 이탈 위험 고객 수</h3>
          <p className="text-sm text-neutral-500">일자 별 누적 위험 고객 수</p>
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
          <LineChart data={chartData}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

            <XAxis dataKey="date" tickFormatter={(v) => String(v).slice(5).replace("-", "/")} />

            <YAxis domain={[0, "dataMax + 1"]} />

            <Tooltip
              formatter={(value) => [`${Number(value ?? 0)}명`, "위험 고객 수"]}
              labelFormatter={(label) => `날짜: ${label}`}
            />

            <Line
              type="monotone"
              dataKey="riskCount"
              name="이탈 위험 고객 수"
              stroke="var(--color-primary-500)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
