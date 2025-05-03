import React, { useState, useEffect } from 'react';
import { Building, Edit, Trash2, AlertTriangle } from "lucide-react";
import EmptyState from "./EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useMyProperties } from "@/hooks/useMyProperties";
import { HotelCard } from "@/components/HotelCard";
import AddProperty from "./AddProperty";
import { Hotel } from "@/integrations/supabase/types-custom";
import PropertyDetailView from "./property-view/PropertyDetailView";
import DeletePropertyDialog from "./DeletePropertyDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
  };

  const handleBackToList = () => {
    setSelectedHotel(null);
    setEditingHotelId(null);
  };

  const handleEdit = () => {
    if (selectedHotel) {
      setEditingHotelId(selectedHotel.id);
    } else if (propOnEdit) {
      propOnEdit();
    }
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

  if (!user) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  if (editingHotelId) {
    return (
      <div>
        <button
          className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
          onClick={handleBackToList}
        >
          Back to My Properties
        </button>
        <AddProperty editingHotelId={editingHotelId} onDoneEditing={handleBackToList} />
      </div>
    );
  }

  if (selectedHotel) {
    return (
      <div>
        <button
          className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
          onClick={handleBackToList}
        >
          Back to My Properties
        </button>
        <PropertyDetailView 
          hotel={selectedHotel} 
          onEdit={handleEdit} 
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Properties</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <Skeleton className="h-48 w-full bg-fuchsia-900/30" />
              <div className="p-4 space-y-2 bg-fuchsia-950/30">
                <Skeleton className="h-6 w-3/4 bg-fuchsia-900/30" />
                <Skeleton className="h-4 w-1/2 bg-fuchsia-900/30" />
                <Skeleton className="h-4 w-2/3 bg-fuchsia-900/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 border border-red-700/50 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <h3 className="text-lg font-semibold text-red-300">Error Loading Properties</h3>
        </div>
        <p className="text-white/70 mb-4">There was a problem loading your properties. Please try again later.</p>
        <Button onClick={() => refetch()} variant="outline" className="bg-red-700/30 hover:bg-red-700/50">
          Try Again
        </Button>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="relative group">
            <div onClick={() => handleViewDetails(hotel)} className="cursor-pointer">
              <HotelCard
                id={hotel.id}
                name={hotel.name}
                city={hotel.city}
                country={hotel.country}
                stars={hotel.category || 0}
                pricePerMonth={hotel.price_per_month || 0}
                themes={(hotel.hotel_themes || []).map((ht) => ht.themes || { id: "", name: "" })}
                image={
                  hotel.main_image_url
                    ? hotel.main_image_url
                    : hotel.hotel_images && hotel.hotel_images.length > 0
                    ? hotel.hotel_images[0].image_url
                    : "/placeholder.svg"
                }
                availableMonths={hotel.available_months || []}
              />
            </div>
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button
                className="bg-fuchsia-600/90 text-white rounded-full p-2 shadow hover:bg-fuchsia-700 transition-opacity opacity-90 group-hover:opacity-100"
                title="Edit this property"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingHotelId(hotel.id);
                }}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="bg-red-500/90 text-white rounded-full p-2 shadow hover:bg-red-600 transition-opacity opacity-90 group-hover:opacity-100"
                title="Delete this property"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(hotel);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {hotelToDelete && (
        <DeletePropertyDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          hotelName={hotelToDelete.name}
          hotelId={hotelToDelete.id}
        />
      )}
    </>
  );
};

export default PropertiesContent;
