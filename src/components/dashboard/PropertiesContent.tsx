
import React, { useState } from "react";
import { Building } from "lucide-react";
import EmptyState from "./EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useMyProperties } from "@/hooks/useMyProperties";
import { HotelCard } from "@/components/HotelCard";
import AddProperty from "./AddProperty";

export const PropertiesContent = () => {
  const { user } = useAuth();
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);

  // Guard: No user (shouldn't happen but fallback)
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

  if (editingHotelId) {
    // Render AddProperty in edit mode for the selected hotel
    return (
      <div>
        <button
          className="mb-3 px-4 py-2 rounded bg-fuchsia-700 text-white"
          onClick={() => setEditingHotelId(null)}
        >
          Back to My Properties
        </button>
        <AddProperty editingHotelId={editingHotelId} onDoneEditing={() => setEditingHotelId(null)} />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-pulse h-80 bg-[#5c0869]" />
        ))}
      </div>
    );
  }

  // Empty state
  if (!hotels || hotels.length === 0) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  // Grid of hotels with Edit option
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="relative group">
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
          <button
            className="absolute top-2 right-2 z-10 bg-fuchsia-600/90 text-white rounded-full p-2 shadow hover:bg-fuchsia-700 transition-opacity opacity-90 group-hover:opacity-100"
            title="Edit this property"
            onClick={() => setEditingHotelId(hotel.id)}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.3 6.7 13.3 2.7a1 1 0 0 0-1.4 0L3 11.6V15h3.4l8.9-8.9a1 1 0 0 0 0-1.4Z"/>
              <path d="M15 8 12 5m-9 9v3h3"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default PropertiesContent;
