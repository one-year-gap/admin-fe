import { ComposableMap, Geographies, Geography } from "react-simple-maps";
interface MapProps {
  selectedRegion: string | null;
  onSelect: (region: string | null) => void;
}
const geoUrl =
  "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo.json";

export default function Map({ selectedRegion, onSelect }: MapProps) {
  return (
    <div className="relative flex h-full w-1/2 items-center justify-center overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 7000, // 지도 크기
          center: [127.5, 36],
        }}
        className="mt-[80px] h-full w-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // 데이터에서 지역명 추출 (JSON 구조에 따라 'name' 혹은 'name_ko')
              const regionName = geo.properties.name;
              const isSelected = selectedRegion === regionName;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#FFF"
                  strokeWidth={0.5}
                  onClick={() => {
                    onSelect(regionName);
                    console.log(regionName);
                  }}
                  // 선택 상태에 따른 클래스 분기 수정
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
    </div>
  );
}
