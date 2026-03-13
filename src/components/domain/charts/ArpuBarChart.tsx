"use client";

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

type ChartRow = {
  month: string;
  explorer: number;
  collector: number;
  dieter: number;
  master: number;
  myType: number;
};

function transformData(data: any[]): ChartRow[] {
  const months: Record<string, ChartRow> = {};

  data.forEach((item) => {
    const month = item.yearMonth.slice(5) + "월";

    if (!months[month]) {
      months[month] = {
        month,
        explorer: 0,
        collector: 0,
        dieter: 0,
        master: 0,
        myType: 0,
      };
    }

    switch (item.personaName) {
      case "SPACE_EXPLORER":
        months[month].explorer = item.userCount;
        break;

      case "SPACE_OCTOPUS":
        months[month].collector = item.userCount;
        break;

      case "SPACE_GUARDIAN":
        months[month].dieter = item.userCount;
        break;

      case "SPACE_SURFER":
        months[month].master = item.userCount;
        break;

      case "SPACE_SHERLOCK":
        months[month].myType = item.userCount;
        break;
    }
  });

  return Object.values(months);
}

export default function CharacterTrendChart() {
  const { data } = usePersonaMonthlyTrend();

  const chartData = data ? transformData(data) : [];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} stackOffset="expand">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} />

          <Tooltip formatter={(value) => `${Math.round(Number(value) * 100)}%`} />

          <Legend verticalAlign="bottom" />

          <Area
            type="monotone"
            dataKey="explorer"
            stackId="1"
            name="우주탐험가"
            stroke="#4C6EF5"
            fill="#4C6EF5"
          />

          <Area
            type="monotone"
            dataKey="collector"
            stackId="1"
            name="우주문어발"
            stroke="#51CF66"
            fill="#51CF66"
          />

          <Area
            type="monotone"
            dataKey="dieter"
            stackId="1"
            name="우주보안관"
            stroke="#FCC419"
            fill="#FCC419"
          />

          <Area
            type="monotone"
            dataKey="master"
            stackId="1"
            name="우주트렌드서퍼"
            stroke="#F76707"
            fill="#F76707"
          />

          <Area
            type="monotone"
            dataKey="myType"
            stackId="1"
            name="우주셜록홈즈"
            stroke="#341F65"
            fill="#341F65"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
