
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ReviewsLoading() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      <div className="flex justify-between mb-6">
        <Skeleton className="h-8 w-40" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
