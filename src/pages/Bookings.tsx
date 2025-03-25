
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import BookingsContent from "@/components/dashboard/BookingsContent";
import { Starfield } from "@/components/Starfield";
import { handleApiError } from "@/utils/errorHandling";

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "My Bookings | Hotel-Living";
    
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            hotels(
              id, name, city, country, main_image_url,
              hotel_images(image_url, is_main)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          handleApiError(error, "Error loading bookings");
          return;
        }
        
        setBookings(data || []);
      } catch (error) {
        handleApiError(error, "Error loading bookings");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          
          <BookingsContent 
            bookings={bookings} 
            isLoading={isLoading} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
