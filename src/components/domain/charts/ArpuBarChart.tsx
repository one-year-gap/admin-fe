"use client";

import { useMemo } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { usePersonaMonthlyTrend } from "@/lib/tanstack/query/usePersonaMonthlyTrend";
import type { PersonaMonthlyTrendItem } from "@/models/personaTrend";

type ChartRow = {
  key: string;
  month: string;
  explorer: number;
  collector: number;
  dieter: number;
  master: number;
  myType: number;
  gravity: number;
};

function transformData(data: PersonaMonthlyTrendItem[]): ChartRow[] {
  const months: Record<string, ChartRow> = {};

  data.forEach((item) => {
    const key = item.yearMonth;
    const month = `${item.yearMonth.split("-")[1]}월`;

    if (!months[key]) {
      months[key] = {
        key,
        month,
        explorer: 0,
        collector: 0,
        dieter: 0,
        master: 0,
        myType: 0,
        gravity: 0,
      };
    }

    switch (item.personaName) {
      case "SPACE_EXPLORER":
        months[key].explorer = item.userCount;
        break;
      case "SPACE_OCTOPUS":
        months[key].collector = item.userCount;
        break;
      case "SPACE_GUARDIAN":
        months[key].dieter = item.userCount;
        break;
      case "SPACE_SURFER":
        months[key].master = item.userCount;
        break;
      case "SPACE_SHERLOCK":
        months[key].myType = item.userCount;
        break;
      case "SPACE_GRAVITY":
        months[key].gravity = item.userCount;
        break;
    }
  });

  return Object.values(months).sort((a, b) => a.key.localeCompare(b.key));
}

export default function CharacterTrendChart() {
  const { data } = usePersonaMonthlyTrend();

  const chartData = useMemo(() => {
    if (!data) return [];
    return transformData(data);
  }, [data]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => {
              const num = Number(value);
              return [`${isNaN(num) ? 0 : num}명`, name];
            }}
          />
          <Legend verticalAlign="bottom" />
          <Area
            type="monotone"
            dataKey="explorer"
            name="우주탐험가"
            stroke="#c81f1f"
            fill="#c81f1f"
          />
          <Area
            type="monotone"
            dataKey="collector"
            name="우주문어발"
            stroke="#dcbb13"
            fill="#dcbb13"
          />
          <Area
            type="monotone"
            dataKey="dieter"
            name="우주세이프가디언"
            stroke="#820da5"
            fill="#820da5"
          />
          <Area
            type="monotone"
            dataKey="master"
            name="우주트렌드서퍼"
            stroke="#1faf4a"
            fill="#1faf4a"
          />
          <Area
            type="monotone"
            dataKey="myType"
            name="우주셜록홈즈"
            stroke="#6059c4"
            fill="#6059c4"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="gravity"
            name="그래비티홈즈"
            stroke="#dd4fa9"
            fill="#dd4fa9"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
