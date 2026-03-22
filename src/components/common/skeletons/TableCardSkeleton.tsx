import { Skeleton } from "./Skeleton";

type TableCardSkeletonProps = {
  rowCount?: number;
  columnCount?: number;
};

export function TableCardSkeleton({ rowCount = 10, columnCount = 10 }: TableCardSkeletonProps) {
  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="px-5 pb-4">
        <div className="overflow-hidden rounded-lg border border-neutral-300">
          <div
            className="grid border-b border-neutral-300"
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
            {Array.from({ length: columnCount }).map((_, index) => (
              <div key={index} className="px-4 py-4">
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

          <div className="divide-y divide-neutral-300">
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid"
                style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
                {Array.from({ length: columnCount }).map((__, cellIndex) => (
                  <div key={cellIndex} className="px-4 py-4">
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <Skeleton className="h-5 w-20" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="w-20" />
      </div>
    </div>
  );
}
