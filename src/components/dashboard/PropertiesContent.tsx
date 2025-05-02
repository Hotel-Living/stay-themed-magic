
import React, { useState, useEffect } from 'react';
import { Building, Edit, Trash2 } from "lucide-react";
import EmptyState from "./EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useMyProperties } from "@/hooks/useMyProperties";
import { HotelCard } from "@/components/HotelCard";
import AddProperty from "./AddProperty";
import { Hotel } from "@/integrations/supabase/types-custom";
import PropertyDetailView from "./property-view/PropertyDetailView";
import DeletePropertyDialog from "./DeletePropertyDialog";

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

  if (!user) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  const { data: hotels, isLoading, refetch } = useMyProperties(user.id);
  
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      console.log("Loaded hotel properties:", hotels);
    }
  }, [hotels]);

  useEffect(() => {
    if (propHotel) {
      setSelectedHotel(propHotel);
    }
  }, [propHotel]);

  const handleViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
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
      } catch (error) {
        console.error("Error during property deletion:", error);
      }
    }
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-pulse h-80 bg-[#5c0869]" />
        ))}
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
