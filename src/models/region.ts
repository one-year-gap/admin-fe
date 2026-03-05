export interface RegionResponseDTO {
  regions: RegionInfo[];
  axisMax: { salesAxisMax: number; dataUsageAxisMaxGb: number };
}

export interface RegionInfo {
  regionCode: string; // 예: "R001"
  region: string; // 예: "서울특별시"
  averageSales: number; // ARPU (평균 매출)
  averageDataUsageGb: number; // 평균 데이터 사용량 (GB)
}

export interface RegionTopResponseDTO {
  regions: RegionTopInfo[];
}
export interface RegionTopInfo {
  regionCode: string; // 예: "R001"
  region: string; // 예: "서울특별시"
  regionalSubscriberCount: number; // 지역 구독자 수
  topPlans: RegionTopPlan[];
}
export interface RegionTopPlan {
  planName: string; // 요금제 명칭
}
