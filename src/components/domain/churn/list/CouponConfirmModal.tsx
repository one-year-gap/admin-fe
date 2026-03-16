"use client";

type Props = {
  open: boolean;
  count: number;
  onClose: () => void;
  onConfirm: () => void;
};

export function CouponConfirmModal({ count, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
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

      <div className="bg-neutral-0 relative z-10 w-90 rounded-lg p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">쿠폰 발급</h2>

        <p className="mb-6 text-sm text-neutral-500">
          선택한 회원 <b>{count}명</b>에게 쿠폰을 발급하시겠습니까?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md border px-4 py-2 text-sm hover:opacity-60">
            취소
          </button>

          <button
            onClick={onConfirm}
            className="bg-secondary-500 text-neutral-0 cursor-pointer rounded-md px-4 py-2 text-sm hover:opacity-60">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
