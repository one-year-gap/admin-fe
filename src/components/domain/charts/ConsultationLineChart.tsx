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

const data = [
  { time: "01시", count: 10 },
  { time: "03시", count: 5 },
  { time: "07시", count: 28 },
  { time: "11시", count: 95 },
  { time: "15시", count: 80 },
  { time: "19시", count: 35 },
  { time: "23시", count: 15 },
];

export default function ConsultationLineChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, "dataMax + 10"]} />
          <Tooltip />

          <Line type="monotone" dataKey="count" stroke="var(--color-primary-500)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
