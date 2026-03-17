import { Check, ChevronDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type Coupon = {
  id: number;
  name: string;
};

export function CouponSelect({
  coupons,
  value,
  onChange,
}: {
  coupons: Coupon[];
  value: number | null;
  onChange: (id: number) => void;
}) {
  const current = coupons.find((c) => c.id === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-50 items-center justify-between rounded-md border border-neutral-300 px-3 py-2 text-sm hover:opacity-70">
          <span>{current?.name ?? "쿠폰 선택"}</span>
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-50 p-2">
        <ul className="space-y-1">
          {coupons.map((coupon) => (
            <li key={coupon.id}>
              <button
                type="button"
                onClick={() => onChange(coupon.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
                  value === coupon.id
                    ? "bg-primary-500 text-neutral-0"
                    : "hover:bg-primary-100 text-neutral-900",
                )}>
                {coupon.name}
                {value === coupon.id && <Check className="h-3 w-3" />}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
