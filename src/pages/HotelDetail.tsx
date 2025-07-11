
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelDetailContent } from "@/components/hotel-detail/HotelDetailContent";
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";
import { useHotelDetailWithTranslations } from "@/hooks/useHotelDetailWithTranslations";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import LiveVisitorsTag from "@/components/common/LiveVisitorsTag";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { language } = useTranslation();
  
  const { data: hotel, isLoading, error, hasTranslation } = useHotelDetailWithTranslations(id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (error) {
      toast({
        title: "Error loading hotel",
        description: "There was a problem loading the hotel details. Please try again.",
        variant: "destructive",
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
  
  return (
    <div className="min-h-screen flex flex-col bg-[#B3B3FF]">
      <Navbar />
      <LiveVisitorsTag />
      
      <main className="flex-1">
        {isLoading ? (
          <HotelDetailContent hotel={{} as any} isLoading={true} />
        ) : hotel ? (
          <HotelDetailContent hotel={hotel} isLoading={false} />
        ) : (
          <HotelNotFound />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
