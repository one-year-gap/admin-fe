"use client";
import { useState } from "react";

import Chart from "@/components/domain/region/Chart";
import Map from "@/components/domain/region/Map";

export default function Region() {
  const [clickedRegion, setClickedRegion] = useState<string | null>(null);
  return (
    <div className="flex h-full w-full gap-4 p-6">
      <Map selectedRegion={clickedRegion} onSelect={setClickedRegion} />
      <Chart regionName={clickedRegion} />
    </div>
  );
}
