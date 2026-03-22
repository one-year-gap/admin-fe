import { Skeleton } from "./Skeleton";

type FeedCardSkeletonProps = {
  itemCount?: number;
};

export function FeedCardSkeleton({ itemCount = 6 }: FeedCardSkeletonProps) {
  return (
    <div className="bg-neutral-0 flex flex-col gap-4 rounded-xl border border-neutral-300 p-6">
      <Skeleton className="h-6 w-36" />

      <div className="flex h-[669px] px-6">
        <Skeleton className="h-full w-px rounded-none" />

        <div className="w-full space-y-6 py-6 pl-6">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
