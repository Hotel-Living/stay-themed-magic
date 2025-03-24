
import React from 'react';
import { Users } from 'lucide-react';
import EmptyState from './EmptyState';

export const GuestsContent = () => {
  return (
    <EmptyState 
      icon={<Users className="w-8 h-8" />}
      title="No Guest Data Yet"
      description="Information about your guests will appear here once you receive bookings."
    />
  );
};

export default GuestsContent;
