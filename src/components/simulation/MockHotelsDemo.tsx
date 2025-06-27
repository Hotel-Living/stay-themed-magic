
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { mockHotels } from "./MockFilterData";

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  // Filter hotels based on active filters
  const filteredHotels = mockHotels.filter(hotel => {
    // Country filter
    if (activeFilters.country && activeFilters.country !== hotel.country) {
      return false;
    }

    // Location/City filter
    if (activeFilters.location && activeFilters.location !== hotel.city) {
      return false;
    }

    // Theme filter
    if (activeFilters.theme) {
      const hotelThemes = hotel.theme ? [hotel.theme] : [];
      const hasMatchingTheme = hotelThemes.some(theme => 
        typeof theme === 'string' ? theme === activeFilters.theme?.name : theme.name === activeFilters.theme?.name
      );
      if (!hasMatchingTheme) {
        return false;
      }
    }

    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hotelActivities = hotel.activities || [];
      const hasMatchingActivity = activeFilters.activities.some(activityId =>
        hotelActivities.includes(activityId)
      );
      if (!hasMatchingActivity) {
        return false;
      }
    }

    // Meal plan filter
    if (activeFilters.mealPlan && activeFilters.mealPlan !== hotel.mealPlan) {
      return false;
    }

    // Property type filter
    if (activeFilters.propertyType && activeFilters.propertyType !== hotel.propertyType) {
      return false;
    }

    // Property style filter
    if (activeFilters.propertyStyle && activeFilters.propertyStyle !== hotel.propertyStyle) {
      return false;
    }

    // Category/Stars filter
    if (activeFilters.stars && activeFilters.stars.length > 0) {
      const categoryMatch = activeFilters.stars.some(star => {
        if (star === '5-star' && hotel.category === 5) return true;
        if (star === '4-star' && hotel.category === 4) return true;
        if (star === '3-star' && hotel.category === 3) return true;
        if (star === 'luxury' && hotel.category >= 4) return true;
        if (star === 'budget' && hotel.category <= 3) return true;
        return false;
      });
      if (!categoryMatch) {
        return false;
      }
    }

    // Price range filter
    if (activeFilters.priceRange) {
      const price = hotel.pricePerMonth;
      if (activeFilters.priceRange === 1000 && price > 1000) return false;
      if (activeFilters.priceRange === 1500 && (price <= 1000 || price > 1500)) return false;
      if (activeFilters.priceRange === 2000 && (price <= 1500 || price > 2000)) return false;
      if (activeFilters.priceRange === 3000 && price <= 2000) return false;
    }

    // Month filter
    if (activeFilters.month) {
      const availableMonths = hotel.availableMonths || [];
      if (!availableMonths.includes(activeFilters.month)) {
        return false;
      }
    }

    // Day range filter
    if (activeFilters.dayRange) {
      const hotelDayRange = hotel.dayRange;
      if (hotelDayRange !== activeFilters.dayRange) {
        return false;
      }
    }

    // Room types filter
    if (activeFilters.roomTypes && activeFilters.roomTypes.length > 0) {
      const hotelRoomTypes = hotel.roomTypes || [];
      const hasMatchingRoomType = activeFilters.roomTypes.some(roomType =>
        hotelRoomTypes.includes(roomType)
      );
      if (!hasMatchingRoomType) {
        return false;
      }
    }

    // Hotel services filter
    if (activeFilters.hotelServices && activeFilters.hotelServices.length > 0) {
      const hotelServices = hotel.hotelServices || [];
      const hasMatchingService = activeFilters.hotelServices.some(service =>
        hotelServices.includes(service)
      );
      if (!hasMatchingService) {
        return false;
      }
    }

    // Room services filter
    if (activeFilters.roomServices && activeFilters.roomServices.length > 0) {
      const roomServices = hotel.roomServices || [];
      const hasMatchingService = activeFilters.roomServices.some(service =>
        roomServices.includes(service)
      );
      if (!hasMatchingService) {
        return false;
      }
    }

    return true;
  });

  const getStarDisplay = (category: number) => {
    return '★'.repeat(Math.max(1, Math.min(5, category)));
  };

  if (filteredHotels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-fuchsia-300 text-xl mb-4">No hotels found</div>
        <div className="text-white/70">Try adjusting your filters to see more results</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-white text-lg font-bold">
        {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-fuchsia-400/20 hover:border-fuchsia-400/50 transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center">
              <img 
                src={hotel.mainImageUrl || "/lovable-uploads/hotel-placeholder.jpg"} 
                alt={hotel.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/lovable-uploads/hotel-placeholder.jpg";
                }}
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-bold text-lg">{hotel.name}</h3>
                <div className="text-fuchsia-300 text-sm">
                  {getStarDisplay(hotel.category)}
                </div>
              </div>
              
              <div className="text-fuchsia-200 text-sm mb-2">
                {hotel.city}, {hotel.country}
              </div>
              
              <div className="text-white/80 text-sm mb-3 line-clamp-2">
                {hotel.description || "Experience luxury accommodation in this beautiful location."}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {hotel.theme && (
                  <span className="bg-fuchsia-600/30 text-fuchsia-200 px-2 py-1 rounded-full text-xs">
                    {typeof hotel.theme === 'string' ? hotel.theme : hotel.theme.name}
                  </span>
                )}
                <span className="bg-purple-600/30 text-purple-200 px-2 py-1 rounded-full text-xs">
                  {hotel.propertyType}
                </span>
                <span className="bg-blue-600/30 text-blue-200 px-2 py-1 rounded-full text-xs">
                  {hotel.propertyStyle}
                </span>
              </div>

              <div className="text-white/70 text-xs mb-3">
                <div>Meal Plan: {hotel.mealPlan}</div>
                <div>Stay Length: {hotel.dayRange} days</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                  ${hotel.pricePerMonth.toLocaleString()}/month
                </div>
                <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
