"use client";

import React from "react";

type Props = {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
  className?: string;
};

export function IndeterminateCheckbox({
  checked,
  indeterminate = false,
  onChange,
  ariaLabel,
  className,
}: Props) {
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = indeterminate && !checked;
  }, [indeterminate, checked]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-label={ariaLabel}
      className={className ?? "accent-secondary-500 h-4 w-4 cursor-pointer"}
    />
  );
}
