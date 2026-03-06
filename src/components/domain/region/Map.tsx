"use client";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { useRegionTop } from "@/lib/tanstack/query/region";
import type { RegionTopInfo } from "@/models/region";

interface MapProps {
  selectedRegion: string | null;
  onSelect: (region: string | null) => void;
}

const geoUrl =
  "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo.json";

// 지도 JSON에서 제공되는 지역명 ->  API가 사용하는 지역명
const mapToApiRegionName = (geoName: string): string => {
  const mapping: Record<string, string> = {
    서울특별시: "서울",
    인천광역시: "인천",
    경기도: "경기",
    강원도: "강원특별자치도",
    충청남도: "충남",
    세종특별자치시: "세종특별자치시",
    대전광역시: "대전",
    충청북도: "충북",
    경상북도: "경북",
    대구광역시: "대구",
    울산광역시: "울산",
    부산광역시: "부산",
    경상남도: "경남",
    전라북도: "전북특별자치도",
    광주광역시: "광주",
    전라남도: "전남",
    제주특별자치도: "제주특별자치도",
  };
  return mapping[geoName] || geoName;
};

export default function Map({ selectedRegion, onSelect }: MapProps) {
  const { data: regionTopResponse } = useRegionTop();
  const topData = regionTopResponse?.regions || [];

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    regionName: string | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    regionName: null,
  });
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 7000, // 지도 크기
          center: [127.5, 36],
        }}
        className="h-full w-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoRawName = geo.properties.name;
              const regionName = mapToApiRegionName(geoRawName);

              const isSelected = selectedRegion === regionName;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#FFF"
                  strokeWidth={0.5}
                  onClick={() => {
                    onSelect(regionName);
                  }}
                  onMouseEnter={(e) => {
                    setTooltip({
                      visible: true,
                      x: e.clientX,
                      y: e.clientY,
                      regionName,
                    });
                  }}
                  onMouseMove={(e) => {
                    setTooltip((prev) => ({
                      ...prev,
                      x: e.clientX,
                      y: e.clientY,
                    }));
                  }}
                  onMouseLeave={() => {
                    setTooltip((prev) => ({ ...prev, visible: false }));
                  }}
                  className={`cursor-pointer transition-all duration-300 outline-none ${
                    isSelected
                      ? "fill-secondary-700" // 선택되었을 때 색상
                      : "fill-secondary-500 hover:fill-secondary-300" // 기본 및 호버 색상
                  }`}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip.visible && tooltip.regionName && (
        <TooltipContent
          x={tooltip.x}
          y={tooltip.y}
          regionName={tooltip.regionName}
          topData={topData}
        />
      )}
    </div>
  );
}

function TooltipContent({
  x,
  y,
  regionName,
  topData,
}: {
  x: number;
  y: number;
  regionName: string;
  topData: RegionTopInfo[];
}) {
  const currentRegionData = topData.find((info) => info.region === regionName);

  return (
    <div
      className="bg-primary-500/90 text-neutral-0 pointer-events-none fixed z-50 rounded-lg p-4"
      style={{
        top: y + 15,
        left: x + 15,
      }}>
      <div className="text-md mb-2 font-semibold">{regionName}</div>

      {currentRegionData ? (
        <div className="flex gap-4">
          <div className="text-primary-300 flex flex-1 flex-col justify-end text-xs">
            <div>가입자 {currentRegionData.regionalSubscriberCount.toLocaleString()}명</div>
          </div>
          <div className="border-neutral-0 flex-1 border-l py-1 pl-4">
            <div className="mb-2 text-sm whitespace-nowrap">TOP 3 요금제</div>
            <ul className="text-secondary-300 flex flex-col gap-1.5 text-xs">
              {currentRegionData.topPlans?.slice(0, 3).map((plan: any, i: number) => (
                <li key={i} className="whitespace-nowrap">
                  {i + 1}. {plan.planName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-xs">데이터가 없습니다.</div>
      )}
    </div>
  );
}
