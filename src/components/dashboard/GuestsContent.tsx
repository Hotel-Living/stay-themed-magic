
import React from 'react';
import { Users } from 'lucide-react';
import EmptyState from './EmptyState';

export const GuestsContent = () => {
  return (
    <EmptyState 
      icon={<Users className="w-8 h-8" />}
      title="No Guests Yet"
      description="Information about guests who have booked your properties will appear here."
    />
  );
};

export default GuestsContent;
