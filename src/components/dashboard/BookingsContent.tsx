
import React from 'react';
import { Calendar } from 'lucide-react';
import EmptyState from './EmptyState';

export const BookingsContent = () => {
  return (
    <EmptyState 
      icon={<Calendar className="w-8 h-8" />}
      title="No Bookings Yet"
      description="Your bookings and reservations will appear here once you make them."
      action={
        <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg transition-colors">
          Find Hotels
        </button>
      }
    />
  );
};

export default BookingsContent;
