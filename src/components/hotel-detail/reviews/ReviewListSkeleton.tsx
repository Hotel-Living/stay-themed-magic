
import { Skeleton } from "@/components/ui/skeleton";

export function ReviewListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Skeleton className="h-10 w-[200px]" />
      </div>
      
      {Array(2).fill(0).map((_, i) => (
        <div key={i} className="border-t border-fuchsia-900/20 pt-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
