
import React from 'react';
import { Calendar } from 'lucide-react';
import EmptyState from './EmptyState';

export const BookingsContent = () => {
  return (
    <EmptyState 
      icon={<Calendar className="w-8 h-8" />}
      title="No Bookings Yet"
      description="Your bookings and reservations will appear here. Find a hotel you like and book a stay to see it listed here."
      actionLink="/search"
      actionText="Find Hotels"
    />
  );
};

export default BookingsContent;
