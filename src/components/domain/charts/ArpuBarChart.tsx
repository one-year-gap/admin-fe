"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Row = {
  region: string;
  arpu: number;
  usage: number;
};

const data: Row[] = [
  { region: "서울", arpu: 42000, usage: 15 },
  { region: "경기", arpu: 38000, usage: 14 },
  { region: "인천", arpu: 36000, usage: 13 },
  { region: "부산", arpu: 40000, usage: 16 },
  { region: "대구", arpu: 35000, usage: 12 },
  { region: "대전", arpu: 33000, usage: 11 },
  { region: "광주", arpu: 31000, usage: 10 },
  { region: "세종", arpu: 37000, usage: 14 },
  { region: "제주", arpu: 34000, usage: 12 },
];

export default function ArpuBarChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} barGap={8}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="region" />
        <YAxis yAxisId="left" domain={[0, 60000]} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 20]} />

        <Legend verticalAlign="bottom" height={36} />

        <Bar yAxisId="left" dataKey="arpu" name="ARPU (원)" fill="#4F46E5" radius={[4, 4, 0, 0]} />

        <Bar
          yAxisId="right"
          dataKey="usage"
          name="데이터 (GB)"
          fill="#38BDF8"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
