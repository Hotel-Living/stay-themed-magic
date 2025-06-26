
import React from "react";
import { useNavigate } from "react-router-dom";
import { HotelCard } from "@/components/HotelCard";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
  room_types?: Array<{
    baseRate?: number;
    basePrice?: number;
    rates?: Record<string, number>;
    name?: string;
  }>;
  stay_lengths?: number[];
  rates?: Record<string, number>;
  pricingmatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
  pricingMatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
  hotel_themes?: Array<{
    themes?: {
      name: string;
    };
  }>;
  hotel_activities?: Array<{
    activities?: {
      name: string;
    };
  }>;
  country?: string;
}

interface SearchResultCardProps {
  hotel: Hotel;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ hotel }) => {
  const navigate = useNavigate();

  const handleHotelClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  // Extract city and country from location
  const locationParts = hotel.location?.split(', ') || [];
  const city = locationParts[0] || '';
  const country = hotel.country || locationParts[1] || '';

  // Get main image
  const mainImage = hotel.thumbnail || "/placeholder.svg";

  // Convert themes format
  const themes = hotel.hotel_themes?.map(ht => ({
    id: ht.themes?.name || '',
    name: ht.themes?.name || ''
  })) || [];

  return (
    <HotelCard
      id={hotel.id}
      name={hotel.name}
      city={city}
      country={country}
      stars={0}
      pricePerMonth={hotel.price_per_month}
      themes={themes}
      image={mainImage}
      availableMonths={[]}
      rates={hotel.rates}
      hotel_themes={hotel.hotel_themes}
      hotel_activities={hotel.hotel_activities}
      meal_plans={[]}
      location={hotel.location}
      thumbnail={hotel.thumbnail}
      onClick={handleHotelClick}
    />
  );
};
