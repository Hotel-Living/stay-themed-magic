
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { mockHotels } from "@/components/simulation/MockFilterData";

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  // Filter hotels based on active filters
  const filteredHotels = mockHotels.filter(hotel => {
    // Country filter
    if (activeFilters.country && activeFilters.country !== 'all') {
      if (hotel.country !== activeFilters.country) return false;
    }

    // Location filter
    if (activeFilters.location && activeFilters.location !== 'all') {
      if (hotel.city !== activeFilters.location) return false;
    }

    // Theme filter
    if (activeFilters.theme) {
      if (hotel.theme !== activeFilters.theme.name) return false;
    }

    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hasMatchingActivity = activeFilters.activities.some(activity => 
        hotel.activities?.includes(activity)
      );
      if (!hasMatchingActivity) return false;
    }

    // Property type filter
    if (activeFilters.propertyType && activeFilters.propertyType !== 'all') {
      if (hotel.propertyType !== activeFilters.propertyType) return false;
    }

    // Property style filter
    if (activeFilters.propertyStyle && activeFilters.propertyStyle !== 'all') {
      if (hotel.propertyStyle !== activeFilters.propertyStyle) return false;
    }

    // Stars filter (category)
    if (activeFilters.stars && activeFilters.stars.length > 0) {
      const hasMatchingCategory = activeFilters.stars.some(star => 
        hotel.category.toString() === star
      );
      if (!hasMatchingCategory) return false;
    }

    // Price range filter
    if (activeFilters.priceRange) {
      if (hotel.pricePerMonth > activeFilters.priceRange) return false;
    }

    // Month filter
    if (activeFilters.month && activeFilters.month !== 'all') {
      if (!hotel.availableMonths.includes(activeFilters.month)) return false;
    }

    // Day range filter
    if (activeFilters.dayRange) {
      if (hotel.dayRange !== activeFilters.dayRange) return false;
    }

    // Meal plan filter
    if (activeFilters.mealPlan && activeFilters.mealPlan !== 'all') {
      if (hotel.mealPlan !== activeFilters.mealPlan) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Hotel Simulation Demo</h2>
        <p className="text-gray-300">
          Found {filteredHotels.length} hotels matching your filters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-fuchsia-900/20 rounded-lg p-4 border border-fuchsia-500/30">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
              <img 
                src={hotel.mainImageUrl} 
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{hotel.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="text-fuchsia-300">Location:</span> {hotel.city}, {hotel.country}</p>
              <p><span className="text-fuchsia-300">Price:</span> ${hotel.pricePerMonth}/month</p>
              <p><span className="text-fuchsia-300">Category:</span> {hotel.category} stars</p>
              <p><span className="text-fuchsia-300">Type:</span> {hotel.propertyType}</p>
              <p><span className="text-fuchsia-300">Style:</span> {hotel.propertyStyle}</p>
              <p><span className="text-fuchsia-300">Theme:</span> {hotel.theme}</p>
              <p><span className="text-fuchsia-300">Meal Plan:</span> {hotel.mealPlan}</p>
              
              {hotel.activities && hotel.activities.length > 0 && (
                <div>
                  <span className="text-fuchsia-300">Activities:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hotel.activities.map((activity, index) => (
                      <span key={index} className="bg-fuchsia-800/50 text-xs px-2 py-1 rounded">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <span className="text-fuchsia-300">Available Months:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {hotel.availableMonths.map((month, index) => (
                    <span key={index} className="bg-blue-800/50 text-xs px-2 py-1 rounded">
                      {month}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No hotels match your current filters.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
