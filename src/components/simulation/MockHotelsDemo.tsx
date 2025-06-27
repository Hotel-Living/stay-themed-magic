
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { HotelCard } from "@/components/HotelCard/HotelCard";

interface MockHotelsProps {
  activeFilters: FilterState;
}

// Mock hotel data with complete information
const mockHotels = [
  {
    id: "1",
    name: "Urban Luxury Hotel Barcelona",
    location: "Barcelona, Spain",
    city: "Barcelona",
    country: "Spain",
    price_per_month: 1200,
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    theme: "Art",
    category: 5,
    available_months: ["January", "February", "March", "April", "May"],
    activities: ["Art", "Culture", "Museums"],
    property_type: "Hotel",
    property_style: "Urban",
    atmosphere: "Sophisticated",
    meal_plans: ["Breakfast only", "Half board"],
    stay_lengths: [7, 14, 30],
    hotel_themes: [{ themes: { name: "Art" } }],
    hotel_activities: [
      { activities: { name: "Art" } },
      { activities: { name: "Culture" } },
      { activities: { name: "Museums" } }
    ]
  },
  {
    id: "2", 
    name: "Coastal Retreat Lisbon",
    location: "Lisbon, Portugal",
    city: "Lisbon",
    country: "Portugal",
    price_per_month: 800,
    thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    theme: "Wellness",
    category: 4,
    available_months: ["June", "July", "August", "September"],
    activities: ["Yoga", "Swimming", "Wellness"],
    property_type: "Boutique Hotel",
    property_style: "Coastal",
    atmosphere: "Relaxing",
    meal_plans: ["Full board", "All inclusive"],
    stay_lengths: [14, 21, 30],
    hotel_themes: [{ themes: { name: "Wellness" } }],
    hotel_activities: [
      { activities: { name: "Yoga" } },
      { activities: { name: "Swimming" } },
      { activities: { name: "Wellness" } }
    ]
  },
  {
    id: "3",
    name: "Mountain Lodge Switzerland", 
    location: "Zermatt, Switzerland",
    city: "Zermatt",
    country: "Switzerland",
    price_per_month: 2200,
    thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
    theme: "Adventure",
    category: 5,
    available_months: ["October", "November", "December", "January"],
    activities: ["Hiking", "Skiing", "Mountain Sports"],
    property_type: "Lodge",
    property_style: "Mountain",
    atmosphere: "Adventurous",
    meal_plans: ["Breakfast only", "Half board", "Full board"],
    stay_lengths: [7, 14, 21],
    hotel_themes: [{ themes: { name: "Adventure" } }],
    hotel_activities: [
      { activities: { name: "Hiking" } },
      { activities: { name: "Skiing" } },
      { activities: { name: "Mountain Sports" } }
    ]
  }
];

export function MockHotelsDemo({ activeFilters }: MockHotelsProps) {
  // Apply filters to mock hotels
  const filteredHotels = mockHotels.filter(hotel => {
    // Price range filter
    if (activeFilters.priceRange) {
      if (hotel.price_per_month > activeFilters.priceRange) {
        return false;
      }
    }

    // Country filter
    if (activeFilters.country && hotel.country !== activeFilters.country) {
      return false;
    }

    // Location/City filter
    if (activeFilters.location && hotel.city !== activeFilters.location) {
      return false;
    }

    // Theme filter - fix TypeScript error by comparing theme names
    if (activeFilters.theme && typeof activeFilters.theme === 'object') {
      if (hotel.theme !== activeFilters.theme.name) {
        return false;
      }
    }

    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hasMatchingActivity = activeFilters.activities.some(filterActivity => 
        hotel.activities.some(hotelActivity => hotelActivity === filterActivity)
      );
      if (!hasMatchingActivity) {
        return false;
      }
    }

    // Month filter
    if (activeFilters.month) {
      if (!hotel.available_months.includes(activeFilters.month)) {
        return false;
      }
    }

    // Day range filter (stay lengths)
    if (activeFilters.dayRange) {
      if (!hotel.stay_lengths.includes(activeFilters.dayRange)) {
        return false;
      }
    }

    // Stars/Category filter
    if (activeFilters.stars && activeFilters.stars.length > 0) {
      const categoryMatch = activeFilters.stars.some(star => 
        parseInt(star) === hotel.category
      );
      if (!categoryMatch) {
        return false;
      }
    }

    // Property Type filter
    if (activeFilters.propertyType && hotel.property_type !== activeFilters.propertyType) {
      return false;
    }

    // Property Style filter
    if (activeFilters.propertyStyle && hotel.property_style !== activeFilters.propertyStyle) {
      return false;
    }

    // Meal Plan filter
    if (activeFilters.mealPlan) {
      if (!hotel.meal_plans.includes(activeFilters.mealPlan)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Hotel Simulation Demo ({filteredHotels.length} results)
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onHotelClick={() => {}}
            variant="default"
          />
        ))}
      </div>
      
      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-lg">
            No hotels match your current filters. Try adjusting your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
