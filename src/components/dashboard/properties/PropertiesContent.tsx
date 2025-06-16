
import React from 'react';
import { PropertyListView } from './views/PropertyListView';
import { useTranslation } from '@/hooks/useTranslation';

export const PropertiesContent = () => {
  const { t, language } = useTranslation();

  return (
    <div className="space-y-6">
      <PropertyListView 
        user={null}
        hotels={[]}
        isLoading={false}
        error={null}
        onViewDetails={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onAddNewProperty={() => {}}
        deleteDialogOpen={false}
        hotelToDelete={null}
        onCloseDeleteDialog={() => {}}
        onConfirmDelete={() => {}}
        refetch={() => {}}
      />
    </div>
  );
};
