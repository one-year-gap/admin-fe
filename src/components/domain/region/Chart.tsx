"use client";
import { useMemo } from "react";

import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { useRegionArpu } from "@/lib/tanstack/query/region";

interface ChartProps {
  regionName: string | null;
}
const REGION_SHORT_NAMES: Record<string, string> = {
  강원특별자치도: "강원",
  세종특별자치시: "세종",
  전북특별자치도: "전북",
  제주특별자치도: "제주",
};

const formatRegionName = (name: string): string => {
  return REGION_SHORT_NAMES[name] || name;
};

export default function Chart({ regionName }: ChartProps) {
  const { data: regionResponse, isLoading } = useRegionArpu("202602");

  const data = useMemo(() => {
    if (!regionResponse?.regions) return [];
    return regionResponse.regions.map((info) => ({
      name: info.region,
      arpu: info.averageSales,
      dataUsage: info.averageDataUsageGb,
    }));
  }, [regionResponse]);

  const selectedData = data.find((item) => item.name === regionName);

  const axisMax = regionResponse?.axisMax || { salesAxisMax: 60000, dataUsageAxisMaxGb: 20 };

  if (isLoading) {
    return (
      <div className="absolute h-full items-center justify-center text-neutral-500">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="bg-neutral-0 mt-2 rounded-lg p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]">
        <div className="mb-4">
          <h3 className="text-sm text-neutral-900">전국 평균 ARPU 및 데이터 사용량 그래프</h3>
          <p className="text-xs text-neutral-500">National ARPU & Data Usage Comparison</p>
        </div>

        <BarChart
          width={650}
          height={400}
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          barGap={16}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
            dy={10}
            tickFormatter={formatRegionName}
          />
          {/* 왼쪽 Y축: ARPU (원) */}
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#6d54cf"
            axisLine={false}
            tickLine={false}
            domain={[0, axisMax.salesAxisMax]}
            tick={{ fontSize: 11 }}
          />
          {/* 오른쪽 Y축: 데이터 (GB) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#5a88e2"
            axisLine={false}
            tickLine={false}
            domain={[0, axisMax.dataUsageAxisMaxGb]}
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
            fill="#6d54cf"
            name="ARPU (원)"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar
            yAxisId="right"
            dataKey="dataUsage"
            fill="#5a88e2"
            name="데이터 (GB)"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </div>
      {regionName && selectedData ? (
        <section className="animate-in fade-in slide-in-from-bottom-4 bg-neutral-0 shrink-0 rounded-2xl p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]">
          <div className="mb-6">
            <h3 className="text-base font-bold text-neutral-900">
              {formatRegionName(regionName)} 평균 ARPU 및 데이터 사용량 그래프
            </h3>
            <p className="text-xs font-medium text-neutral-500">Detailed Regional Metrics</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-neutral-900">ARPU (원)</span>
                <span className="text-chart-2">{selectedData.arpu.toLocaleString()}</span>
              </div>
              <div className="h-8 w-full overflow-hidden rounded-lg bg-neutral-200">
                <div
                  className="bg-chart-2 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${(selectedData.arpu / axisMax.salesAxisMax) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-neutral-900">데이터 사용량 (GB)</span>
                <span className="text-chart-1">{selectedData.dataUsage}</span>
              </div>
              <div className="h-8 w-full overflow-hidden rounded-lg bg-neutral-200">
                <div
                  className="bg-chart-1 h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(selectedData.dataUsage / axisMax.dataUsageAxisMaxGb) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="mb-10 flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-500 bg-neutral-100 p-10 text-center text-neutral-500">
          지도의 지역을 클릭하시면
          <br />
          상세 지표가 여기에 표시됩니다.
        </div>
      )}
    </div>
  );
}
