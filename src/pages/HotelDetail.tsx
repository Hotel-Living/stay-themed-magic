
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelDetailContent } from "@/components/hotel-detail/HotelDetailContent";
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { useToast } from "@/hooks/use-toast";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const { data: hotel, isLoading, error } = useHotelDetail(id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add debugging for hotel data and images
    if (hotel) {
      console.log("HotelDetail page received hotel data:", hotel);
      console.log("HotelDetail page received hotel images:", hotel.hotel_images);
    }
    
    if (error) {
      toast({
        title: "Error loading hotel",
        description: "There was a problem loading the hotel details. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching hotel data:", error);
    }
  }, [error, toast, hotel]);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#B3B3FF]">
      <Navbar />
      
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
