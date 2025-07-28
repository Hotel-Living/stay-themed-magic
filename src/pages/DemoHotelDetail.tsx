import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelDetailContentEnhanced } from "@/components/hotel-detail/HotelDetailContentEnhanced";
import BubbleCounter from "@/components/common/BubbleCounter";

// Fictional hotel data for demo purposes
const demoHotel = {
  id: "demo-hotel-001",
  name: "The Aurora Palace",
  city: "Barcelona",
  country: "Spain",
  address: "Passeig de Gràcia, 92",
  main_image_url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800",
  description: "Experience luxury at its finest in the heart of Barcelona. The Aurora Palace combines contemporary elegance with traditional Catalan charm, offering an unparalleled hospitality experience in one of Europe's most vibrant cities.",
  ideal_guests: "Perfect for digital nomads, business travelers, and culture enthusiasts seeking a sophisticated urban retreat with world-class amenities.",
  atmosphere: "Sophisticated yet welcoming, with an emphasis on artistic expression and cultural immersion. The ambiance balances modern luxury with authentic local character.",
  perfect_location: "Ideal for exploring Gaudí's masterpieces, high-end shopping, and Barcelona's renowned culinary scene. Walking distance to Casa Batlló, La Pedrera, and the Gothic Quarter.",
  price_per_month: 4200,
  category: 5,
  average_rating: 4.8,
  available_months: ["January", "February", "March", "April", "May", "September", "October", "November", "December"],
  hotel_images: [
    { 
      id: "img-1", 
      hotel_id: "demo-hotel-001",
      image_url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800", 
      is_main: true,
      created_at: "2024-01-01"
    },
    { 
      id: "img-2", 
      hotel_id: "demo-hotel-001",
      image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800", 
      is_main: false,
      created_at: "2024-01-01"
    },
    { 
      id: "img-3", 
      hotel_id: "demo-hotel-001",
      image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800", 
      is_main: false,
      created_at: "2024-01-01"
    },
    { 
      id: "img-4", 
      hotel_id: "demo-hotel-001",
      image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800", 
      is_main: false,
      created_at: "2024-01-01"
    }
  ],
  hotel_themes: [
    { 
      theme_id: "luxury",
      themes: { id: "luxury", name: "Luxury Living", level: 1 }
    },
    { 
      theme_id: "business",
      themes: { id: "business", name: "Business Traveler", level: 1 }
    },
    { 
      theme_id: "culture",
      themes: { id: "culture", name: "Cultural Explorer", level: 1 }
    }
  ],
  hotelFeatures: [
    "24/7 Concierge Service",
    "Rooftop Infinity Pool", 
    "Michelin-Star Restaurant",
    "Spa & Wellness Center",
    "Business Center",
    "Valet Parking",
    "Pet-Friendly",
    "Electric Vehicle Charging"
  ],
  roomFeatures: [
    "High-Speed WiFi",
    "Smart TV with Streaming",
    "Marble Bathroom",
    "Nespresso Machine",
    "Designer Furniture",
    "Climate Control",
    "Blackout Curtains",
    "Premium Bedding"
  ],
  banking_info: {
    bank_name: "Banco de España",
    iban_account: "ES91 2100 0418 4502 0005 1332",
    swift_bic: "CAIXESBBXXX",
    bank_country: "Spain",
    account_holder: "The Aurora Palace S.L."
  },
  laundry_service: {
    available: true,
    same_day_service: true,
    dry_cleaning: true,
    pricing: "Competitive rates"
  },
  additional_amenities: [
    "Art Gallery",
    "Library Lounge", 
    "Wine Cellar",
    "Private Cinema",
    "Yoga Studio"
  ],
  special_features: [
    "Curated Local Art Collection",
    "Personal Shopping Service",
    "Cultural Experience Packages", 
    "Sustainable Practices"
  ],
  accessibility_features: [
    "Wheelchair Accessible",
    "Elevator Access",
    "Accessible Bathrooms",
    "Braille Signage"
  ],
  check_in_instructions: "Check-in available 24/7. Express check-in via mobile app. Concierge available for luggage assistance.",
  local_recommendations: "Park Güell (15 min taxi), La Boquería Market (10 min walk), Picasso Museum (12 min walk), Beach Club access (20 min metro)",
  house_rules: [
    "No smoking in rooms",
    "Quiet hours: 10 PM - 7 AM",
    "Maximum 2 guests per room",
    "ID required at check-in"
  ],
  cancellation_policy: "Free cancellation up to 48 hours before check-in. Full refund for cancellations within policy period."
};

export default function DemoHotelDetail() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BubbleCounter />
      
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-center py-3">
        <div className="container mx-auto px-4">
          <span className="font-semibold">✨ Demo Page</span>
          <span className="mx-2">•</span>
          <span>Showcasing Enhanced Hotel Detail Experience</span>
        </div>
      </div>
      
      <main className="flex-1">
        <HotelDetailContentEnhanced hotel={demoHotel} isLoading={false} />
      </main>
      
      <Footer />
    </div>
  );
}