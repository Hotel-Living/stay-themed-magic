
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Booking } from "@/integrations/supabase/types-custom";

export function useBookingsFetcher() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  const fetchBookings = useCallback(async (userId: string | undefined, hotelId?: string) => {
    if (!userId) {
      setBookings([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('bookings')
        .select('*');
      
      if (!hotelId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('hotel_id', hotelId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setBookings(data as Booking[]);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      setError(error);
      toast({
        title: "Error fetching bookings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateBookingState = useCallback((newBooking: Booking, eventType: 'INSERT' | 'UPDATE' | 'DELETE') => {
    if (eventType === 'INSERT') {
      setBookings(prev => [...prev, newBooking]);
      toast({
        title: "New Booking",
        description: "A new booking has been created."
      });
    } else if (eventType === 'UPDATE') {
      setBookings(prev => prev.map(booking => 
        booking.id === newBooking.id ? newBooking : booking
      ));
      toast({
        title: "Booking Updated",
        description: "A booking has been updated."
      });
    } else if (eventType === 'DELETE') {
      setBookings(prev => prev.filter(booking => booking.id !== newBooking.id));
      toast({
        title: "Booking Removed",
        description: "A booking has been cancelled."
      });
    }
  }, [toast]);

  return {
    bookings,
    isLoading,
    error,
    setError,
    fetchBookings,
    updateBookingState
  };
}
