
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HotelDetailContent } from "@/components/hotel-detail/HotelDetailContent";
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { useToast } from "@/hooks/use-toast";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Use the Supabase hook to fetch hotel data
  const { data: hotel, isLoading, error } = useHotelDetail(id);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Show error toast if there's an error fetching the hotel
    if (error) {
      toast({
        title: "Error loading hotel",
        description: "There was a problem loading the hotel details. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching hotel data:", error);
    }
  }, [error, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {isLoading ? (
          <HotelDetailContent hotel={{} as any} isLoading={true} />
        ) : hotel ? (
          <HotelDetailContent hotel={hotel} isLoading={false} />
        ) : (
          <HotelNotFound />
        )}
      </main>
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20 mt-10">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
