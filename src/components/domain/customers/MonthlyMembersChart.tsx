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

import { ChartCardSkeleton } from "@/components/common/skeletons/ChartCardSkeleton";
import { useMonthlyMembersChart } from "@/lib/tanstack/query/useMonthlyMembersChart";
import type { MonthlyMembers } from "@/models/customers/monthlyMembersChart";

export function MonthlyMembersChart() {
  const { data, isLoading, isError } = useMonthlyMembersChart();

  const chartData =
    data?.data.map((item: MonthlyMembers) => ({
      month: item.month,
      joined: item.joinedCount,
      left: item.leftCount,
    })) ?? [];

  if (isLoading) {
    return <ChartCardSkeleton variant="line" titleWidth="w-40" subtitleWidth="w-24" />;
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
            <XAxis
              dataKey="month"
              tickFormatter={(value) => {
                const text = typeof value === "string" ? value : String(value ?? "");
                return text.length >= 7 ? text.slice(5, 7) : text;
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`${Number(value ?? 0).toLocaleString()}명`, name]}
              labelFormatter={(label) => `월: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="joined"
              name="가입자"
              stroke="var(--secondary-500)"
              strokeWidth={2}
            />
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
