
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { mockHotels } from "./MockFilterData";

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  // Apply filters to mock hotels
  const filteredHotels = mockHotels.filter(hotel => {
    // Country filter
    if (activeFilters.countries && activeFilters.countries.length > 0) {
      if (!activeFilters.countries.includes(hotel.country)) return false;
    }

    // City filter
    if (activeFilters.cities && activeFilters.cities.length > 0) {
      if (!activeFilters.cities.includes(hotel.city)) return false;
    }

    // Theme filter
    if (activeFilters.theme) {
      const hotelThemeIds = hotel.themes.map(t => t.id);
      if (!hotelThemeIds.includes(activeFilters.theme.id)) return false;
    }

    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hotelActivityIds = hotel.activities.map(a => a.id);
      const hasMatchingActivity = activeFilters.activities.some(activityId => 
        hotelActivityIds.includes(activityId)
      );
      if (!hasMatchingActivity) return false;
    }

    // Meal plan filter
    if (activeFilters.mealPlan) {
      if (!hotel.mealPlans.includes(activeFilters.mealPlan)) return false;
    }

    // Property type filter
    if (activeFilters.propertyTypes && activeFilters.propertyTypes.length > 0) {
      if (!activeFilters.propertyTypes.includes(hotel.propertyType)) return false;
    }

    // Property style filter
    if (activeFilters.propertyStyles && activeFilters.propertyStyles.length > 0) {
      if (!activeFilters.propertyStyles.includes(hotel.propertyStyle)) return false;
    }

    // Category filter (stars)
    if (activeFilters.categories && activeFilters.categories.length > 0) {
      if (!activeFilters.categories.includes(hotel.category.toString())) return false;
    }

    // Price filter
    if (activeFilters.priceRange) {
      const price = hotel.pricePerMonth;
      switch (activeFilters.priceRange) {
        case "0-500":
          if (price > 500) return false;
          break;
        case "500-1000":
          if (price < 500 || price > 1000) return false;
          break;
        case "1000-1500":
          if (price < 1000 || price > 1500) return false;
          break;
        case "1500-2000":
          if (price < 1500 || price > 2000) return false;
          break;
        case "2000+":
          if (price < 2000) return false;
          break;
      }
    }

    // Month filter
    if (activeFilters.months && activeFilters.months.length > 0) {
      const hasMatchingMonth = activeFilters.months.some(month => 
        hotel.availableMonths.includes(month)
      );
      if (!hasMatchingMonth) return false;
    }

    // Days filter
    if (activeFilters.lengthOfStay && activeFilters.lengthOfStay.length > 0) {
      const hasMatchingDays = activeFilters.lengthOfStay.some(days => 
        hotel.availableDays.includes(parseInt(days))
      );
      if (!hasMatchingDays) return false;
    }

    // Room types filter
    if (activeFilters.roomTypes && activeFilters.roomTypes.length > 0) {
      const hasMatchingRoomType = activeFilters.roomTypes.some(roomType => 
        hotel.roomTypes.includes(roomType)
      );
      if (!hasMatchingRoomType) return false;
    }

    // Hotel services filter
    if (activeFilters.hotelServices && activeFilters.hotelServices.length > 0) {
      const hasMatchingService = activeFilters.hotelServices.some(service => 
        hotel.hotelServices.includes(service)
      );
      if (!hasMatchingService) return false;
    }

    // Room services filter
    if (activeFilters.roomServices && activeFilters.roomServices.length > 0) {
      const hasMatchingService = activeFilters.roomServices.some(service => 
        hotel.roomServices.includes(service)
      );
      if (!hasMatchingService) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Hotels ({filteredHotels.length})
        </h2>
      </div>

      {filteredHotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/80 text-lg">No hotels match your current filters.</p>
          <p className="text-white/60 text-sm mt-2">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/30 backdrop-blur-sm border border-fuchsia-800/30 rounded-xl p-6 hover:border-fuchsia-600/50 transition-all duration-300"
            >
              <div className="relative mb-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-white/70 backdrop-blur-sm text-purple-900 px-2 py-1 rounded text-xs font-medium">
                    {hotel.themes[0]?.name}
                  </span>
                </div>
                <div className="absolute top-2 right-2 flex">
                  {Array.from({ length: hotel.category }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">⭐</span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                <p className="text-fuchsia-300 text-sm">{hotel.city}, {hotel.country}</p>
                
                <div className="flex justify-between items-center">
                  <div className="text-white">
                    <span className="text-2xl font-bold">€{hotel.pricePerMonth}</span>
                    <span className="text-sm text-white/60">/month</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-white/70">
                  <div>
                    <strong>Property:</strong> {hotel.propertyType} • {hotel.propertyStyle}
                  </div>
                  <div>
                    <strong>Meal Plan:</strong> {hotel.mealPlans.join(", ")}
                  </div>
                  <div>
                    <strong>Available:</strong> {hotel.availableMonths.slice(0, 3).join(", ")}
                    {hotel.availableMonths.length > 3 && ` +${hotel.availableMonths.length - 3} more`}
                  </div>
                  <div>
                    <strong>Room Types:</strong> {hotel.roomTypes.join(", ")}
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
