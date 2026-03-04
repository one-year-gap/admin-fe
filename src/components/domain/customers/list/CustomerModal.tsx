import type { ReactNode } from "react";

import { X } from "lucide-react";

import { useAdminMembersDetail } from "@/lib/tanstack/query/useAdminMembersDetail";

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

  if (!open) return null;

  const member = data?.data;

  const getStatus = () => {
    if (member?.status === "DELETED") return { color: "bg-neutral-500", text: "탈퇴" };

    if (member?.status === "PROCESSING") {
      return { color: "bg-warning-500", text: "가입중" };
    }

    if (member?.status === "BANNED") {
      return { color: "bg-danger-500", text: "정지" };
    }

    if (member?.status === "ACTIVE") {
      return { color: "bg-success-500", text: "정상" };
    }
    return { color: "bg-neutral-500", text: "-" };
  };
  const status = getStatus();

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
        if (e.key === "Escape") onOpenChange(false);
      }}
      tabIndex={-1}
      ref={(el) => el?.focus()}>
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-neutral-900 opacity-60"
        onClick={() => onOpenChange(false)}
      />

      {/* 모달창 */}
      <div className="bg-neutral-0 relative z-10 w-full max-w-[60vw] rounded-lg border border-neutral-300 p-6 text-neutral-900 shadow-xl">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">고객 상세 정보</h2>
          <button
            onClick={() => onOpenChange(false)}
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
            상세 정보를 불러오지 못했습니다.
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
                  value={member.membership === "GOLD" ? "우수" : member.membership}
                />
                <InfoRow
                  label="상태"
                  value={
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${status?.color}`} />
                      <span>{status?.text}</span>
                    </div>
                  }
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
          </div>
        )}
      </div>
    </div>
  );
}
