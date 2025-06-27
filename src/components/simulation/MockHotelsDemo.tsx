
import React from "react";
import { HotelCard } from "@/components/HotelCard";

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
    thumbnail: "/placeholder.svg"
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
    thumbnail: "/placeholder.svg"
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
    thumbnail: "/placeholder.svg"
  }
];

export const MockHotelsDemo: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Hotel Simulation Demo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHotels.map((hotel) => (
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
    </div>
  );
};
