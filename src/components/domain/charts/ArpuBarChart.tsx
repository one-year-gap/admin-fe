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

type Row = {
  month: string;
  explorer: number;
  collector: number;
  dieter: number;
  master: number;
  myType: number;
};

const data: Row[] = [
  { month: "1월", explorer: 10, collector: 15, dieter: 20, master: 25, myType: 30 },
  { month: "2월", explorer: 12, collector: 18, dieter: 22, master: 24, myType: 24 },
  { month: "3월", explorer: 15, collector: 20, dieter: 25, master: 20, myType: 20 },
  { month: "4월", explorer: 18, collector: 22, dieter: 20, master: 18, myType: 22 },
  { month: "5월", explorer: 20, collector: 24, dieter: 18, master: 15, myType: 23 },
];

export default function CharacterTrendChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} stackOffset="expand">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} />

          <Tooltip formatter={(value) => `${Math.round(Number(value) * 100)}%`} />

          <Legend verticalAlign="bottom" />

          <Area
            type="monotone"
            dataKey="explorer"
            stackId="1"
            name="우주셜록홈즈"
            stroke="#4C6EF5"
            fill="#4C6EF5"
          />

          <Area
            type="monotone"
            dataKey="collector"
            stackId="1"
            name="우주그래비티홈즈"
            stroke="#51CF66"
            fill="#51CF66"
          />

          <Area
            type="monotone"
            dataKey="dieter"
            stackId="1"
            name="우주문어발"
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
            name="우주탐험가"
            stroke="#341F65"
            fill="#341F65"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
