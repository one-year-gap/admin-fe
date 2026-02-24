"use client";

import { type ReactNode } from "react";

import type { CustomerRow } from "@/components/domain/customers/list/columns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerRow | null;
};

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-12 items-center gap-3 py-2">
      <div className="col-span-4 text-sm font-medium text-neutral-500">{label}</div>
      <div className="col-span-8 rounded-lg border border-neutral-300 p-2 text-sm font-medium text-neutral-900">
        {value ?? "-"}
      </div>
    </div>
  );
}

export function CustomerDetailModal({ open, onOpenChange, customer }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[920px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">고객 상세 정보</DialogTitle>
        </DialogHeader>

        {!customer ? (
          <div className="py-10 text-center text-sm text-neutral-500">고객을 선택해주세요</div>
        ) : (
          <div className="grid grid-cols-12 gap-8">
            {/* 좌측 */}
            <div className="col-span-12 md:col-span-6">
              <InfoRow label="이름" value={customer.name} />
              <InfoRow label="등급" value={customer.grade} />
              <InfoRow label="성별" value={customer.gender} />
              <InfoRow label="이메일" value={customer.email} />
              <InfoRow label="연락처" value={customer.phone} />
              <InfoRow label="생년월일" value={customer.birth} />
              <InfoRow label="가입 요금제" value={customer.planText} />
            </div>

            {/* 우측 */}
            <div className="col-span-12 md:col-span-6">
              {/* TODO: API 연동 시 실제 데이터로 교체 필요 (나이, 주소, 가입기간 등) */}
              <InfoRow label="나이" value="-" />
              <InfoRow label="주소" value="-" />
              <InfoRow label="가입기간" value="-" />
              <InfoRow label="캐릭터 유형" value="-" />
              <InfoRow label="이탈위험군" value="-" />
              <InfoRow label="상담 이력" value="-" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
