import { X } from "lucide-react";

import { Skeleton } from "@/components/common/skeletons/Skeleton";

function SkeletonInfoRow({ interactive = false }: { interactive?: boolean }) {
  return (
    <div className="text-md grid grid-cols-12 items-center gap-3 py-2 font-medium">
      <div className="col-span-4">
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="col-span-8">
        {interactive ? (
          <Skeleton className="h-9 w-24 rounded-sm" />
        ) : (
          <Skeleton className="h-5 w-full max-w-[220px]" />
        )}
      </div>
    </div>
  );
}

function SkeletonSection({
  titleWidth = "w-32",
  leftRows = 3,
  rightRows = 3,
  interactiveRows = [],
}: {
  titleWidth?: string;
  leftRows?: number;
  rightRows?: number;
  interactiveRows?: Array<"left" | "right">;
}) {
  return (
    <>
      <section className="grid grid-cols-12 gap-6 px-16">
        <div className="col-span-2">
          <div className="flex items-center py-2">
            <Skeleton className={`h-7 ${titleWidth}`} />
          </div>
        </div>

        <div className="col-span-5">
          {Array.from({ length: leftRows }).map((_, index) => (
            <SkeletonInfoRow
              key={`left-${index}`}
              interactive={interactiveRows.includes("left") && index === leftRows - 1}
            />
          ))}
        </div>

        <div className="col-span-5">
          {Array.from({ length: rightRows }).map((_, index) => (
            <SkeletonInfoRow
              key={`right-${index}`}
              interactive={interactiveRows.includes("right") && index === rightRows - 1}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6 px-16 py-2">
        <div className="col-span-2 h-px"></div>
        <div className="col-span-10 h-px bg-neutral-300"></div>
      </section>
    </>
  );
}

export function CustomerModalSkeleton() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true">
      <div className="absolute inset-0 bg-neutral-900 opacity-60" />

      <div className="bg-neutral-0 relative z-10 w-full max-w-[60vw] rounded-lg border border-neutral-300 p-6 text-neutral-900 shadow-xl">
        <header className="mb-4 flex items-center justify-between">
          <Skeleton className="h-7 w-36" />
          <button className="cursor-default text-neutral-400" aria-label="모달 닫기" type="button">
            <X className="h-6 w-6" />
          </button>
        </header>

        <div>
          <SkeletonSection
            titleWidth="w-28"
            leftRows={5}
            rightRows={5}
            interactiveRows={["right"]}
          />
          <SkeletonSection titleWidth="w-24" leftRows={3} rightRows={3} />

          <section className="grid grid-cols-12 gap-6 px-16">
            <div className="col-span-2">
              <div className="flex items-center py-2">
                <Skeleton className="h-7 w-28" />
              </div>
            </div>
            <div className="col-span-5">
              <SkeletonInfoRow />
              <SkeletonInfoRow />
              <SkeletonInfoRow />
            </div>
            <div className="col-span-5">
              <SkeletonInfoRow />
              <SkeletonInfoRow />
              <SkeletonInfoRow />
            </div>
          </section>

          <section className="text-md text-neutral-0 flex items-center justify-end gap-6 pt-4 font-medium">
            <Skeleton className="h-8 w-16 rounded-sm" />
            <Skeleton className="h-8 w-16 rounded-sm" />
          </section>
        </div>
      </div>
    </div>
  );
}
