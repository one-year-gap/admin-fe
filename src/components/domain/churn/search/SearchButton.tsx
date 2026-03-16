import React from "react";

type SearchButtonProps = {
  onClick: () => void;
};

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      title="선택한 조건으로 고객을 조회합니다. 필터조건이 없는 경우 전체 고객을 조회합니다."
      onClick={onClick}
      className="bg-primary-500 hover:bg-primary-700 text-neutral-0 text-md border-primary-500 h-auto shrink-0 cursor-pointer rounded-lg border p-3 font-medium">
      선택된 조건 검색하기
    </button>
  );
}
