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

import { useCounselTrafficDaily } from "@/lib/tanstack/query/useCounselTrafficDaily";
import { useCounselTrafficMonthly } from "@/lib/tanstack/query/useCounselTrafficMonthly";

function getKstYYYYMMDD() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function getKstYYYYMM() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 7);
}

function to24HoursChartData(items?: { hour: number; count: number }[]) {
  const map = new Map<number, number>();

  (items ?? []).forEach((it) => {
    map.set(it.hour, it.count);
  });

  return Array.from({ length: 24 }, (_, h) => ({
    time: `${String(h).padStart(2, "0")}시`,
    count: map.get(h) ?? 0,
  }));
}

function toMonthDaysChartData(items?: { day: number; count: number }[]) {
  const map = new Map<number, number>();

  (items ?? []).forEach((it) => {
    map.set(it.day, it.count);
  });

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, d) => ({
    time: `${d + 1}일`,
    count: map.get(d + 1) ?? 0,
  }));
}

export default function ConsultationLineChart() {
  const [mode, setMode] = useState<"hour" | "day">("hour");

  const date = getKstYYYYMMDD();
  const month = getKstYYYYMM();

  const daily = useCounselTrafficDaily(date);
  const monthly = useCounselTrafficMonthly(month);

  const chartData =
    mode === "hour"
      ? to24HoursChartData(daily.data?.items)
      : toMonthDaysChartData(monthly.data?.items);

  const maxCount = mode === "hour" ? (daily.data?.maxCount ?? 0) : (monthly.data?.maxCount ?? 0);

  const isLoading = mode === "hour" ? daily.isLoading : monthly.isLoading;

  if (isLoading) {
    return <div className="flex h-80 items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex justify-between">
        <div className="text-sm text-neutral-500">기준일: {mode === "hour" ? date : month}</div>

        <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
          <button
            onClick={() => setMode("hour")}
            className={`rounded-md px-3 py-1 text-sm transition ${
              mode === "hour" ? "bg-primary text-white shadow" : "text-neutral-500 hover:text-black"
            }`}>
            시간대별
          </button>

          <button
            onClick={() => setMode("day")}
            className={`rounded-md px-3 py-1 text-sm transition ${
              mode === "day" ? "bg-primary text-white shadow" : "text-neutral-500 hover:text-black"
            }`}>
            일자별
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

          <XAxis dataKey="time" tick={{ fontSize: 12 }} interval={4} />

          <YAxis domain={[0, Math.max(maxCount + 10, 10)]} />

          <Tooltip formatter={(value) => [`${value}건`, "상담 인입"]} />

          <Line type="monotone" dataKey="count" stroke="var(--color-primary-500)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
