
import React, { useState, useEffect } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { EnhancedBookingCard } from "./EnhancedBookingCard";
import { BookingDetailModal } from "./BookingDetailModal";

export default function BookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            hotels(
              name, 
              city, 
              country, 
              main_image_url,
              contact_name,
              contact_email,
              contact_phone
            )
          `)
          .eq('user_id', user.id)
          .order('check_in', { ascending: true });
        
        if (error) throw error;
        
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error loading bookings",
          description: "We couldn't load your bookings. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [user, toast]);

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">My Reservations</h2>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
          <span className="ml-2">Loading your reservations...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">My Reservations</h2>
        
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <EnhancedBookingCard 
                key={booking.id} 
                booking={booking}
                onViewDetails={() => handleViewDetails(booking)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-fuchsia-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">No reservations yet</h3>
            <p className="text-muted-foreground mb-6">You don't have any reservations at the moment.</p>
            <a href="/" className="inline-block py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
              Browse Hotels
            </a>
          </div>
        )}
      </div>

      <BookingDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
      />
    </>
  );
}
