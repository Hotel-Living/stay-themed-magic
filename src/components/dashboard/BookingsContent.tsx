
import React from 'react';
import BookingItem from './BookingItem';
import EmptyState from './EmptyState';
import { Skeleton } from '@/components/ui/skeleton';

interface BookingsContentProps {
  bookings: any[];
  isLoading: boolean;
}

export const BookingsContent: React.FC<BookingsContentProps> = ({ bookings, isLoading }) => {
  if (isLoading) {
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
  }

  if (bookings.length === 0) {
    return (
      <EmptyState 
        title="No bookings yet"
        description="You haven't made any bookings yet. Start exploring hotels and make your first reservation!"
        icon={<span className="w-10 h-10">📅</span>}
        actionLink="/"
        actionText="Explore Hotels"
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingItem 
          key={booking.id} 
          name={booking.hotels?.name || "Unknown Hotel"}
          dates={`${new Date(booking.check_in).toLocaleDateString()} - ${new Date(booking.check_out).toLocaleDateString()}`}
          property={booking.hotels?.city || "Unknown Location"}
          status={booking.status || "pending"}
        />
      ))}
    </div>
  );
};

export default BookingsContent;
