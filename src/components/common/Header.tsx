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
    <header className="bg-neutral-0 fixed top-0 right-0 left-[280px] flex h-[90px] items-center">
      <div className="flex w-full items-center justify-between">
        <div className="py-[20px] pl-[36px] text-[25px] font-bold text-neutral-900">{pageName}</div>
        <div className="flex items-center gap-[16px]">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-neutral-300">
            <UserLock width={32} height={32} />
          </div>
          <span className="text-[18px] font-semibold text-neutral-900">{userName}</span>

          <button
            type="button"
            className="mr-[40px] bg-neutral-300 px-[24px] py-[12px] text-[12px] font-semibold text-neutral-900">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
