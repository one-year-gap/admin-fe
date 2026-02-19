"use client";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
interface ChartProps {
  regionName: string | null;
}
const data = [
  { name: "서울특별시", arpu: 42000, dataUsage: 18.5 },
  { name: "인천광역시", arpu: 35000, dataUsage: 15.2 },
  { name: "경기도", arpu: 38000, dataUsage: 16.8 },
  { name: "강원도", arpu: 31000, dataUsage: 12.8 },
  { name: "충청남도", arpu: 32500, dataUsage: 13.5 },
  { name: "세종특별자치시", arpu: 35000, dataUsage: 14.9 },
  { name: "대전광역시", arpu: 34000, dataUsage: 14.5 },
  { name: "충청북도", arpu: 31500, dataUsage: 13.1 },
  { name: "경상북도", arpu: 32000, dataUsage: 13.8 },
  { name: "대구광역시", arpu: 36500, dataUsage: 15.8 },
  { name: "울산광역시", arpu: 39500, dataUsage: 17.5 },
  { name: "부산광역시", arpu: 39000, dataUsage: 17.1 },
  { name: "경상남도", arpu: 33500, dataUsage: 14.2 },
  { name: "전라북도", arpu: 30500, dataUsage: 12.5 },
  { name: "광주광역시", arpu: 33000, dataUsage: 14.1 },
  { name: "전라남도", arpu: 30000, dataUsage: 12.2 },
  { name: "제주특별자치도", arpu: 32000, dataUsage: 13.2 },
];
const formatRegionName = (name: string): string => {
  const mapping: { [key: string]: string } = {
    서울특별시: "서울",
    인천광역시: "인천",
    경기도: "경기",
    강원도: "강원",
    충청남도: "충남",
    세종특별자치시: "세종",
    대전광역시: "대전",
    충청북도: "충북",
    경상북도: "경북",
    대구광역시: "대구",
    울산광역시: "울산",
    부산광역시: "부산",
    경상남도: "경남",
    전라북도: "전북",
    광주광역시: "광주",
    전라남도: "전남",
    제주특별자치도: "제주",
  };
  return mapping[name] || name;
};

export default function Chart({ regionName }: ChartProps) {
  const selectedData = data.find((item) => item.name === regionName);
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-neutral-0 mt-32 rounded-lg p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]">
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
            domain={[0, 60000]}
            tick={{ fontSize: 11 }}
          />
          {/* 오른쪽 Y축: 데이터 (GB) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#5a88e2"
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
                  style={{ width: `${(selectedData.arpu / 60000) * 100}%` }}
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
                  style={{ width: `${(selectedData.dataUsage / 20) * 100}%` }}
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
