
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const BookingsLoading: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-card rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4 animate-pulse">
            <Skeleton className="h-24 w-24 md:h-36 md:w-36 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-60" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-24 mt-3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsLoading;
