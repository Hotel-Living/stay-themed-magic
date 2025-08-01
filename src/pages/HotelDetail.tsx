import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";
import { HotelDetailContentEnhanced } from "@/components/hotel-detail/HotelDetailContentEnhanced";
import { useHotelDetailWithTranslations } from "@/hooks/useHotelDetailWithTranslations";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import BubbleCounter from "@/components/common/BubbleCounter";
import { HotelPageAvatar } from "@/components/avatars/HotelPageAvatar";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { language, t } = useTranslation('hotel');
  
  const {
    data: hotel,
    isLoading,
    error,
    hasTranslation
  } = useHotelDetailWithTranslations(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      toast({
        title: "Error loading hotel",
        description: "There was a problem loading the hotel details. Please try again.",
        variant: "destructive"
      });
      console.error("Error fetching hotel data:", error);
    }
  }, [error, toast]);

  // Debug logging to verify translation is working
  useEffect(() => {
    if (hotel && language !== 'en') {
      console.log('Current language:', language);
      console.log('Has translation:', hasTranslation);
      console.log('Hotel name (possibly translated):', hotel.name);
    }
  }, [hotel, language, hasTranslation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BubbleCounter />
        <main className="flex-1">
          <HotelDetailContentEnhanced hotel={null} isLoading={true} />
        </main>
        <Footer />
        <HotelPageAvatar />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col bg-[#B3B3FF]">
        <Navbar />
        <BubbleCounter />
        <main className="flex-1">
          <HotelNotFound />
        </main>
        <Footer />
        <HotelPageAvatar />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BubbleCounter />
      <main className="flex-1 relative">
        {/* Gradient background for upper section only */}
        <div 
          className="absolute top-0 left-0 w-full h-[80vh]"
          style={{
            background: 'linear-gradient(180deg, #00DCF9 0%, #001999 100%)'
          }}
        />
        {/* Solid dark blue background for the rest */}
        <div 
          className="absolute top-[80vh] left-0 w-full"
          style={{
            background: '#001999',
            height: 'calc(100vh + 200px)' // Extra height to ensure coverage
          }}
        />
        <div className="relative z-10">
          <HotelDetailContentEnhanced hotel={hotel} isLoading={false} />
        </div>
      </main>
      <Footer />
      <HotelPageAvatar />
    </div>
  );
}