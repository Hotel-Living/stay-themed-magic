
import React from "react";
import { HotelCard } from "@/components/HotelCard";
import { FilterState } from "@/components/filters/FilterTypes";

// Mock hotel data for simulation
const mockHotels = [
  {
    id: "1",
    name: "Hotel Serenity Beach",
    city: "Barcelona",
    country: "Spain",
    stars: 4,
    pricePerMonth: 1200,
    themes: [
      { id: "wellness", name: "Wellness" },
      { id: "beach", name: "Beach" }
    ],
    image: "/placeholder.svg",
    availableMonths: ["January", "February", "March"],
    rates: { "8": 400, "16": 750, "24": 1050, "32": 1200 },
    hotel_themes: [
      { themes: { name: "Wellness" } },
      { themes: { name: "Beach" } }
    ],
    hotel_activities: [
      { activities: { name: "Yoga" } },
      { activities: { name: "Swimming" } }
    ],
    meal_plans: ["Breakfast included", "Half board"],
    location: "Barcelona, Spain",
    thumbnail: "/placeholder.svg",
    property_type: "Hotel",
    style: "Modern",
    atmosphere: "Relaxing"
  },
  {
    id: "2", 
    name: "Mountain View Lodge",
    city: "Interlaken",
    country: "Switzerland",
    stars: 5,
    pricePerMonth: 1800,
    themes: [
      { id: "adventure", name: "Adventure" },
      { id: "nature", name: "Nature" }
    ],
    image: "/placeholder.svg",
    availableMonths: ["June", "July", "August"],
    rates: { "8": 600, "16": 1100, "24": 1500, "32": 1800 },
    hotel_themes: [
      { themes: { name: "Adventure" } },
      { themes: { name: "Nature" } }
    ],
    hotel_activities: [
      { activities: { name: "Hiking" } },
      { activities: { name: "Skiing" } }
    ],
    meal_plans: ["Full board", "All inclusive"],
    location: "Interlaken, Switzerland",
    thumbnail: "/placeholder.svg",
    property_type: "Lodge",
    style: "Rustic",
    atmosphere: "Adventurous"
  },
  {
    id: "3",
    name: "City Business Hub",
    city: "Frankfurt",
    country: "Germany", 
    stars: 3,
    pricePerMonth: 900,
    themes: [
      { id: "business", name: "Business" },
      { id: "urban", name: "Urban" }
    ],
    image: "/placeholder.svg",
    availableMonths: ["September", "October", "November"],
    rates: { "8": 300, "16": 550, "24": 750, "32": 900 },
    hotel_themes: [
      { themes: { name: "Business" } },
      { themes: { name: "Urban" } }
    ],
    hotel_activities: [
      { activities: { name: "Conference facilities" } },
      { activities: { name: "Gym" } }
    ],
    meal_plans: ["Breakfast included"],
    location: "Frankfurt, Germany",
    thumbnail: "/placeholder.svg",
    property_type: "Hotel",
    style: "Contemporary",
    atmosphere: "Professional"
  }
];

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export const MockHotelsDemo: React.FC<MockHotelsDemoProps> = ({ activeFilters }) => {
  const filteredHotels = React.useMemo(() => {
    return mockHotels.filter(hotel => {
      // Price filter
      if (activeFilters.priceRange) {
        if (activeFilters.priceRange === 1000 && hotel.pricePerMonth > 1000) return false;
        if (activeFilters.priceRange === 1500 && (hotel.pricePerMonth < 1000 || hotel.pricePerMonth > 1500)) return false;
        if (activeFilters.priceRange === 2000 && (hotel.pricePerMonth < 1500 || hotel.pricePerMonth > 2000)) return false;
        if (activeFilters.priceRange === 999999 && hotel.pricePerMonth < 2000) return false;
      }

      // Country filter
      if (activeFilters.country && hotel.country !== activeFilters.country) return false;

      // Location filter
      if (activeFilters.location && !hotel.location.toLowerCase().includes(activeFilters.location.toLowerCase())) return false;

      // Theme filter
      if (activeFilters.theme && !hotel.hotel_themes.some(ht => ht.themes?.name === activeFilters.theme)) return false;

      // Activities filter
      if (activeFilters.activities && activeFilters.activities.length > 0) {
        const hasActivity = activeFilters.activities.some(activity => 
          hotel.hotel_activities.some(ha => ha.activities?.name === activity)
        );
        if (!hasActivity) return false;
      }

      // Month filter
      if (activeFilters.month && !hotel.availableMonths.includes(activeFilters.month)) return false;

      // Stars filter
      if (activeFilters.stars && activeFilters.stars.length > 0) {
        if (!activeFilters.stars.includes(hotel.stars.toString())) return false;
      }

      // Property type filter
      if (activeFilters.propertyType && hotel.property_type !== activeFilters.propertyType) return false;

      // Property style filter
      if (activeFilters.propertyStyle && hotel.style !== activeFilters.propertyStyle) return false;

      // Meal plan filter
      if (activeFilters.mealPlan && !hotel.meal_plans.includes(activeFilters.mealPlan)) return false;

      return true;
    });
  }, [activeFilters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Hotel Simulation Demo ({filteredHotels.length} hotels found)
      </h2>
      {filteredHotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white text-lg mb-4">No hotels match your current filters</p>
          <p className="text-fuchsia-300">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              city={hotel.city}
              country={hotel.country}
              stars={hotel.stars}
              pricePerMonth={hotel.pricePerMonth}
              themes={hotel.themes}
              image={hotel.image}
              availableMonths={hotel.availableMonths}
              rates={hotel.rates}
              hotel_themes={hotel.hotel_themes}
              hotel_activities={hotel.hotel_activities}
              meal_plans={hotel.meal_plans}
              location={hotel.location}
              thumbnail={hotel.thumbnail}
              onClick={() => console.log(`Clicked hotel ${hotel.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
