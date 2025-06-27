
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";

interface MockHotelsProps {
  activeFilters: FilterState;
}

const mockHotels = [
  {
    id: "1",
    name: "Oceanview Resort",
    location: "Lisbon, Portugal",
    country: "Portugal",
    city: "Lisbon",
    price_per_month: 1200,
    thumbnail: "/lovable-uploads/hotel1.jpg",
    theme: "Beach Life",
    category: 4,
    property_type: "Hotel",
    property_style: "Coastal",
    activities: ["Surfing", "Beach Volleyball", "Sunset Yoga"],
    available_months: ["June", "July", "August", "September"],
    stay_lengths: [32, 24, 16, 8],
    meal_plans: ["breakfast", "half_board"],
    hotel_services: ["Spa", "Fitness Center", "Pool"],
    room_services: ["Room Service", "Mini Bar", "Wi-Fi"],
    room_types: ["Double Room", "Single Room"]
  },
  {
    id: "2",
    name: "Mountain Lodge",
    location: "Chamonix, France",
    country: "France",
    city: "Chamonix",
    price_per_month: 900,
    thumbnail: "/lovable-uploads/hotel2.jpg",
    theme: "Mountain Retreat",
    category: 3,
    property_type: "Lodge",
    property_style: "Alpine",
    activities: ["Hiking", "Skiing", "Mountain Biking"],
    available_months: ["January", "February", "March", "December"],
    stay_lengths: [32, 24, 16],
    meal_plans: ["breakfast", "full_board"],
    hotel_services: ["Spa", "Restaurant", "Ski Storage"],
    room_services: ["Heating", "Wi-Fi", "Mountain View"],
    room_types: ["Double Room"]
  },
  {
    id: "3",
    name: "Urban Boutique Hotel",
    location: "Barcelona, Spain",
    country: "Spain",
    city: "Barcelona",
    price_per_month: 1500,
    thumbnail: "/lovable-uploads/hotel3.jpg",
    theme: "City Explorer",
    category: 5,
    property_type: "Boutique Hotel",
    property_style: "Urban",
    activities: ["City Tours", "Art Galleries", "Nightlife"],
    available_months: ["April", "May", "June", "October"],
    stay_lengths: [24, 16, 8],
    meal_plans: ["breakfast", "all_inclusive"],
    hotel_services: ["Concierge", "Restaurant", "Rooftop Bar"],
    room_services: ["Room Service", "Air Conditioning", "City View"],
    room_types: ["Double Room", "Single Room"]
  },
  {
    id: "4",
    name: "Countryside Villa",
    location: "Tuscany, Italy",
    country: "Italy",
    city: "Tuscany",
    price_per_month: 800,
    thumbnail: "/lovable-uploads/hotel4.jpg",
    theme: "Rural Escape",
    category: 3,
    property_type: "Villa",
    property_style: "Rustic",
    activities: ["Wine Tasting", "Cooking Classes", "Nature Walks"],
    available_months: ["May", "June", "July", "September", "October"],
    stay_lengths: [32, 24],
    meal_plans: ["breakfast", "half_board", "full_board"],
    hotel_services: ["Pool", "Garden", "Wine Cellar"],
    room_services: ["Garden View", "Wi-Fi", "Kitchenette"],
    room_types: ["Double Room"]
  },
  {
    id: "5",
    name: "Beachfront Paradise",
    location: "Santorini, Greece",
    country: "Greece",
    city: "Santorini",
    price_per_month: 2200,
    thumbnail: "/lovable-uploads/hotel5.jpg",
    theme: "Beach Life",
    category: 5,
    property_type: "Resort",
    property_style: "Luxury",
    activities: ["Sailing", "Snorkeling", "Sunset Viewing"],
    available_months: ["June", "July", "August", "September"],
    stay_lengths: [32, 24, 16, 8],
    meal_plans: ["breakfast", "half_board", "all_inclusive"],
    hotel_services: ["Infinity Pool", "Spa", "Private Beach"],
    room_services: ["Sea View", "Balcony", "Room Service"],
    room_types: ["Double Room", "Single Room"]
  }
];

export function MockHotelsDemo({ activeFilters }: MockHotelsProps) {
  const filteredHotels = mockHotels.filter(hotel => {
    // Price filter - only apply if priceRange is set
    if (activeFilters.priceRange && typeof activeFilters.priceRange === 'number') {
      const price = hotel.price_per_month;
      
      // Define price ranges based on the selected value
      const priceRanges = {
        500: { min: 0, max: 500 },
        1000: { min: 501, max: 1000 },
        1500: { min: 1001, max: 1500 },
        2000: { min: 1501, max: 2000 },
        2500: { min: 2001, max: 2500 },
        3000: { min: 2501, max: 3000 }
      };
      
      const selectedRange = priceRanges[activeFilters.priceRange as keyof typeof priceRanges];
      if (selectedRange && (price < selectedRange.min || price > selectedRange.max)) {
        return false;
      }
    }

    // Country filter
    if (activeFilters.country && hotel.country !== activeFilters.country) {
      return false;
    }

    // Location filter
    if (activeFilters.location && hotel.city !== activeFilters.location) {
      return false;
    }

    // Theme filter
    if (activeFilters.theme && hotel.theme !== activeFilters.theme.name) {
      return false;
    }

    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hasAnyActivity = activeFilters.activities.some(activityId => 
        hotel.activities.some(hotelActivity => hotelActivity === activityId)
      );
      if (!hasAnyActivity) {
        return false;
      }
    }

    // Number of Days filter - FIXED
    if (activeFilters.dayRange && typeof activeFilters.dayRange === 'number') {
      if (!hotel.stay_lengths.includes(activeFilters.dayRange)) {
        return false;
      }
    }

    // Month filter
    if (activeFilters.month && !hotel.available_months.includes(activeFilters.month)) {
      return false;
    }

    // Meal Plan filter - FIXED
    if (activeFilters.mealPlan) {
      if (!hotel.meal_plans.includes(activeFilters.mealPlan)) {
        return false;
      }
    }

    // Stars filter
    if (activeFilters.stars && activeFilters.stars.length > 0) {
      const starRating = hotel.category.toString();
      if (!activeFilters.stars.includes(starRating)) {
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

    // Room Types filter - FIXED
    if (activeFilters.roomTypes && activeFilters.roomTypes.length > 0) {
      const hasAnyRoomType = activeFilters.roomTypes.some(roomType => 
        hotel.room_types.includes(roomType)
      );
      if (!hasAnyRoomType) {
        return false;
      }
    }

    // Hotel Services filter
    if (activeFilters.hotelServices && activeFilters.hotelServices.length > 0) {
      const hasAnyService = activeFilters.hotelServices.some(service => 
        hotel.hotel_services.includes(service)
      );
      if (!hasAnyService) {
        return false;
      }
    }

    // Room Services filter
    if (activeFilters.roomServices && activeFilters.roomServices.length > 0) {
      const hasAnyRoomService = activeFilters.roomServices.some(service => 
        hotel.room_services.includes(service)
      );
      if (!hasAnyRoomService) {
        return false;
      }
    }

    return true;
  });

  console.log('Active filters:', activeFilters);
  console.log('Filtered hotels count:', filteredHotels.length);
  
  return (
    <div className="space-y-6">
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-4">Hotels ({filteredHotels.length} results)</h2>
        <div className="text-sm text-fuchsia-300 mb-4">
          Showing {filteredHotels.length} of {mockHotels.length} hotels
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-purple-800/30 rounded-lg p-6 space-y-4">
            <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
              <img 
                src={hotel.thumbnail} 
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
              <p className="text-fuchsia-300">{hotel.location}</p>
              
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">{'★'.repeat(hotel.category)}</span>
                <span className="text-white text-sm">({hotel.category} stars)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">€{hotel.price_per_month}/month</span>
                <span className="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm">
                  {hotel.theme}
                </span>
              </div>
              
              <div className="text-sm text-fuchsia-200">
                <p><strong>Property:</strong> {hotel.property_type} • {hotel.property_style}</p>
                <p><strong>Activities:</strong> {hotel.activities.join(', ')}</p>
                <p><strong>Available:</strong> {hotel.available_months.join(', ')}</p>
                <p><strong>Stay lengths:</strong> {hotel.stay_lengths.join(', ')} days</p>
                <p><strong>Meal plans:</strong> {hotel.meal_plans.join(', ')}</p>
                <p><strong>Room types:</strong> {hotel.room_types.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-lg">No hotels match your current filters.</p>
          <p className="text-fuchsia-300 text-sm mt-2">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
