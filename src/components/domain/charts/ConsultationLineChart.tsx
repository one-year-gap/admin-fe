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

import { useCounselTrafficDaily } from "@/lib/tanstack/query/useCounselTrafficDaily";

function getKstYYYYMMDD() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

type ChartPoint = { time: string; count: number };

function to24HoursChartData(items?: { hour: number; count: number }[]): ChartPoint[] {
  const map = new Map<number, number>();
  (items ?? []).forEach((it) => map.set(it.hour, it.count));

  return Array.from({ length: 24 }, (_, h) => ({
    time: `${String(h).padStart(2, "0")}시`,
    count: map.get(h) ?? 0,
  }));
}

export default function ConsultationLineChart() {
  const date = getKstYYYYMMDD();

  const { data, isLoading, isError } = useCounselTrafficDaily(date);
  const chartData = to24HoursChartData(data?.items);
  const hasAnyTraffic = chartData.some((d) => d.count > 0);

  if (isLoading) {
    return <div className="flex h-80 items-center justify-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex h-80 items-center justify-center text-red-500">트래픽 조회 실패</div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-neutral-500">기준일: {date}</div>
        {!hasAnyTraffic && (
          <div className="text-sm text-neutral-400">오늘 집계 데이터가 아직 없습니다.</div>
        )}
      </div>

      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

          <XAxis dataKey="time" tick={{ fontSize: 12 }} />

          <YAxis domain={[0, Math.max((data?.maxCount ?? 0) + 10, 10)]} />

          <Tooltip formatter={(value) => [`${value}건`, "상담 인입"]} />

          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--color-primary-500)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
