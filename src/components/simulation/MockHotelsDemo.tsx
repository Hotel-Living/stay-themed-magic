
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";

interface MockHotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  propertyStyle: string;
  availableMonths: string[];
  dayRanges: number[];
  mealPlans: string[];
  roomTypes: string[];
  theme: string;
}

const mockHotels: MockHotel[] = [
  {
    id: "1",
    name: "Barcelona Urban Hotel",
    location: "Barcelona, Spain",
    price: 1800,
    rating: 4.5,
    image: "/lovable-uploads/hotel1.jpg",
    propertyStyle: "Modern",
    availableMonths: ["01", "02", "03", "06", "07", "08"],
    dayRanges: [8, 16, 24, 32],
    mealPlans: ["breakfast-only", "half-board"],
    roomTypes: ["Double Room", "Single Room"],
    theme: "urban-exploration"
  },
  {
    id: "2", 
    name: "Valencia Beach Resort",
    location: "Valencia, Spain",
    price: 2200,
    rating: 4.8,
    image: "/lovable-uploads/hotel2.jpg",
    propertyStyle: "Luxury",
    availableMonths: ["04", "05", "06", "07", "08", "09"],
    dayRanges: [16, 24, 32],
    mealPlans: ["half-board", "full-board"],
    roomTypes: ["Double Room"],
    theme: "beach-sun"
  },
  {
    id: "3",
    name: "Madrid Business Center",
    location: "Madrid, Spain", 
    price: 1500,
    rating: 4.2,
    image: "/lovable-uploads/hotel3.jpg",
    propertyStyle: "Classic",
    availableMonths: ["01", "02", "03", "10", "11", "12"],
    dayRanges: [8, 16],
    mealPlans: ["breakfast-only", "no-meals"],
    roomTypes: ["Single Room", "Double Room"],
    theme: "business-networking"
  },
  {
    id: "4",
    name: "Seville Heritage Hotel",
    location: "Seville, Spain",
    price: 2800,
    rating: 4.7,
    image: "/lovable-uploads/hotel4.jpg",
    propertyStyle: "Historic",
    availableMonths: ["03", "04", "05", "09", "10", "11"],
    dayRanges: [16, 24, 32],
    mealPlans: ["full-board", "half-board"],
    roomTypes: ["Double Room"],
    theme: "cultural-heritage"
  },
  {
    id: "5",
    name: "Granada Art Boutique",
    location: "Granada, Spain",
    price: 1200,
    rating: 4.4,
    image: "/lovable-uploads/hotel5.jpg",
    propertyStyle: "Boutique",
    availableMonths: ["02", "03", "04", "05", "06", "07"],
    dayRanges: [8, 16, 24],
    mealPlans: ["breakfast-only"],
    roomTypes: ["Single Room", "Double Room"],
    theme: "art-creativity"
  },
  {
    id: "6",
    name: "Palma Wellness Resort",
    location: "Palma, Spain",
    price: 3200,
    rating: 4.9,
    image: "/lovable-uploads/hotel6.jpg",
    propertyStyle: "Luxury",
    availableMonths: ["01", "05", "06", "07", "08", "12"],
    dayRanges: [24, 32],
    mealPlans: ["full-board"],
    roomTypes: ["Double Room"],
    theme: "wellness-health"
  }
];

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  console.log("MockHotelsDemo - Active filters:", activeFilters);

  const filteredHotels = mockHotels.filter(hotel => {
    // Price filter
    if (activeFilters.priceRange && typeof activeFilters.priceRange === 'number') {
      if (activeFilters.priceRange === 999999) {
        // "More than $2,000" option
        if (hotel.price <= 2000) return false;
      } else {
        // Under X amount
        if (hotel.price > activeFilters.priceRange) return false;
      }
    }

    // Country filter
    if (activeFilters.country) {
      if (activeFilters.country === "ES" && !hotel.location.includes("Spain")) return false;
    }

    // Location filter (city)
    if (activeFilters.location) {
      if (!hotel.location.toLowerCase().includes(activeFilters.location.toLowerCase())) return false;
    }

    // Theme filter
    if (activeFilters.theme) {
      if (hotel.theme !== activeFilters.theme.id) return false;
    }

    // Month filter
    if (activeFilters.month) {
      if (!hotel.availableMonths.includes(activeFilters.month)) return false;
    }

    // Day range filter
    if (activeFilters.dayRange && typeof activeFilters.dayRange === 'number') {
      if (!hotel.dayRanges.includes(activeFilters.dayRange)) return false;
    }

    // Meal plan filter
    if (activeFilters.mealPlan) {
      if (!hotel.mealPlans.includes(activeFilters.mealPlan)) return false;
    }

    // Property style filter
    if (activeFilters.propertyStyle) {
      if (hotel.propertyStyle !== activeFilters.propertyStyle) return false;
    }

    // Room types filter
    if (activeFilters.roomTypes && activeFilters.roomTypes.length > 0) {
      const hasMatchingRoom = activeFilters.roomTypes.some(roomType => 
        hotel.roomTypes.includes(roomType)
      );
      if (!hasMatchingRoom) return false;
    }

    return true;
  });

  console.log("MockHotelsDemo - Filtered hotels:", filteredHotels.length, "out of", mockHotels.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Hotels Found: {filteredHotels.length}
        </h2>
        <div className="text-sm text-fuchsia-300">
          Showing {filteredHotels.length} of {mockHotels.length} hotels
        </div>
      </div>

      {filteredHotels.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            No hotels match your current filters
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Try adjusting your search criteria
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-fuchsia-400/20 hover:border-fuchsia-400/40 transition-all">
              <div className="h-48 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-white/60 text-sm">Hotel Image</div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{hotel.name}</h3>
                <p className="text-fuchsia-300 text-sm mb-2">{hotel.location}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="text-white font-bold text-xl">
                    €{hotel.price}/month
                  </div>
                  <div className="flex items-center text-yellow-400">
                    ⭐ {hotel.rating}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-fuchsia-600/30 text-fuchsia-200 px-2 py-1 rounded">
                      {hotel.propertyStyle}
                    </span>
                  </div>
                  
                  <div className="text-gray-300">
                    <div>Days: {hotel.dayRanges.join(", ")}</div>
                    <div>Meals: {hotel.mealPlans.join(", ")}</div>
                    <div>Rooms: {hotel.roomTypes.join(", ")}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
