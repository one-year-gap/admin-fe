"use client";
import { useState } from "react";

import { Download,Lock } from "lucide-react";

const data = [
  {
    report_id: "rep-20260213-001",
    metadata: {
      analysis_date: "2026.02.13",
      target_client_count: 100000,
    },
    summary_stats: [
      { label: "전체 고객", value: "12,400명", change: "+3.2%", status: "up" },
      { label: "이탈 위험", value: "148명", change: "+12%", status: "up" },
      { label: "VIP/Premium", value: "60%", sub_value: "7,440명", status: "none" },
      { label: "평균 ARPU", value: "62,300원", change: "-2.8%", status: "down" },
    ],
    sections: [
      {
        order: 1,
        title: "핵심 요약",
        content:
          "전체 고객 12,400명 중 VIP/Premium 등급이 60%를 차지하며, 최근 30일 간 이탈 위험 고객이 12% 증가하였습니다. 특히 20-30대 헤비 유저의 데이터 사용량이 전월 대비 15% 감소한 것으로 나타났으며, 약정 만료 예정 고객 중 45%가 갱신 의사가 불투명한 상태입니다.",
      },
      {
        order: 2,
        title: "핵심 지표 현황",
        content:
          "등급 분포: VIP/Premium 60% / 일반 40% 이탈 위험: 최근 30일 대비 +12% 이용 변화: 20~30대 헤비 유저 데이터 사용량 -15% (MoM) 리텐션 리스크: 약정 만료 예정 고객 중 45% 갱신 의사 불투명",
      },
      {
        order: 3,
        title: "인사이트",
        content:
          "고가치 고객 비중이 높아 “방어”가 곧 매출 방어 VIP/Premium이 과반 이상이라, 소수 고객의 이탈이 매출/ARPU에 미치는 영향이 큽니다. 약정 만료 구간이 이탈 위험 상승의 핵심 트리거 갱신 의사 불투명(45%) 구간은 “이탈 위험 증가(+12%)”와 동행할 가능성이 높아, 선제적 리마인드/혜택 제시가 효과적입니다. 20~30대 헤비 유저 데이터 사용량 감소는 ‘활성도 하락’ 신호 -15% 감소는 단순 계절 요인보다 경쟁사/콘텐츠 소비 변화/가정 와이파이 전환 등이 복합적으로 작용했을 수 있어, 앱 내 행동/콘텐츠 소비 지표와 교차 분석이 필요합니다.",
      },
    ],
  },
];

export default function Proposal() {
  const [isGenerated, setIsGenerated] = useState(false);
  const report = data[0];
  return (
    <div className="p-8 text-lg text-neutral-900">
      <div>
        <span className="text-secondary-500">[보고서]</span> AI가 데이터를 분석하여 맞춤형 보고서를
        생성합니다. 보고서를 확인한 후 제안 사항을 작성하여 제출할 수 있습니다.
      </div>
      <div className="mt-8 flex gap-8">
        {/* 왼쪽: 보고서 미리보기 */}
        <div className="bg-neutral-0 relative min-h-[600px] flex-1 overflow-hidden border border-gray-200 p-8 shadow-sm">
          <div className="space-y-4">
            {!isGenerated ? (
              <>
                <h2 className="mb-2 font-semibold">보고서 미리보기</h2>
                <p className="mb-3 text-sm text-neutral-500">
                  보고서 생성 버튼을 눌러 AI 분석 결과를 확인하세요.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4 pt-4">
                    <div className="h-24 flex-1 rounded bg-neutral-100"></div>
                    <div className="h-24 flex-1 rounded bg-neutral-100"></div>
                    <div className="h-24 flex-1 rounded bg-neutral-100"></div>
                    <div className="h-24 flex-1 rounded bg-neutral-100"></div>
                  </div>
                  <div className="h-6 w-1/3 rounded bg-neutral-100"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-neutral-100"></div>
                    <div className="h-4 w-full rounded bg-neutral-100"></div>
                    <div className="h-4 w-4/5 rounded bg-neutral-100"></div>
                  </div>
                </div>

                {/* 중앙 잠금 오버레이*/}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-secondary-300 mb-3 rounded-full p-2">
                    <Lock className="text-neutral-0" />
                  </div>
                  <div className="mb-6 text-center">
                    <p className="font-medium text-neutral-900">AI 보고서 미생성</p>
                    <p className="text-sm text-neutral-500">
                      버튼을 클릭하여 분석 보고서를 생성하세요.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsGenerated(true)}
                    className="bg-secondary-500 px-7 py-3 text-white">
                    보고서 생성하기
                  </button>
                </div>
              </>
            ) : (
              /* 생성 후 */
              <>
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h2 className="mb-2 font-semibold">AI 분석 보고서</h2>
                    <p className="text-sm text-neutral-500">
                      분석 일시 {report?.metadata?.analysis_date} | 분석 대상 현재 고객{" "}
                      {report?.metadata?.target_client_count?.toLocaleString()}명
                    </p>
                  </div>

                  <button className="bg-secondary-500 text-neutral-0 flex items-center gap-2 px-4 py-2 text-sm">
                    <Download />
                    다운로드
                  </button>
                </div>

                <div className="space-y-6 bg-neutral-100 text-neutral-900">
                  <div className="m-5 flex gap-5 pt-5">
                    {report?.summary_stats.map((stat, index) => (
                      <div key={index} className="bg-neutral-0 mt-5 flex-1 rounded-xl p-5">
                        <div className="flex flex-col gap-2">
                          <p className="text-xs text-neutral-500">{stat.label}</p>
                          <p className="text-xl font-bold">{stat.value}</p>
                          <div className="flex items-center gap-2 text-sm">
                            {stat.change && (
                              <span
                                className={`font-semibold ${stat.status === "up" ? "text-secondary-500" : "text-danger-500"}`}>
                                {stat.change}
                              </span>
                            )}
                            {stat.sub_value && (
                              <span className="text-danger-500">{stat.sub_value}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="m-5 h-[1px] bg-neutral-300" />
                  <div className="m-5 flex gap-5 pb-6">
                    <div className="space-y-12">
                      {report.sections.map((section) => (
                        <div key={section.order} className="flex gap-5">
                          <div className="flex-shrink-0">
                            <div className="bg-secondary-500 flex h-7 w-7 items-center justify-center rounded text-sm font-bold text-white">
                              {section.order}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-4 text-xl font-bold">{section.title}</h3>
                            <div className="text-base leading-relaxed whitespace-pre-wrap">
                              {section.content}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 오른쪽: 제안서 작성 섹션 */}
        {!isGenerated ? (
          <div className="flex h-90 w-100 flex-col border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-2 font-semibold">제안서 작성</h2>
            <p className="mb-3 text-sm text-neutral-500">
              보고서를 먼저 생성 한 후 제안서를 작성할 수 있습니다.
            </p>
            <div className="flex h-48 w-full flex-col items-center justify-center text-neutral-500 shadow-sm">
              <div className="bg-secondary-300 mb-3 rounded-full p-2">
                <Lock className="text-neutral-0" />
              </div>
              <p className="text-sm font-medium">보고서 미생성</p>
              <p className="text-xs">왼쪽에서 보고서를 생성 한 후 작성 가능합니다.</p>
            </div>
          </div>
        ) : (
          <div className="flex w-100 flex-col border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-2 font-semibold">제안서 작성</h2>
            <p className="text-sm text-neutral-500">AI보고서를 참조하여 제안 내용을 작성해주세요</p>
            <div className="my-5 h-[1px] bg-neutral-300" />
            <div className="flex h-full w-full flex-col gap-6">
              <div className="text-md">
                <div className="pb-2 font-semibold">제목</div>
                <input
                  className="w-full border border-gray-200 p-4 outline-none"
                  placeholder="제안 내용을 입력해주세요..."></input>
              </div>
              <div className="text-md">
                <div className="pb-2 font-semibold">카테고리</div>
                <input
                  className="w-full border border-gray-200 p-4 outline-none"
                  placeholder="제안 내용을 입력해주세요..."></input>
              </div>
              <div className="text-md">
                <div className="pb-2 font-semibold">제안 내용</div>
                <textarea
                  className="h-70 w-full resize-none border border-gray-200 p-4 outline-none"
                  placeholder="제안 내용을 입력해주세요..."></textarea>
              </div>

              <button className="bg-secondary-500 mt-4 py-3 text-white">제출하기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
