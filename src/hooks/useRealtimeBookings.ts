import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Booking } from "@/integrations/supabase/types-custom";

export function useRealtimeBookings(hotelId?: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const channelRef = useRef<ReturnType<typeof supabase.channel>>();
  
  const prevFilterRef = useRef<string | null>(null);
  const bookingsRef = useRef<Booking[]>([]);

  useEffect(() => {
    bookingsRef.current = bookings;
  }, [bookings]);

  const fetchBookings = useCallback(async () => {
    if (!user) {
      setBookings([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      let query = supabase
        .from('bookings')
        .select('*');
      
      if (!hotelId) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('hotel_id', hotelId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setBookings(data as Booking[]);
      bookingsRef.current = data as Booking[];
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error fetching bookings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, hotelId, toast]);

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

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setIsLoading(false);
      return;
    }

    const currentFilter = hotelId ? `hotel_id=eq.${hotelId}` : `user_id=eq.${user.id}`;
    
    const hasFilterChanged = currentFilter !== prevFilterRef.current;
    
    fetchBookings();
    
    if (hasFilterChanged) {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      
      const channel = supabase
        .channel(`booking-changes-${hotelId || user.id}`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: currentFilter
        }, (payload) => {
          console.log('Real-time booking update:', payload);
          
          if (payload.eventType === 'INSERT') {
            updateBookingState(payload.new as Booking, 'INSERT');
          } else if (payload.eventType === 'UPDATE') {
            updateBookingState(payload.new as Booking, 'UPDATE');
          } else if (payload.eventType === 'DELETE') {
            updateBookingState(payload.old as Booking, 'DELETE');
          }
        })
        .subscribe((status) => {
          console.log(`Realtime subscription status: ${status}`);
        });
      
      channelRef.current = channel;
      
      prevFilterRef.current = currentFilter;
    }

    return () => {
      if (channelRef.current) {
        console.log('Removing realtime channel subscription');
        supabase.removeChannel(channelRef.current);
        channelRef.current = undefined;
      }
    };
  }, [user, hotelId, fetchBookings, updateBookingState]);

  return { bookings, isLoading };
}
