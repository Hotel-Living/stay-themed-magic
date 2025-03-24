
import React from 'react';
import { Calendar } from 'lucide-react';
import EmptyState from './EmptyState';

export const BookingsContent = () => {
  return (
    <EmptyState 
      icon={<Calendar className="w-8 h-8" />}
      title="No Bookings Found"
      description="You don't have any bookings yet. They will appear here when customers book your properties."
    />
  );
};

export default BookingsContent;
