import { Skeleton } from "./Skeleton";

type ChartCardSkeletonProps = {
  titleWidth?: string;
  subtitleWidth?: string;
  controls?: boolean;
  variant?: "line" | "donut" | "bars";
};

export function ChartCardSkeleton({
  titleWidth = "w-40",
  subtitleWidth = "w-28",
  controls = false,
  variant = "line",
}: ChartCardSkeletonProps) {
  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className={`h-6 ${titleWidth}`} />
          <Skeleton className={`h-4 ${subtitleWidth}`} />
        </div>

        {controls ? (
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        ) : null}
      </div>

      {variant === "donut" ? (
        <div className="flex items-center justify-evenly gap-8 py-4">
          <Skeleton className="h-56 w-56 rounded-full" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-14" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-64 w-full rounded-lg border border-neutral-200 px-6 py-5">
          <div className="flex h-full items-end gap-3">
            {(variant === "bars" ? Array.from({ length: 10 }) : Array.from({ length: 12 })).map(
              (_, index) => (
                <Skeleton
                  key={index}
                  className={`w-full rounded-t-md ${
                    variant === "bars"
                      ? index % 3 === 0
                        ? "h-32"
                        : index % 3 === 1
                          ? "h-20"
                          : "h-24"
                      : index % 4 === 0
                        ? "h-20"
                        : index % 4 === 1
                          ? "h-28"
                          : index % 4 === 2
                            ? "h-16"
                            : "h-24"
                  }`}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
