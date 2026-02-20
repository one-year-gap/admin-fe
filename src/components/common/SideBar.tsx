"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { AlertCircle, Contact2, FileSignature, Headset, Map, Users } from "lucide-react";

import logo from "@/assets/logo.svg";

const MENU_ITEMS = [
  { id: "고객 관리", label: "고객 관리", icon: Users, href: "/customers" },
  { id: "지역별 통계", label: "지역별 통계", icon: Map, href: "/region" },
  { id: "특성 통계", label: "특성 통계", icon: Contact2, href: "/profile" },
  { id: "상담 이력", label: "상담 이력", icon: Headset, href: "/history" },
  { id: "이탈 감지", label: "이탈 감지", icon: AlertCircle, href: "/churn" },
  { id: "제안서 작성", label: "제안서 작성", icon: FileSignature, href: "/proposal" },
];

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="bg-primary-900 text-neutral-0 flex min-h-screen w-70 shrink-0 flex-col text-lg">
      <div className="flex flex-col items-center px-12 pt-9">
        <div className="flex items-center gap-3">
          <Image alt="logo" src={logo} width={48} height={44} />
          <span className="font-bold">U+NIVERSE</span>
        </div>
        <div className="bg-neutral-0 mt-9 h-px w-full" />
      </div>

      {/* isActive는 현재 페이지인지 확인하는 변수입니다. */}
      <nav className="flex flex-1 flex-col justify-center gap-6 px-12">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => router.push(item.href)}
              className="w-full">
              <div
                className={`flex items-center gap-9 rounded-lg p-4 transition-all ${
                  isActive ? "bg-secondary-500" : "hover:bg-secondary-700"
                }`}>
                <div className={`relative h-6 w-6 ${isActive ? "brightness-200" : "opacity-70"}`}>
                  <Icon />
                </div>
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
