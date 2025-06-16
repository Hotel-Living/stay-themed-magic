
import React from 'react';
import { Calendar } from 'lucide-react';
import EmptyState from './EmptyState';

export const CalendarContent = () => {
  return (
    <EmptyState 
      icon={<Calendar className="w-8 h-8" />}
      title="Calendar"
      description="Your booking calendar and availability management will appear here."
    />
  );
};

export default CalendarContent;
