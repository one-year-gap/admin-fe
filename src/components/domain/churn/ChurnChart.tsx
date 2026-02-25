"use client";

import type { ReactNode } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Item = {
  name: string;
  pv: number;
  uv: number;
};

const data: Item[] = [
  { name: "01/27", pv: 2, uv: 4 },
  { name: "01/29", pv: 1, uv: -3 },
  { name: "01/31", pv: -4, uv: -2 },
  { name: "02/02", pv: 4, uv: 3 },
  { name: "02/04", pv: 5, uv: -2 },
  { name: "02/06", pv: -3, uv: 2 },
  { name: "02/08", pv: 4, uv: 3 },
  { name: "02/10", pv: -1, uv: -2 },
];

const COLOR_POS = "var(--danger-500)";
const COLOR_NEG = "var(--chart-2)";
const COLOR_ZERO = "var(--neutral-500)";

type YAxisTickLikeProps = {
  x?: number;
  y?: number;
  payload?: { value?: number | string };
};

function CustomYAxisTick(props: YAxisTickLikeProps) {
  const valueRaw = props?.payload?.value;
  if (valueRaw === null) return null;

  const value = Number(valueRaw);

  return (
    <Text x={props.x} y={props.y} textAnchor="end" verticalAnchor="middle" fontWeight={"medium"}>
      {value}
    </Text>
  );
}

function CustomLegend(): ReactNode {
  return (
    <div className="mt-3 flex items-center justify-center gap-6 text-sm text-neutral-700">
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded-full" style={{ background: COLOR_POS }} />
        <span>증가 (위험 상승)</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded-full" style={{ background: COLOR_NEG }} />
        <span>감소 (위험 완화)</span>
      </div>
    </div>
  );
}

export function ChurnChart() {
  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">이탈 위험군 증감 추이</h3>
        <p className="text-md text-neutral-500">
          전일 대비 이탈 위험군 인원 변동 (양수: 증가, 음수: 감소)
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={16} tick={<CustomYAxisTick />} />
            <ReferenceLine y={0} stroke="#9ca3af" />
            <Tooltip
              formatter={(value, name) => {
                const n = Number(value ?? 0);
                return [n, String(name)];
              }}
            />
            <Legend content={CustomLegend} />

            <Bar dataKey="pv" name="증가(위험상승)" radius={[6, 6, 6, 6]}>
              {data.map((d, idx) => (
                <Cell
                  key={`pv-${idx}`}
                  fill={d.pv < 0 ? COLOR_NEG : d.pv > 0 ? COLOR_POS : COLOR_ZERO}
                />
              ))}
            </Bar>

            <Bar dataKey="uv" name="감소(위험완화)" radius={[6, 6, 6, 6]} fill="var(--chart-2)">
              {data.map((d, idx) => (
                <Cell
                  key={`uv-${idx}`}
                  fill={d.uv < 0 ? COLOR_NEG : d.uv > 0 ? COLOR_POS : COLOR_ZERO}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
