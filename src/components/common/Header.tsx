import { UserLock } from "lucide-react";

interface HeaderProps {
  pageName?: string;
  userName?: string;
}
export default function Header({
  pageName = "고객 통합 관리",
  userName = "관리자 님",
}: HeaderProps) {
  return (
    <header className="bg-neutral-0 flex h-22 items-center justify-between border-b border-neutral-300 px-10">
      <div className="text-xl font-bold text-neutral-900">{pageName}</div>

      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300">
            <UserLock className="h-8 w-8" />
          </div>
          <span className="text-md font-semibold text-neutral-900">{userName}</span>
        </div>

        <button
          type="button"
          className="bg-neutral-300 px-6 py-3 text-xs font-semibold text-neutral-900">
          로그아웃
        </button>
      </div>
    </header>
  );
}
