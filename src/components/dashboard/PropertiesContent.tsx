
import React from 'react';
import { Building } from 'lucide-react';
import EmptyState from './EmptyState';

export const PropertiesContent = () => {
  return (
    <EmptyState 
      icon={<Building className="w-8 h-8" />}
      title="No Properties Yet"
      description="Your saved properties and favorites will appear here. Browse our available properties and add them to your favorites to see them here."
      actionLink="/search"
      actionText="Browse Properties"
    />
  );
};

export default PropertiesContent;
