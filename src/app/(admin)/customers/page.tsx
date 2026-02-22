import { CustomersClient } from "@/components/domain/customers/CustomersClient";

export default function CustomersPage() {
  return <CustomersClient />;
  // (
  //   <>
  //     {/* 검색바 */}
  //     <section className="col-span-12">
  //       <SearchBar />
  //     </section>

  //     {/* 필터바 */}
  //     <section className="col-span-12">
  //       <FilterBar />
  //     </section>

  //     {/* 고객목록 영역 */}
  //     <section className="col-span-12">
  //       <CustomersList />
  //     </section>

  //     {/* 차트 영역 */}
  //     <section className="col-span-12 md:col-span-6">
  //       <DataUsageChartCard />
  //     </section>

  //     <section className="col-span-12 md:col-span-6">
  //       <GradeChartCard />
  //     </section>
  //   </>
  // );
}
