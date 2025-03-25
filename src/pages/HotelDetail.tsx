
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { hotels } from "@/utils/data";
import { HotelDetailContent } from "@/components/hotel-detail/HotelDetailContent";
import { HotelNotFound } from "@/components/hotel-detail/HotelNotFound";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState(hotels.find(h => h.id === id));
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update hotel if id changes
    setHotel(hotels.find(h => h.id === id));
  }, [id]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {hotel ? (
          <HotelDetailContent hotel={hotel} />
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
