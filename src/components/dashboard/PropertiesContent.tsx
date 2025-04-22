
import React from "react";
import { Building } from "lucide-react";
import EmptyState from "./EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useMyProperties } from "@/hooks/useMyProperties";
import { HotelCard } from "@/components/HotelCard";

export const PropertiesContent = () => {
  const { user } = useAuth();

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

  // Grid of hotels
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
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
      ))}
    </div>
  );
};

export default PropertiesContent;
