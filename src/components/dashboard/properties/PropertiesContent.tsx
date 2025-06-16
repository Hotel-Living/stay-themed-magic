
import React, { useState } from 'react';
import { PropertyListView } from './views/PropertyListView';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from "@/integrations/supabase/types-custom";
import { useNavigate } from 'react-router-dom';

export const PropertiesContent = () => {
  const { t, language } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);

  // Fetch hotels for the current user
  const { data: hotels, isLoading, error, refetch } = useQuery({
    queryKey: ['user-hotels', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleViewDetails = (hotel: Hotel) => {
    navigate(`/hotel-dashboard/property/${hotel.id}`);
  };

  const handleEdit = (hotelId: string) => {
    navigate(`/hotel-dashboard/property/edit/${hotelId}`);
  };

  const handleDelete = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  const handleAddNewProperty = () => {
    navigate('/add-property');
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setHotelToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!hotelToDelete) return;
    
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelToDelete.id);
      
      if (error) throw error;
      
      refetch();
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <PropertyListView
      user={user}
      hotels={hotels}
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
  );
};
