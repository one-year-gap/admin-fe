"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  action: "BANNED" | "ACTIVE";
  count: number;
  onConfirm: () => void;
};

export function ConfirmModal({ open, onOpenChange, action, count, onConfirm }: Props) {
  if (!open) return null;

  const label = action === "BANNED" ? "정지" : "정지해제";

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
      <div className="bg-neutral-0 relative z-10 flex w-90 flex-col items-center gap-4 rounded-lg p-6 shadow-xl">
        {label === "정지" ? (
          <div className="bg-danger-100 border-danger-500 rounded-full border-2 p-2">
            <X className="text-danger-500 h-9 w-9" />
          </div>
        ) : (
          <div className="bg-secondary-100 border-secondary-500 rounded-full border-2 p-2">
            <Check className="text-secondary-500 h-8 w-8" />
          </div>
        )}

        <h2 className="text-lg font-semibold">회원 {label}</h2>

        <p className="text-md mb-2 text-neutral-700">
          선택한 회원 <b>{count}명</b>을 <b>{label}</b>하시겠습니까?
        </p>

        <div className="flex justify-end gap-6 font-semibold">
          <button
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-md border px-4 py-2 text-sm hover:opacity-60">
            취소
          </button>

          <button
            onClick={onConfirm}
            className={cn(
              "text-neutral-0 cursor-pointer rounded-md px-4 py-2 text-sm hover:opacity-60",
              label === "정지" ? "bg-danger-500" : "bg-secondary-500",
            )}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
