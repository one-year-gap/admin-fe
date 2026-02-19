import React from "react";

import { Search } from "lucide-react";

import { Input } from "../ui/input";

export function SearchBar() {
  return (
    // <div>
    //   <Input />
    // </div>
    <>
      <div className="relative w-full">
        <button className="absolute top-0 bottom-0 left-0 flex cursor-pointer items-center pl-4">
          <Search className="text-primary-500 size-5" />
        </button>

        <Input
          placeholder="고객명, 연락처로 검색"
          className="placeholder:text-md focus-visible:border-primary-500 focus:border-primary-500 text-md h-auto w-full rounded-xl border border-neutral-300 py-4 pl-12 font-medium shadow-none transition-colors duration-1000 ease-out placeholder:font-normal placeholder:text-neutral-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </>
  );
}
