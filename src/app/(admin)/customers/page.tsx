import { SearchBar } from "@/components/common/SearchBar";
import { CustomersList } from "@/components/domain/customers/CustomersList ";
import { CustomersToolBar } from "@/components/domain/customers/CustomersToolBar ";
import { DataUsageChartCard } from "@/components/domain/customers/DataUsageChartCard ";
import { GradeChartCard } from "@/components/domain/customers/GradeChartCard ";

export default function CustomersPage() {
  return (
    <>
      {/* 검색바 */}
      <section className="col-span-12">
        <SearchBar />
      </section>

      {/* 필터바 */}
      <section className="col-span-12">
        <CustomersToolBar />
      </section>

      {/* 고객목록 영역 */}
      <section className="col-span-12">
        <CustomersList />
      </section>

      {/* 차트 영역 */}
      <section className="col-span-12 md:col-span-6">
        <DataUsageChartCard />
      </section>

      <section className="col-span-12 md:col-span-6">
        <GradeChartCard />
      </section>
    </>
  );
}
