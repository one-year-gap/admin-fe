"use client";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/": "고객 통합 관리",
  "/region": "지역별 통계",
  "/profile": "특성 통계",
  "/history": "상담 이력",
  "/churn": "이탈 감지",
};
export default function Header() {
  const pathname = usePathname();

  const pageName = PAGE_TITLES[pathname] || "고객 통합 관리";
  return (
    <header className="bg-neutral-0 flex h-22 w-full flex-shrink-0 items-center">
      <div className="flex w-full items-center justify-between">
        <div className="py-5 pl-9 text-xl font-bold text-neutral-900">{pageName}</div>
        <div className="flex items-center gap-4"></div>
      </div>
    </header>
  );
}
