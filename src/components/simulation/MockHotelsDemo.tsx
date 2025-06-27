
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { mockHotels } from "./MockFilterData";

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  console.log('MockHotelsDemo - activeFilters:', activeFilters);

  // Apply filters to mock hotels
  const filteredHotels = mockHotels.filter(hotel => {
    // Country filter
    if (activeFilters.country && activeFilters.country !== 'all') {
      if (hotel.country !== activeFilters.country) return false;
    }

    // Location filter (city)
    if (activeFilters.location && activeFilters.location !== 'all') {
      if (hotel.city !== activeFilters.location) return false;
    }

    // Theme filter
    if (activeFilters.theme) {
      if (hotel.theme !== activeFilters.theme.name) return false;
    }

    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hasMatchingActivity = activeFilters.activities.some(activityId => 
        hotel.activities.includes(activityId)
      );
      if (!hasMatchingActivity) return false;
    }

    // Meal plan filter
    if (activeFilters.mealPlan && activeFilters.mealPlan !== 'all') {
      if (hotel.mealPlan !== activeFilters.mealPlan) return false;
    }

    // Property type filter
    if (activeFilters.propertyType && activeFilters.propertyType !== 'all') {
      if (hotel.propertyType !== activeFilters.propertyType) return false;
    }

    // Property style filter
    if (activeFilters.propertyStyle && activeFilters.propertyStyle !== 'all') {
      if (hotel.propertyStyle !== activeFilters.propertyStyle) return false;
    }

    // Category filter (stars)
    if (activeFilters.stars && activeFilters.stars.length > 0) {
      if (!activeFilters.stars.includes(hotel.category)) return false;
    }

    // Price range filter
    if (activeFilters.priceRange) {
      if (activeFilters.priceRange === 1000 && hotel.pricePerMonth > 1000) return false;
      if (activeFilters.priceRange === 1500 && (hotel.pricePerMonth <= 1000 || hotel.pricePerMonth > 1500)) return false;
      if (activeFilters.priceRange === 2000 && (hotel.pricePerMonth <= 1500 || hotel.pricePerMonth > 2000)) return false;
      if (activeFilters.priceRange === 2500 && (hotel.pricePerMonth <= 2000 || hotel.pricePerMonth > 2500)) return false;
      if (activeFilters.priceRange === 3000 && hotel.pricePerMonth <= 2500) return false;
    }

    // Month filter
    if (activeFilters.month && activeFilters.month !== 'all') {
      if (!hotel.availableMonths.includes(activeFilters.month)) return false;
    }

    // Day range filter
    if (activeFilters.dayRange) {
      if (hotel.dayRange !== activeFilters.dayRange) return false;
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
      const hasMatchingRoomService = activeFilters.roomServices.some(service => 
        hotel.roomServices.includes(service)
      );
      if (!hasMatchingRoomService) return false;
    }

    return true;
  });

  console.log(`MockHotelsDemo - Filtered ${filteredHotels.length} hotels out of ${mockHotels.length}`);

  if (filteredHotels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white text-xl mb-4">No hotels found matching your criteria</div>
        <div className="text-gray-300">Try adjusting your filters to see more results</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results counter */}
      <div className="text-white text-lg font-semibold">
        {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
      </div>

      {/* Hotels grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:border-white/40 transition-all duration-300">
            {/* Hotel image */}
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
              <img 
                src={hotel.mainImageUrl} 
                alt={hotel.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden text-white text-center">
                <div className="text-2xl mb-2">🏨</div>
                <div className="text-sm">{hotel.name}</div>
              </div>
            </div>

            {/* Hotel info */}
            <div className="space-y-2">
              <h3 className="text-white font-bold text-lg">{hotel.name}</h3>
              <p className="text-gray-300 text-sm">{hotel.city}, {hotel.country}</p>
              
              {/* Theme badge */}
              <div className="flex flex-wrap gap-1">
                <span className="bg-fuchsia-600 text-white text-xs px-2 py-1 rounded">
                  {hotel.theme}
                </span>
              </div>

              {/* Price */}
              <div className="text-white font-semibold">
                €{hotel.pricePerMonth.toLocaleString()}/month
              </div>

              {/* Category stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: hotel.category }).map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
                <span className="text-gray-300 text-sm ml-2">({hotel.category} star{hotel.category !== 1 ? 's' : ''})</span>
              </div>

              {/* Additional info */}
              <div className="text-gray-300 text-sm space-y-1">
                <div>Stay: {hotel.dayRange} days</div>
                <div>Meals: {hotel.mealPlan}</div>
                <div>Type: {hotel.propertyType}</div>
                <div>Style: {hotel.propertyStyle}</div>
              </div>

              {/* Available months */}
              <div className="text-gray-300 text-xs">
                Available: {hotel.availableMonths.slice(0, 3).join(', ')}
                {hotel.availableMonths.length > 3 && ` +${hotel.availableMonths.length - 3} more`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
