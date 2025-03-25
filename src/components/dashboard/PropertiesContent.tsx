
import React from 'react';
import { Building } from 'lucide-react';
import EmptyState from './EmptyState';

export const PropertiesContent = () => {
  return (
    <EmptyState 
      icon={<Building className="w-8 h-8" />}
      title="No Properties Yet"
      description="Your saved properties and favorites will appear here."
      action={
        <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg transition-colors">
          Browse Properties
        </button>
      }
    />
  );
};

export default PropertiesContent;
