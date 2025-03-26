
import React from 'react';
import { HotelCard } from '@/components/HotelCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { HotelDetailProps } from '@/types/hotel';

interface SearchResultsListProps {
  items: HotelDetailProps[];
  isLoading: boolean;
}

export function SearchResultsList({ items, isLoading }: SearchResultsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {items.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
