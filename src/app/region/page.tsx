"use client";
import { useState } from "react";

import Chart from "@/components/domain/region/Chart";
import Map from "@/components/domain/region/Map";

export default function Region() {
  const [clickedRegion, setClickedRegion] = useState<string | null>(null);
  return (
    <>
      <Map selectedRegion={clickedRegion} onSelect={setClickedRegion} />
      <Chart regionName={clickedRegion} />
    </>
  );
}
