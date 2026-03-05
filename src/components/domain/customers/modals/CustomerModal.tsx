import { type ReactNode, useState } from "react";

import { X } from "lucide-react";

import { UpdateModal } from "@/components/domain/customers/modals/UpdateModal";
import { useAdminMembersDetail } from "@/lib/tanstack/query/useAdminMembersDetail";

import { MembershipPopover, StatusPopover } from "./CustomerPopover";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: number | null;
};

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="text-md grid grid-cols-12 items-center gap-3 py-2 font-medium">
      <div className="col-span-4 text-neutral-900">{label}</div>
      <div className="col-span-8 truncate rounded-lg text-neutral-500">{value ?? "-"}</div>
    </div>
  );
}

export function CustomerModal({ open, onOpenChange, memberId }: ModalProps) {
  const { data, isLoading, isError } = useAdminMembersDetail(memberId ?? 0, {
    enabled: open && memberId !== null && memberId > 0,
    refetchOnWindowFocus: false,
  });

  const [updateOpen, setUpdateOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [pendingMembership, setPendingMembership] = useState<string | null>(null);

  const handleClose = () => {
    setUpdateOpen(false);
    setPendingStatus(null);
    setPendingMembership(null);
    onOpenChange(false);
  };

  if (!open) return null;

  const member = data?.data;

  const effectiveStatus = pendingStatus ?? member?.status ?? "";
  const effectiveMembership = pendingMembership ?? member?.membership ?? "";

  const currentStatus = member?.status ?? "";
  const currentMembership = member?.membership ?? "";

  const getContractStatus = () => {
    if (!member || !member.isContracted) return { color: "bg-neutral-500", text: "없음" };

    if (member.isExpired || (member.remainingDays ?? 0) <= 0) {
      return { color: "bg-danger-500", text: "만료" };
    }

    if ((member.remainingDays ?? 0) <= 30) {
      return { color: "bg-warning-500", text: "임박" };
    }

    return { color: "bg-success-500", text: "가입" };
  };
  const contractStatus = getContractStatus();

  const dotContractStartDate = member?.contractStartDate?.split("T")[0]?.replace(/-/g, ".");
  const dotContractEndDate = member?.contractEndDate?.split("T")[0]?.replace(/-/g, ".");

  const dotLastSupportDate = member?.lastSupportDate?.split("T")[0]?.replace(/-/g, ".");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose();
      }}
      tabIndex={-1}
      ref={(el) => el?.focus()}>
      {/* 배경 */}
      <div className="absolute inset-0 bg-neutral-900 opacity-60" onClick={handleClose} />

      {/* 모달창 */}
      <div className="bg-neutral-0 relative z-10 w-full max-w-[60vw] rounded-lg border border-neutral-300 p-6 text-neutral-900 shadow-xl">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">고객 상세 정보</h2>
          <button
            onClick={handleClose}
            className="cursor-pointer hover:text-neutral-500"
            aria-label="모달 닫기">
            <X className="h-6 w-6" />
          </button>
        </header>

        {!memberId ? (
          <div className="py-10 text-center text-sm text-neutral-500">고객을 선택해주세요</div>
        ) : isLoading ? (
          <div className="py-10 text-center text-sm text-neutral-500">불러오는 중...</div>
        ) : isError || !member ? (
          <div className="py-10 text-center text-sm text-neutral-500">
            상세 정보를 불러오지 못했습니다
          </div>
        ) : (
          <div>
            <section className="grid grid-cols-12 gap-6 px-16">
              <div className="col-span-2">
                <div className="flex items-center py-2 text-lg font-medium text-neutral-900">
                  고객 기본 정보
                </div>
              </div>
              <div className="col-span-5">
                <InfoRow label="이름" value={member.name} />
                <InfoRow label="성별" value={member.gender === "M" ? "남" : "여"} />
                <InfoRow label="생년월일" value={member.birthDate.replaceAll("-", ".")} />
                <InfoRow label="나이" value={`만 ${member.age}세`} />
                <InfoRow label="주소" value={member.fullAddress} />
              </div>
              <div className="col-span-5">
                <InfoRow label="이메일" value={member.email} />
                <InfoRow label="연락처" value={member.phone} />
                <InfoRow label="가입 요금제" value={member.currentMobilePlan} />
                <InfoRow
                  label="등급"
                  value={
                    <MembershipPopover
                      value={effectiveMembership}
                      onChange={setPendingMembership}
                    />
                  }
                />
                <InfoRow
                  label="상태"
                  value={<StatusPopover value={effectiveStatus} onChange={setPendingStatus} />}
                />
              </div>
            </section>

            <section className="grid grid-cols-12 gap-6 px-16 py-2">
              <div className="col-span-2 h-px"></div>
              <div className="col-span-10 h-px bg-neutral-300"></div>
            </section>

            <section className="grid grid-cols-12 gap-6 px-16">
              <div className="col-span-2">
                <div className="flex items-center py-2 text-lg font-medium text-neutral-900">
                  가입 및 약정 기간
                </div>
              </div>
              <div className="col-span-5">
                <InfoRow label="가입 일자" value={member.joinDate} />
                <InfoRow label="가입 기간" value={member.joinDurationText} />
                <InfoRow
                  label="약정 상태"
                  value={
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${contractStatus.color}`} />
                      <span>{contractStatus.text}</span>
                    </div>
                  }
                />
              </div>
              <div className="col-span-5">
                <InfoRow
                  label="약정 기간"
                  value={
                    member.isContracted ? `${dotContractStartDate} - ${dotContractEndDate}` : "-"
                  }
                />
                <InfoRow label="약정 개월 수" value={member.contractMonths} />
                <InfoRow
                  label="약정 남은 일수"
                  value={member.remainingDays !== null ? `${member.remainingDays} 일` : "-"}
                />
              </div>
            </section>

            <section className="grid grid-cols-12 gap-6 px-16 py-2">
              <div className="col-span-2 h-px"></div>
              <div className="col-span-10 h-px bg-neutral-300"></div>
            </section>

            <section className="grid grid-cols-12 gap-6 px-16">
              <div className="col-span-2">
                <div className="flex items-center py-2 text-lg font-medium text-neutral-900">
                  상담 이력 요약
                </div>
              </div>
              <div className="col-span-5">
                <InfoRow label="상담 총 횟수" value={`${member.totalSupportCount} 회`} />
                <InfoRow label="최근 상담 일자" value={dotLastSupportDate} />
              </div>
              <div className="col-span-5">
                {/* TODO: 추후 수정 예정 */}
                <InfoRow label="주요 상담 키워드" value="요금제, 불만, 해지" />
                <InfoRow label="최근 상담 결과" value="미해결" />
                <InfoRow label="상담 평점" value="5점" />
              </div>
            </section>

            <section className="text-md text-neutral-0 flex items-center justify-end gap-6 font-medium">
              <button
                className="bg-secondary-500 cursor-pointer rounded-sm px-4 py-1"
                onClick={() => {
                  setUpdateOpen(true);
                }}>
                수정
              </button>
              <button
                className="bg-danger-500 cursor-pointer rounded-sm px-4 py-1"
                onClick={handleClose}>
                취소
              </button>
            </section>

            <UpdateModal
              open={updateOpen}
              onOpenChange={setUpdateOpen}
              memberId={memberId}
              memberName={member?.name ?? ""}
              currentStatus={currentStatus}
              currentMembership={currentMembership}
              pendingStatus={effectiveStatus}
              pendingMembership={effectiveMembership}
            />
          </div>
        )}
      </div>
    </div>
  );
}
