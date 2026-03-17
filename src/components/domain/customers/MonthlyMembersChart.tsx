"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useMonthlyMembersChart } from "@/lib/tanstack/query/useMonthlyMembersChart";
import type { MonthlyMembers } from "@/models/customers/monthlyMembersChart";

export function MonthlyMembersChart() {
  const { data, isLoading, isError } = useMonthlyMembersChart();

  const chartData =
    data?.data.map((d: MonthlyMembers) => ({
      month: d.month,
      joined: d.joinedCount,
      left: d.leftCount,
    })) ?? [];

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
        <div className="text-danger-500">차트 불러오기 실패</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">월별 가입/탈퇴 추이</h3>
        <p className="text-sm text-neutral-500">최근 월 기준</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

            {/* X축: 월 */}
            <XAxis
              dataKey="month"
              tickFormatter={(v) => v.slice(5)} // MM만 표시
            />

            <YAxis />

            <Tooltip
              formatter={(value, name) => [`${Number(value ?? 0).toLocaleString()}명`, name]}
              labelFormatter={(label) => `월: ${label}`}
            />

            {/* 가입자 라인 */}
            <Line
              type="monotone"
              dataKey="joined"
              name="가입자"
              stroke="var(--secondary-500)"
              strokeWidth={2}
            />

            {/* 탈퇴자 라인 */}
            <Line
              type="monotone"
              dataKey="left"
              name="탈퇴자"
              stroke="var(--danger-500)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
