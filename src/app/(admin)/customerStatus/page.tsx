import ArpuBarChart from "@/components/domain/charts/ArpuBarChart";
import PersonaBarChart from "@/components/domain/charts/PersonaBarChart";
export default function CustomerStatsPage() {
  return (
    <div className="min-h-screen space-y-8 bg-gray-50 p-10">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">고객 유형별 분포 (총 100%)</h2>
        <PersonaBarChart />
      </section>
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">월 별 유형 트렌드 조회</h2> <ArpuBarChart />
      </section>
    </div>
  );
}
