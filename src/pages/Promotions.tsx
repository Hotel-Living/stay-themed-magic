
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelCard } from "@/components/HotelCard";

export default function Promotions() {
  // Sample hotel data for placeholders
  const sampleHotels = [
    {
      id: "1",
      name: "Mountain Retreat",
      city: "Denver",
      country: "USA",
      stars: 4,
      pricePerMonth: 1500,
      image: "/placeholder.svg",
      themes: [{ id: "1", name: "Nature" }]
    },
    {
      id: "2",
      name: "Urban Oasis",
      city: "New York",
      country: "USA",
      stars: 5,
      pricePerMonth: 2200,
      image: "/placeholder.svg",
      themes: [{ id: "2", name: "City" }]
    },
    {
      id: "3",
      name: "Beach Paradise",
      city: "Miami",
      country: "USA",
      stars: 4,
      pricePerMonth: 1800,
      image: "/placeholder.svg",
      themes: [{ id: "3", name: "Beach" }]
    },
    {
      id: "4",
      name: "Desert Sanctuary",
      city: "Phoenix",
      country: "USA",
      stars: 3,
      pricePerMonth: 1400,
      image: "/placeholder.svg",
      themes: [{ id: "4", name: "Desert" }]
    },
    {
      id: "5",
      name: "Lakeside Lodging",
      city: "Chicago",
      country: "USA",
      stars: 4,
      pricePerMonth: 1700,
      image: "/placeholder.svg",
      themes: [{ id: "5", name: "Lake" }]
    },
    {
      id: "6",
      name: "Forest Hideaway",
      city: "Portland",
      country: "USA",
      stars: 4,
      pricePerMonth: 1600,
      image: "/placeholder.svg",
      themes: [{ id: "6", name: "Forest" }]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Featured</h1>
          
          <div className="glass-card rounded-2xl p-6 bg-[#7a0486]/80 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-fuchsia-100">Featured Hotels</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleHotels.map(hotel => (
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
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
