import type { ReactNode } from "react";

import { X } from "lucide-react";

import type { CustomerRow } from "./columns";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerRow | null;
};

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="text-md grid grid-cols-12 items-center gap-3 py-2 font-medium">
      <div className="col-span-4 text-neutral-900">{label}</div>
      <div className="col-span-6 truncate rounded-lg border border-neutral-300 p-2 text-neutral-500">
        {value ?? "-"}
      </div>
    </div>
  );
}

export function CustomerModal({ open, onOpenChange, customer }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => {
        if (e.key === "Escape") onOpenChange(false);
      }}
      tabIndex={-1}
      ref={(el) => el?.focus()}>
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-neutral-900 opacity-50"
        onClick={() => onOpenChange(false)}
      />

      {/* 모달창 */}
      <div className="bg-neutral-0 relative z-10 w-full max-w-[60vw] rounded-lg border border-neutral-300 p-6 shadow-xl">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">고객 상세 정보</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="cursor-pointer hover:text-gray-500"
            aria-label="모달 닫기">
            <X className="h-6 w-6" />
          </button>
        </header>

        {!customer ? (
          <div className="py-10 text-center text-sm text-neutral-500">고객을 선택해주세요</div>
        ) : (
          <section className="grid grid-cols-12 gap-6 px-16">
            <div className="col-span-6">
              <InfoRow label="이름" value={customer.name} />
              <InfoRow label="성별" value={customer.gender} />
              <InfoRow label="등급" value={customer.grade} />
              <InfoRow label="이메일" value={customer.email} />
              <InfoRow label="생년월일" value={customer.birth} />
              <InfoRow label="연락처" value={customer.phone} />
              <InfoRow label="가입 기간" value="3년" />
            </div>
            <div className="col-span-6">
              <InfoRow label="나이" value="29세" />
              <InfoRow label="주소" value="서울시 강동구 고덕로 36길" />
              <InfoRow label="가입 요금제" value={customer.planText} />
              <InfoRow label="캐릭터 요금제" value="무제한 자유영혼" />
              <InfoRow label="이탈 위험군" value="낮음" />
              <InfoRow label="상담 횟수" value="3회" />
              <InfoRow label="최근 상담 일자" value="2026.02.25" />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
