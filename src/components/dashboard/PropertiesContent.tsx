
import React, { useState, useEffect } from 'react';
import { Building, Edit } from "lucide-react";
import EmptyState from "./EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useMyProperties } from "@/hooks/useMyProperties";
import { HotelCard } from "@/components/HotelCard";
import AddProperty from "./AddProperty";
import { Hotel } from "@/integrations/supabase/types-custom";
import PropertyDetailView from "./property-view/PropertyDetailView";

export const PropertiesContent = () => {
  const { user } = useAuth();
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  if (!user) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  const { data: hotels, isLoading } = useMyProperties(user.id);
  
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      console.log("Loaded hotel properties:", hotels);
    }
  }, [hotels]);

  const handleViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setEditingHotelId(null);
  };

  const handleBackToList = () => {
    setSelectedHotel(null);
    setEditingHotelId(null);
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
          onEdit={() => setEditingHotelId(selectedHotel.id)} 
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
              themes={(hotel.hotel_themes || []).map((ht) => ht.themes)}
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
          <button
            className="absolute top-2 right-2 z-10 bg-fuchsia-600/90 text-white rounded-full p-2 shadow hover:bg-fuchsia-700 transition-opacity opacity-90 group-hover:opacity-100"
            title="Edit this property"
            onClick={() => setEditingHotelId(hotel.id)}
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default PropertiesContent;
