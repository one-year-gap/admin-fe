"use client";

import { Bar, BarChart, CartesianGrid, Legend,Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "서울", arpu: 42000, dataUsage: 18.5 },
  { name: "경기", arpu: 38000, dataUsage: 16.8 },
  { name: "인천", arpu: 35000, dataUsage: 15.2 },
  { name: "부산", arpu: 39000, dataUsage: 17.1 },
  { name: "대구", arpu: 36500, dataUsage: 15.8 },
  { name: "대전", arpu: 34000, dataUsage: 14.5 },
  { name: "광주", arpu: 33000, dataUsage: 14.1 },
  { name: "강원", arpu: 31000, dataUsage: 12.8 },
  { name: "세종", arpu: 35000, dataUsage: 14.9 },
  { name: "제주", arpu: 32000, dataUsage: 13.2 },
];

export default function Chart() {
  return (
    <div>
      <div className="bg-neutral-0 absolute top-1/2 right-10 z-10 -translate-y-1/2 rounded-[10px] border border-gray-100 p-6 shadow-lg">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-800">
            전국 평균 ARPU 및 데이터 사용량 그래프
          </h3>
          <p className="text-xs text-gray-400">National ARPU & Data Usage Comparison</p>
        </div>

        <BarChart
          width={650}
          height={400}
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          barGap={4}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
            dy={10}
          />
          {/* 왼쪽 Y축: ARPU (원) */}
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#7c73e6"
            axisLine={false}
            tickLine={false}
            domain={[0, 60000]}
            tick={{ fontSize: 11 }}
          />
          {/* 오른쪽 Y축: 데이터 (GB) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#00a3e0"
            axisLine={false}
            tickLine={false}
            domain={[0, 20]}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="rect"
            wrapperStyle={{ paddingTop: "30px" }}
          />
          <Bar
            yAxisId="left"
            dataKey="arpu"
            fill="#7c73e6"
            name="ARPU (원)"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar
            yAxisId="right"
            dataKey="dataUsage"
            fill="#00a3e0"
            name="데이터 (GB)"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </div>
    </div>
  );
}
