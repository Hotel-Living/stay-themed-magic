
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Heart } from "lucide-react";
import { format } from "date-fns";
import { HotelDetailProps } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/dynamicPricing";
import { HotelLocation } from "./HotelLocation";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  const { toast } = useToast();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [selectedDuration, setSelectedDuration] = useState<number>(8);
  
  // Default durations
  const stayDurations = hotel.stay_lengths || [8, 16, 24, 32];
  
  // Extract themes from hotel_themes for the header component
  const hotelThemes = hotel.themes || [];
  const hotelActivities = hotel.activities || [];
  
  // Format hotel highlights from the form data
  const hotelHighlights = [
    {
      question: "This hotel is perfect for:",
      answer: hotel.idealGuests || "Guests seeking a memorable stay."
    },
    {
      question: "The atmosphere of this hotel is:",
      answer: hotel.atmosphere || "Welcoming and comfortable."
    },
    {
      question: "Our location is perfect for:",
      answer: hotel.perfectLocation || "Exploring the local area and attractions."
    }
  ];
  
  // Calculate check-out date based on check-in and duration
  const calculateCheckoutDate = () => {
    if (!checkInDate) return "";
    const checkoutDate = new Date(checkInDate);
    checkoutDate.setDate(checkoutDate.getDate() + (selectedDuration || 8));
    return format(checkoutDate, "MM/dd/yyyy");
  };
  
  const handleAddToFavorites = () => {
    toast({
      title: "Feature in development",
      description: "Adding to favorites will be available soon.",
    });
  };
  
  const handleBookClick = () => {
    toast({
      title: "Feature in development",
      description: "Online booking will be available soon.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-72 w-full rounded-xl mb-4" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <h1 className="text-4xl font-extrabold text-purple-100 mb-1">{hotel.name}</h1>
            <p className="italic text-purple-300 flex items-center gap-1">
              <MapPin size={16} /> {hotel.address || `${hotel.city}, ${hotel.country}`}
            </p>
            
            {/* Image Gallery */}
            <div className="mt-4">
              <div className="rounded-xl overflow-hidden">
                {(hotel.hotel_images && hotel.hotel_images.length > 0) ? (
                  <div className="relative">
                    <img
                      src={hotel.hotel_images[0].image_url}
                      alt={`${hotel.name}`}
                      className="w-full h-72 object-cover"
                    />
                    {hotel.hotel_images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        +{hotel.hotel_images.length - 1} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-72 bg-fuchsia-900/20 flex items-center justify-center rounded-xl">
                    <p className="text-fuchsia-300">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {stayDurations.length > 0 && (
              <p className="text-sm text-amber-400 mt-3">
                This hotel offers extended stay options of {stayDurations.join(", ").replace(/, ([^,]*)$/, " and $1")} nights.
              </p>
            )}
            
            {hotelThemes.length > 0 && (
              <>
                <p className="mt-2 text-purple-300">
                  <span className="font-semibold text-purple-100">Affinities:</span> {hotelThemes.map(theme => theme.name).join(" · ")}
                </p>
                <p className="text-sm text-purple-400 mt-1">
                  A welcoming place for guests with a passion for {hotelThemes.map(theme => theme.name).join(", ").replace(/, ([^,]*)$/, " and $1")}.
                </p>
              </>
            )}
            
            {hotelActivities.length > 0 && (
              <>
                <p className="mt-2 text-purple-300">
                  <span className="font-semibold text-purple-100">Activities:</span> {hotelActivities.join(" · ")}
                </p>
                <p className="text-sm text-purple-400 mt-1">
                  Guests can enjoy activities such as {hotelActivities.join(", ").replace(/, ([^,]*)$/, " and $1")} right from the hotel or nearby.
                </p>
              </>
            )}

            {/* Highlights from Hotel Form */}
            <div className="mt-4 space-y-2">
              {hotelHighlights.map((item, index) => (
                item.answer ? (
                  <p key={index} className="text-sm text-purple-300">
                    <strong className="text-purple-100">{item.question}</strong> {item.answer}
                  </p>
                ) : null
              ))}
            </div>
          </div>
          <button 
            className="text-sm text-blue-300 hover:underline flex items-center gap-1 shrink-0"
            onClick={handleAddToFavorites}
          >
            <Heart size={16} /> Add to Favorites
          </button>
        </div>
      </div>

      {/* Calendar + Price */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          {/* General Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-white">General description</h2>
            <p className="text-purple-200">
              {hotel.description || "No description available for this hotel."}
            </p>
          </div>
          
          {/* Price breakdown moved up */}
          <div className="bg-fuchsia-950/30 rounded-xl p-4 shadow text-sm text-purple-200 mb-8">
            <p>
              <span className="font-semibold">Stays available:</span> {stayDurations.join(", ").replace(/, ([^,]*)$/, " and $1")} nights
            </p>
            <p>
              <span className="font-semibold">Rates:</span> From: {' '}
              {hotel.rates ? (
                stayDurations.map(duration => (
                  hotel.rates?.[duration] ? 
                  `${formatCurrency(hotel.rates[duration], hotel.currency)} (${duration} days)` : 
                  null
                )).filter(Boolean).join(' · ')
              ) : (
                hotel.price_per_month ? 
                `${formatCurrency(hotel.price_per_month, hotel.currency)} (monthly)` : 
                'Rates not available'
              )}
            </p>
          </div>
          
          {/* Features */}
          <HotelFeaturesInfo
            hotelFeatures={hotel.hotelFeatures || []}
            roomFeatures={hotel.roomFeatures || []}
          />
          
          {/* Map */}
          <div className="mt-8">
            <HotelLocation 
              latitude={Number(hotel.latitude)} 
              longitude={Number(hotel.longitude)} 
              hotelName={hotel.name} 
              address={hotel.address || ""}
            />
          </div>
        </div>

        <div className="bg-fuchsia-950/30 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-2 text-purple-100">Check-in</h2>
          <Calendar 
            className="mb-4" 
            selected={checkInDate}
            onSelect={setCheckInDate}
            disabled={(date) => date < new Date()}
          />

          <h2 className="text-lg font-semibold mb-2 text-purple-100">Stay duration</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {stayDurations.map((d) => (
              <Button 
                variant={selectedDuration === d ? "default" : "outline"} 
                key={d}
                onClick={() => setSelectedDuration(d)}
              >
                {d}
              </Button>
            ))}
          </div>
          <p className="text-sm text-purple-300 mb-2">Check-out: {calculateCheckoutDate()}</p>

          <p className="text-2xl font-bold text-purple-100">
            {hotel.rates && hotel.rates[selectedDuration] ? 
              formatCurrency(hotel.rates[selectedDuration], hotel.currency) : 
              hotel.price_per_month ? 
              formatCurrency(hotel.price_per_month, hotel.currency) :
              "Price not available"
            } per person
          </p>
          <Button className="mt-3 w-full" onClick={handleBookClick}>Book</Button>
          <p className="text-xs text-purple-400 mt-2">
            This hotel uses dynamic pricing. Book early to secure the best rate.
          </p>
        </div>
      </div>
    </div>
  );
}
