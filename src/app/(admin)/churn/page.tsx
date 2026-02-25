"use client";

import React, { useState } from "react";

import { ChurnChart } from "@/components/domain/churn/ChurnChart";
import { ChurnFeed } from "@/components/domain/churn/ChurnFeed";
import { CustomersList } from "@/components/domain/churn/list/ChurnList";
import { SearchBar } from "@/components/domain/churn/SearchBar";

export default function ChurnPage() {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      {/* 검색바 */}
      <section className="col-span-12">
        <SearchBar value={keyword} onChange={setKeyword} />
      </section>

      {/* 고객목록 */}
      <section className="col-span-12">
        <CustomersList keyword={keyword} />
      </section>

      {/* 차트 */}
      <section className="col-span-12 md:col-span-6">
        <ChurnChart />
      </section>
      <section className="col-span-12 md:col-span-6">
        <ChurnFeed />
      </section>
    </>
  );
}
