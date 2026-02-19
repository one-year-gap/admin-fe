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
    <header className="bg-neutral-0 sticky top-0 z-10 flex h-22 items-center">
      <div className="flex w-full items-center justify-between">
        <div className="py-5 pl-9 text-xl font-bold text-neutral-900">{pageName}</div>

        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300">
            <UserLock width={32} height={32} />
          </div>
          <span className="text-md font-semibold text-neutral-900">{userName}</span>

          <button
            type="button"
            className="mr-10 bg-neutral-300 px-6 py-3 text-xs font-semibold text-neutral-900">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
