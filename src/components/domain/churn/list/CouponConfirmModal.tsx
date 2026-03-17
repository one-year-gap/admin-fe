"use client";

import { useState } from "react";

import { TicketCheck } from "lucide-react";

import type { Coupon } from "./CouponSelect";
import { CouponSelect } from "./CouponSelect";

type Props = {
  open: boolean;
  count: number;
  coupons: Coupon[];
  onClose: () => void;
  onConfirm: (couponId: number) => void;
};

export function CouponConfirmModal({ open, count, coupons, onClose, onConfirm }: Props) {
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      tabIndex={-1}
      ref={(el) => el?.focus()}>
      {/* 배경 */}
      <div className="absolute inset-0 bg-neutral-900 opacity-50" onClick={() => onClose()} />

      <div className="bg-neutral-0 relative z-10 flex w-90 flex-col items-center gap-4 rounded-lg p-6 shadow-xl">
        <div className="bg-secondary-100 border-secondary-500 rounded-full border-2 p-4">
          <TicketCheck className="text-secondary-500 h-9 w-9" />
        </div>

        <h2 className="text-lg font-semibold">쿠폰 발급</h2>

        <p className="text-md text-neutral-700">
          선택한 회원 <b>{count}명</b>에게 쿠폰을 발급합니다.
        </p>

        {/* 쿠폰 선택 */}
        <CouponSelect coupons={coupons} value={selectedCouponId} onChange={setSelectedCouponId} />

        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md border px-4 py-2 text-sm hover:opacity-60">
            취소
          </button>

          <button
            type="button"
            disabled={selectedCouponId === null}
            onClick={() => {
              if (selectedCouponId === null) return;
              onConfirm(selectedCouponId);
            }}
            className="bg-secondary-500 text-neutral-0 cursor-pointer rounded-md px-4 py-2 text-sm hover:opacity-60">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
