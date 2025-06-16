
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useMyProperties } from "@/hooks/useMyProperties";
import { Hotel } from "@/integrations/supabase/types-custom";
import { PropertyListView } from "./views/PropertyListView";
import { PropertyDetailView } from "./views/PropertyDetailView";
import { PropertyEditView } from "./views/PropertyEditView";
import AddProperty from "@/components/dashboard/AddProperty";

interface PropertiesContentProps {
  hotel?: Hotel;
  onEdit?: () => void;
}

export const PropertiesContent = ({ hotel: propHotel, onEdit: propOnEdit }: PropertiesContentProps = {}) => {
  const { user } = useAuth();
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(propHotel || null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);

  // Use the enhanced hook to get complete hotel data
  const { data: hotels, isLoading, error, refetch } = useMyProperties(user?.id);
  
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      console.log("Loaded hotel properties:", hotels);
    }
    
    if (error) {
      console.error("Error loading hotels:", error);
    }
  }, [hotels, error]);

  useEffect(() => {
    if (propHotel) {
      setSelectedHotel(propHotel);
    }
  }, [propHotel]);

  const handleViewDetails = (hotel: Hotel) => {
    // Find the complete hotel data from the hotels array
    const completeHotel = hotels?.find(h => h.id === hotel.id) || hotel;
    console.log("Selected hotel for details view:", completeHotel);
    setSelectedHotel(completeHotel);
    setEditingHotelId(null);
    setShowAddProperty(false);
  };

  const handleBackToList = () => {
    setSelectedHotel(null);
    setEditingHotelId(null);
    setShowAddProperty(false);
  };

  const handleEdit = () => {
    if (selectedHotel) {
      setEditingHotelId(selectedHotel.id);
      setShowAddProperty(false);
    } else if (propOnEdit) {
      propOnEdit();
    }
  };

  const handleAddNewProperty = () => {
    setShowAddProperty(true);
    setSelectedHotel(null);
    setEditingHotelId(null);
  };

  const handleDoneAddingProperty = () => {
    setShowAddProperty(false);
    refetch(); // Refresh the properties list
  };

  const handleDelete = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (hotelToDelete) {
      try {
        // Deletion will be handled by the DeletePropertyDialog component
        await refetch();
        setDeleteDialogOpen(false);
        setHotelToDelete(null);
        setSelectedHotel(null); // Return to list view after deletion
      } catch (error) {
        console.error("Error during property deletion:", error);
      }
    }
  };

  // Rendering logic for different states
  if (showAddProperty) {
    return (
      <AddProperty 
        onDoneEditing={handleDoneAddingProperty}
      />
    );
  }

  if (editingHotelId) {
    return (
      <PropertyEditView 
        hotelId={editingHotelId} 
        onBack={handleBackToList} 
      />
    );
  }

  if (selectedHotel) {
    return (
      <PropertyDetailView 
        hotel={selectedHotel} 
        onBack={handleBackToList}
        onEdit={handleEdit}
      />
    );
  }

  return (
    <PropertyListView 
      user={user}
      hotels={hotels}
      isLoading={isLoading}
      error={error}
      onViewDetails={handleViewDetails}
      onEdit={setEditingHotelId}
      onDelete={handleDelete}
      onAddNewProperty={handleAddNewProperty}
      deleteDialogOpen={deleteDialogOpen}
      hotelToDelete={hotelToDelete}
      onCloseDeleteDialog={() => setDeleteDialogOpen(false)}
      onConfirmDelete={confirmDelete}
      refetch={refetch}
    />
  );
};

export default PropertiesContent;
