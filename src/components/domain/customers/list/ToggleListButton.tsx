import React from "react";

import { ListCheck } from "lucide-react";

export function ToggleListButton() {
  return (
    <button
      type="button"
      title="선택한 고객목록을 초기화 합니다."
      className="bg-primary-500 hover:bg-primary-700 text-neutral-0 text-md border-primary-500 h-auto shrink-0 cursor-pointer rounded-lg border p-3 font-medium">
      <ListCheck />
    </button>
  );
}
