import { Clock } from "lucide-react";

type ChurnRowProps = {
  level: "위험" | "경고";
  time: string;
  name: string;
  reason: string;
};

const LEVEL_STYLE = {
  위험: "bg-danger-500",
  경고: "bg-warning-500",
} as const;

export function ChurnRow({ level, time, name, reason }: ChurnRowProps) {
  return (
    <div className="flex flex-col gap-2 border-t border-neutral-300 px-4 pt-2 pb-4 text-sm text-neutral-700">
      <section className="flex items-center gap-6">
        <div className={`text-neutral-0 ${LEVEL_STYLE[level]} rounded-full px-3 py-1`}>{level}</div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5" />
          <span>{time}</span>
        </div>
      </section>
      <section className="text-md pl-2 font-medium text-neutral-900">{name}님</section>
      <section className="pl-1">{reason}</section>
    </div>
  );
}
