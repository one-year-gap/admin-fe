import React from "react";

import { FunnelX } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

export function ResetFilterButton({ onClick, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="필터 초기화"
      title="선택한 필터조건을 초기화 합니다."
      className={cn(
        "bg-primary-500 text-neutral-0 text-md border-primary-500 h-auto shrink-0 cursor-pointer rounded-lg border p-3 font-medium",
        "hover:bg-primary-700 disabled:hover:bg-primary-500 disabled:cursor-default disabled:opacity-50",
      )}>
      <FunnelX />
    </button>
  );
}
