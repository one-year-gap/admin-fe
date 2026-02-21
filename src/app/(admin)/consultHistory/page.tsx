"use client";

import ConsultationLineChart from "@/components/domain/charts/ConsultationLineChart";
import KeywordBubbleChart from "@/components/domain/charts/KeywordBubbleChart";
import StatusDonutChart from "@/components/domain/charts/StatusDonutChart";

export default function ConsultationHistoryPage() {
  return (
    <div className="min-h-screen space-y-8 bg-gray-50 p-10">
      {/* 상담 키워드 */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">상담 키워드</h2>
        <KeywordBubbleChart />
      </section>

      {/* 트래픽 + 상태 */}
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">상담 트래픽</h2>
          <ConsultationLineChart />
        </section>

        <section className="col-span-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">상담 상태 비율</h2>
          <StatusDonutChart />
        </section>
      </div>
    </div>
  );
}
