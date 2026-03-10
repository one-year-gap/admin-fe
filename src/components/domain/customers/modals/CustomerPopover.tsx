import { Check, ChevronDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { label: "정상", value: "ACTIVE", color: "bg-success-500" },
  { label: "정지", value: "BANNED", color: "bg-danger-500" },
  { label: "가입중", value: "PROCESSING", color: "bg-warning-500" },
  { label: "탈퇴", value: "DELETED", color: "bg-neutral-500" },
] as const;

const MEMBERSHIP_OPTIONS = [
  { label: "우수", value: "GOLD" },
  { label: "VIP", value: "VIP" },
  { label: "VVIP", value: "VVIP" },
] as const;

export function MembershipPopover({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const current = MEMBERSHIP_OPTIONS.find((o) => o.value === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-23 items-center justify-around gap-2 rounded-sm border border-neutral-300 px-2 py-1 hover:opacity-70">
          <span>{current?.label ?? "-"}</span>
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-23 p-2">
        <ul className="space-y-1">
          {MEMBERSHIP_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
                  value === opt.value
                    ? "bg-primary-500 text-neutral-0"
                    : "hover:bg-primary-100 text-neutral-900",
                )}>
                {opt.label}
                {value === opt.value && <Check className="h-3 w-3" />}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export function StatusPopover({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const current = STATUS_OPTIONS.find((o) => o.value === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-23 items-center justify-around gap-2 rounded-sm border border-neutral-300 px-2 py-1 hover:opacity-70">
          <span className={cn("h-3 w-3 rounded-full", current?.color ?? "bg-neutral-300")} />
          <span>{current?.label ?? "-"}</span>
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-23 p-2">
        <ul className="space-y-1">
          {STATUS_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
                  value === opt.value
                    ? "bg-primary-500 text-neutral-0"
                    : "hover:bg-primary-100 text-neutral-900",
                )}>
                <div className="flex items-center gap-2">{opt.label}</div>
                {value === opt.value && <Check className="h-3 w-3" />}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
