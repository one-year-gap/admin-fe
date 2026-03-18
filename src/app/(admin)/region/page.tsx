"use client";
import { useState } from "react";

import Chart from "@/components/domain/region/Chart";
import Map from "@/components/domain/region/Map";

export default function Region() {
  const [clickedRegion, setClickedRegion] = useState<string | null>(null);
  return (
    // <div className="grid grid-cols-12 gap-6">
    <div className="flex h-full w-full gap-4 px-15">
      {/* <section className="col-span-6"> */}
      <Map selectedRegion={clickedRegion} onSelect={setClickedRegion} />
      {/* </section> */}
      {/* <section className="col-span-6"> */}
      <Chart regionName={clickedRegion} />
      {/* </section> */}
    </div>
  );
}
