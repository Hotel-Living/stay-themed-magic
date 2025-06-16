
import React, { useState } from 'react';
import { PropertyListView } from './views/PropertyListView';
import { PropertyEditView } from './views/PropertyEditView';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import { useMyProperties } from '@/hooks/useMyProperties';
import { useNavigate } from 'react-router-dom';
import { Hotel } from '@/integrations/supabase/types-custom';

export const PropertiesContent = () => {
  const { t, language } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'list' | 'edit'>('list');
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);

  // Fetch user's properties
  const { data: hotels, isLoading, error, refetch } = useMyProperties(user?.id);

  const handleViewDetails = (hotel: Hotel) => {
    console.log('View details for hotel:', hotel.id);
    // Navigate to hotel details or open modal
  };

  const handleEdit = (hotelId: string) => {
    console.log('Edit hotel:', hotelId);
    setEditingHotelId(hotelId);
    setCurrentView('edit');
  };

  const handleDelete = (hotel: Hotel) => {
    console.log('Delete hotel:', hotel.id);
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  const handleAddNewProperty = () => {
    console.log('Add new property');
    navigate('/add-property');
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setHotelToDelete(null);
  };

  const handleConfirmDelete = async () => {
    console.log('Confirm delete hotel:', hotelToDelete?.id);
    // TODO: Implement delete functionality
    setDeleteDialogOpen(false);
    setHotelToDelete(null);
    refetch();
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingHotelId(null);
    refetch(); // Refresh the list when coming back
  };

  if (currentView === 'edit' && editingHotelId) {
    return (
      <PropertyEditView 
        hotelId={editingHotelId}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PropertyListView 
        user={user}
        hotels={hotels || []}
        isLoading={isLoading}
        error={error}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNewProperty={handleAddNewProperty}
        deleteDialogOpen={deleteDialogOpen}
        hotelToDelete={hotelToDelete}
        onCloseDeleteDialog={handleCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
        refetch={refetch}
      />
    </div>
  );
};
