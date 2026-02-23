// "use client";

// import React from "react";

// import type { CustomerFilters } from "../filter/FilterBar";

// type Customer = {
//   id: string;
//   grade: "우수" | "VIP" | "VVIP";
//   gender: "남" | "여";
//   name: string;
//   birth: string; // yyyy.mm.dd
//   phone: string;
//   email: string;
//   planText: string;
//   status?: "정지" | "정상";
// };

// const MOCK_CUSTOMERS: Customer[] = [
//   {
//     id: "01",
//     grade: "VIP",
//     gender: "여",
//     name: "이*빈",
//     birth: "2001.01.12",
//     phone: "010-****-1234",
//     email: "1234@gmail.com",
//     planText: "저렴이 요금제",
//     status: "정상",
//   },
//   {
//     id: "02",
//     grade: "우수",
//     gender: "남",
//     name: "박*형",
//     birth: "1998.02.04",
//     phone: "010-****-5678",
//     email: "5678@gmail.com",
//     planText: "알뜰살뜰 요금제",
//     status: "정지",
//   },
// ];

// // 지금은 "버튼 눌렀을 때 넘어온 applied 조건"을 받기만 하고
// // 나중에 여기서 mock 필터링 → API로 교체하면 됨
// export function CustomersList({ keyword, filters }: { keyword: string; filters: CustomerFilters }) {
//   // TODO: keyword/filters로 mock 필터링 붙일 예정
//   const data = React.useMemo(() => {
//     // 임시: 지금은 전체 반환
//     // 추후: keyword + filters 기준으로 필터링
//     void keyword;
//     void filters;
//     return MOCK_CUSTOMERS;
//   }, [keyword, filters]);

//   const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

//   const allIds = data.map((d) => d.id);
//   const allChecked = allIds.length > 0 && selectedIds.length === allIds.length;
//   const someChecked = selectedIds.length > 0 && selectedIds.length < allIds.length;

//   const toggleAll = () => {
//     setSelectedIds(allChecked ? [] : allIds);
//   };

//   const toggleOne = (id: string) => {
//     setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
//   };

//   return (
//     <div className="bg-neutral-0 rounded-xl border border-neutral-300">
//       {/* 상단 요약(전체 건수) */}
//       <div className="flex items-center justify-start px-5 py-4">
//         <span className="text-lg font-medium text-neutral-900">전체 {data.length}건</span>
//       </div>

//       {/* 테이블 */}
//       <div className="w-full overflow-x-auto">
//         <table className="w-full min-w-220 border-separate border-spacing-0">
//           <thead>
//             <tr className="text-md text-left text-neutral-500">
//               <th className="w-12 px-5 py-3">
//                 <input
//                   type="checkbox"
//                   className="accent-primary-500 h-4 w-4 cursor-pointer"
//                   checked={allChecked}
//                   ref={(el) => {
//                     if (!el) return;
//                     el.indeterminate = someChecked;
//                   }}
//                   onChange={toggleAll}
//                 />
//               </th>
//               <th className="w-16 px-4 py-3">No.</th>
//               <th className="w-20 px-4 py-3">등급</th>
//               <th className="w-16 px-4 py-3">성별</th>
//               <th className="w-24 px-4 py-3">이름</th>
//               <th className="w-32 px-4 py-3">생년월일</th>
//               <th className="w-40 px-4 py-3">연락처</th>
//               <th className="w-44 px-4 py-3">이메일</th>
//               <th className="px-4 py-3">이용 요금제</th>
//               <th className="w-24 px-4 py-3">상태</th>
//             </tr>
//           </thead>

//           <tbody className="text-sm text-neutral-900">
//             {data.length === 0 ? (
//               <tr>
//                 <td colSpan={10} className="px-5 py-10 text-center text-neutral-500">
//                   검색 결과가 없습니다
//                 </td>
//               </tr>
//             ) : (
//               data.map((row, idx) => {
//                 const checked = selectedIds.includes(row.id);
//                 return (
//                   <tr key={row.id} className="border-t border-neutral-200">
//                     <td className="px-5 py-3">
//                       <input type="checkbox" checked={checked} onChange={() => toggleOne(row.id)} />
//                     </td>
//                     <td className="px-4 py-3">{String(idx + 1).padStart(2, "0")}</td>
//                     <td className="px-4 py-3">{row.grade}</td>
//                     <td className="px-4 py-3">{row.gender}</td>
//                     <td className="px-4 py-3">{row.name}</td>
//                     <td className="px-4 py-3">{row.birth}</td>
//                     <td className="px-4 py-3">{row.phone}</td>
//                     <td className="px-4 py-3">{row.email}</td>
//                     <td className="px-4 py-3">{row.planText}</td>
//                     <td className="px-4 py-3">
//                       {row.status === "정지" ? (
//                         <span className="inline-flex items-center rounded-md bg-red-500 px-3 py-1 text-xs font-semibold text-white">
//                           정지
//                         </span>
//                       ) : (
//                         <span className="text-neutral-600">-</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 하단 여백(추후 페이지네이션/더보기 자리) */}
//       <div className="px-5 py-4" />
//     </div>
//   );
// }

"use client";

import React from "react";

import type { CustomerFilters } from "../filter/FilterBar";
import { columns, type CustomerRow } from "./columns";
import { DataTable } from "./DataTable";

// const MOCK_CUSTOMERS: CustomerRow[] = [
//   {
//     id: "01",
//     grade: "VIP",
//     gender: "여",
//     name: "이*빈",
//     birth: "2001.01.12",
//     phone: "010-****-1234",
//     email: "1234@gmail.com",
//     planText: "5G 프리미엄",
//   },
//   {
//     id: "02",
//     grade: "우수",
//     gender: "남",
//     name: "박*형",
//     birth: "1998.02.04",
//     phone: "010-****-5678",
//     email: "5678@gmail.com",
//     planText: "5G 스탠다드",
//   },
//   {
//     id: "03",
//     grade: "VVIP",
//     gender: "여",
//     name: "김*지",
//     birth: "1995.11.23",
//     phone: "010-****-9012",
//     email: "9012@gmail.com",
//     planText: "LTE 베이직",
//   },
// ];

const MOCK_CUSTOMERS: CustomerRow[] = Array.from({ length: 137 }, (_, i) => {
  const n = i + 1;
  return {
    id: String(n).padStart(4, "0"),
    grade: n % 3 === 0 ? "VVIP" : n % 3 === 1 ? "VIP" : "우수",
    gender: n % 2 === 0 ? "남" : "여",
    name: `고객${n}`,
    birth: "1999.01.01",
    phone: "010-****-1234",
    email: `${n}@gmail.com`,
    planText: n % 2 === 0 ? "5G 프리미엄" : "LTE 베이직",
  };
});

export function CustomersList({ keyword, filters }: { keyword: string; filters: CustomerFilters }) {
  // 형태 확정 단계: 아직 필터링 로직은 미적용
  // (keyword/filters는 추후 mock 필터링 or API 요청 파라미터 만들 때 사용)
  const data = React.useMemo(() => {
    void keyword;
    void filters;
    return MOCK_CUSTOMERS;
  }, [keyword, filters]);

  // columns는 파일 상수지만, 안정적으로 memo 해두면 불필요 리렌더 줄어듦
  const memoColumns = React.useMemo(() => columns, []);

  const tableKey = React.useMemo(() => {
    // filters는 객체니까 stringify로 안정적인 key 생성
    return `${keyword}::${JSON.stringify(filters)}`;
  }, [keyword, filters]);

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      {/* 상단 요약(전체 건수) */}
      <div className="flex items-center justify-start px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">전체 {data.length}건</span>
      </div>

      {/* <DataTable data={data} columns={memoColumns} pageSize={10} /> */}
      <DataTable
        key={tableKey} // applied 바뀌면 DataTable 상태(페이지/선택) 리셋됨
        data={data}
        columns={memoColumns}
        pageSize={10}
      />
    </div>
  );
}
