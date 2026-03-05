import { X } from "lucide-react";

import { useAdminMemberUpdate } from "@/lib/tanstack/mutation/useAdminMemberUpdate";
import { cn } from "@/lib/utils";
import type { MemberUpdateRequestDTO } from "@/models/customers/adminMembersUpdate";

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "정상",
  BANNED: "정지",
  PROCESSING: "가입중",
  DELETED: "탈퇴",
};
const MEMBERSHIP_LABEL: Record<string, string> = {
  GOLD: "우수",
  VIP: "VIP",
  VVIP: "VVIP",
};

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: number | null;
  memberName: string;
  currentStatus: string;
  currentMembership: string;
  pendingStatus: string;
  pendingMembership: string;
};

export function UpdateModal({
  open,
  onOpenChange,
  memberId,
  memberName,
  currentStatus,
  currentMembership,
  pendingStatus,
  pendingMembership,
}: ModalProps) {
  const { mutateAsync, isPending } = useAdminMemberUpdate();

  if (!open) return null;

  const statusChanged = currentStatus !== pendingStatus;
  const membershipChanged = currentMembership !== pendingMembership;

  const changes = [
    statusChanged && `상태를 ${STATUS_LABEL[currentStatus]} → ${STATUS_LABEL[pendingStatus]}`,
    membershipChanged &&
      `등급을 ${MEMBERSHIP_LABEL[currentMembership]} → ${MEMBERSHIP_LABEL[pendingMembership]}`,
  ].filter(Boolean);

  const handleConfirm = async () => {
    if (!memberId) return;
    const body: MemberUpdateRequestDTO = {
      ...(statusChanged && { status: pendingStatus as MemberUpdateRequestDTO["status"] }),
      ...(membershipChanged && {
        membership: pendingMembership as MemberUpdateRequestDTO["membership"],
      }),
    };

    try {
      await mutateAsync({ memberId, body });
      onOpenChange(false);
    } catch (err) {
      console.error("[UPDATE ERROR]", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => e.key === "Escape" && onOpenChange(false)}
      tabIndex={-1}
      ref={(el) => el?.focus()}>
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-neutral-900 opacity-60"
        onClick={() => onOpenChange(false)}
      />

      {/* 모달창 */}
      <div className="bg-neutral-0 relative z-10 flex w-full max-w-sm flex-col gap-3 rounded-lg border border-neutral-300 p-6 shadow-xl">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">수정 확인</h2>
          <button onClick={() => onOpenChange(false)} className="cursor-pointer hover:opacity-60">
            <X className="h-5 w-5" />
          </button>
        </header>

        {changes.length === 0 ? (
          <p className="text-md py-4 text-center text-neutral-500">변경된 항목이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-md font-medium text-neutral-900">
              <span className="font-semibold">{memberName}</span>님의 정보를 아래와 같이
              수정하시겠습니까?
            </p>
            <ul className="flex flex-col gap-2 rounded-md bg-neutral-100 px-4 py-2">
              {changes.map((c, i) => (
                <li key={i} className="text-md text-neutral-700">
                  • {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-md text-neutral-0 flex justify-end gap-3 font-medium">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={changes.length === 0 || isPending}
            className={cn(
              "cursor-pointer rounded-sm px-4 py-1 font-medium",
              changes.length > 0 && !isPending
                ? "bg-secondary-500 hover:opacity-70"
                : "cursor-default bg-neutral-300",
            )}>
            {isPending ? "저장 중..." : "수정"}
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-danger-500 cursor-pointer rounded-sm px-4 py-1 hover:opacity-70">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
