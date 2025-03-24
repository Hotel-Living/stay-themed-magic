
import React from 'react';
import { Building, Plus } from 'lucide-react';
import EmptyState from './EmptyState';

export const PropertiesContent = () => {
  return (
    <EmptyState 
      icon={<Building className="w-8 h-8" />}
      title="No Properties Found"
      description="You haven't added any properties yet. Add your first property to get started."
    />
  );
};

export default PropertiesContent;
