"use client";
import { useState } from "react";

import Chart from "@/components/domain/region/Chart";
import Map from "@/components/domain/region/Map";

export default function Region() {
  const [clickedRegion, setClickedRegion] = useState<string | null>(null);
  return (
    <div className="flex gap-6">
      <div className="w-1/2">
        <Map selectedRegion={clickedRegion} onSelect={setClickedRegion} />
      </div>
      <div className="w-1/2">
        <Chart regionName={clickedRegion} />
      </div>
    </div>
  );
}
