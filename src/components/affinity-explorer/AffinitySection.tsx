
import React from "react";
import { AffinityHotelCard } from "./AffinityHotelCard";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  price_per_month: number;
  main_image_url: string;
  property_style?: string;
  themes: Array<{ id: string; name: string; category?: string }>;
}

interface AffinityCategory {
  name: string;
  hotels: Hotel[];
  emoji: string;
}

interface AffinitySectionProps {
  category: AffinityCategory;
}

export const AffinitySection = ({ category }: AffinitySectionProps) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{category.emoji}</span>
        <h2 className="text-2xl font-bold text-white">{category.name}</h2>
        <span className="ml-3 text-sm text-fuchsia-300 bg-fuchsia-500/20 px-3 py-1 rounded-full">
          {category.hotels.length} hotel{category.hotels.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
          {category.hotels.map((hotel) => (
            <AffinityHotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
