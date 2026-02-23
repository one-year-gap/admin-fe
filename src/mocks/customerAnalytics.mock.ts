export type GradeDistributionItem = {
  label: "우수" | "VIP" | "VVIP";
  value: number;
};

export type DataUsagePoint = {
  date: string; // YYYY-MM-DD
  value: number; // GB (예시)
};

export type CustomerAnalytics = {
  filteredTotalCount: number;
  gradeDistribution: GradeDistributionItem[];
  dataUsageTimeseries: {
    unit: "GB";
    granularity: "DAY";
    series: DataUsagePoint[];
  };
};

/**
 * mock 단계:
 * - 실제 API가 없으니 "필터 조건"에 따라 다른 결과가 나온 것처럼 시뮬레이션
 * - 나중에 API 생기면 이 함수 호출을 fetch로 바꾸면 됨.
 */
export function getMockCustomerAnalytics(params: {
  keyword: string;
  // filters는 지금 단계에서 타입 의존 줄이려고 unknown 처리(필요하면 CustomerFilters로 바꿔도 됨)
  filters: unknown;
}): CustomerAnalytics {
  const seed = stableSeed(`${params.keyword}::${JSON.stringify(params.filters)}`);

  const filteredTotalCount = 8000 + (seed % 4000); // 8000~11999

  const vvip = 500 + (seed % 900); // 500~1399
  const vip = 2500 + (seed % 2000); // 2500~4499
  const good = Math.max(0, filteredTotalCount - (vvip + vip));

  const gradeDistribution: GradeDistributionItem[] = [
    { label: "우수", value: good },
    { label: "VIP", value: vip },
    { label: "VVIP", value: vvip },
  ];

  const series = makeDailySeries({
    days: 14,
    seed,
    base: 800,
    amplitude: 220,
  });

  return {
    filteredTotalCount,
    gradeDistribution,
    dataUsageTimeseries: {
      unit: "GB",
      granularity: "DAY",
      series,
    },
  };
}

// ---------------- utils ----------------

function stableSeed(str: string) {
  // 간단한 deterministic hash
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function makeDailySeries(opts: { days: number; seed: number; base: number; amplitude: number }) {
  const { days, seed, base, amplitude } = opts;

  // 오늘 기준이 아니라 “최근 N일”처럼 보이게 고정 시작일을 만들자(예: 2026-02-10부터 14일)
  const start = new Date("2026-02-10T00:00:00");

  const series = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const date = d.toISOString().slice(0, 10);

    // seed 기반으로 매번 같은 패턴이 나오게
    const noise = pseudoRandom(seed + i) - 0.5; // -0.5~0.5
    const wave = Math.sin((i / 2.5) * Math.PI) * 0.5;

    const value = Math.round(base + amplitude * (wave + noise));

    series.push({ date, value });
  }
  return series;
}

function pseudoRandom(x: number) {
  // 0~1
  const t = Math.sin(x) * 10000;
  return t - Math.floor(t);
}
