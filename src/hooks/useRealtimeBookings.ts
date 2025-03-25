
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Booking } from "@/integrations/supabase/types-custom";

export function useRealtimeBookings(hotelId?: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const channelRef = useRef<ReturnType<typeof supabase.channel>>();
  
  const prevFilterRef = useRef<string | null>(null);
  const bookingsRef = useRef<Booking[]>([]);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 2000; // 2 seconds

  useEffect(() => {
    bookingsRef.current = bookings;
  }, [bookings]);

  const fetchBookings = useCallback(async () => {
    if (!user) {
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
      setError(error);
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

  const setupRealtimeSubscription = useCallback(() => {
    if (!user) return null;
    
    const currentFilter = hotelId ? `hotel_id=eq.${hotelId}` : `user_id=eq.${user.id}`;
    
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
        
        if (status === 'SUBSCRIBED') {
          // Successfully connected
          setIsReconnecting(false);
          reconnectAttemptsRef.current = 0;
          
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = undefined;
          }
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          // Handle connection error
          handleSubscriptionError();
        }
      });
    
    return channel;
  }, [user, hotelId, updateBookingState]);

  const handleSubscriptionError = useCallback(() => {
    setIsReconnecting(true);
    
    // Clear any existing timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    // Check if we've exceeded our reconnection attempts
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      setIsReconnecting(false);
      setError(new Error("Failed to establish a real-time connection after multiple attempts."));
      toast({
        title: "Connection Error",
        description: "Failed to maintain real-time connection. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }
    
    // Set a timeout to attempt reconnection
    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current += 1;
      
      // Remove existing channel if any
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = undefined;
      }
      
      // Setup a new subscription
      const newChannel = setupRealtimeSubscription();
      if (newChannel) {
        channelRef.current = newChannel;
      }
    }, RECONNECT_DELAY);
  }, [setupRealtimeSubscription, toast]);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const currentFilter = hotelId ? `hotel_id=eq.${hotelId}` : `user_id=eq.${user.id}`;
    const hasFilterChanged = currentFilter !== prevFilterRef.current;
    
    fetchBookings();
    
    if (hasFilterChanged) {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = undefined;
      }
      
      const channel = setupRealtimeSubscription();
      if (channel) {
        channelRef.current = channel;
      }
      
      prevFilterRef.current = currentFilter;
    }

    return () => {
      if (channelRef.current) {
        console.log('Removing realtime channel subscription');
        supabase.removeChannel(channelRef.current);
        channelRef.current = undefined;
      }
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = undefined;
      }
    };
  }, [user, hotelId, fetchBookings, setupRealtimeSubscription]);

  // Public API for manual reconnection
  const reconnect = useCallback(() => {
    if (isReconnecting) return; // Already reconnecting
    
    setIsReconnecting(true);
    reconnectAttemptsRef.current = 0;
    
    // Remove existing channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = undefined;
    }
    
    // Create a new channel
    const channel = setupRealtimeSubscription();
    if (channel) {
      channelRef.current = channel;
    }
    
    // Refetch data
    fetchBookings();
  }, [isReconnecting, setupRealtimeSubscription, fetchBookings]);

  return { 
    bookings, 
    isLoading,
    error,
    isReconnecting,
    reconnect
  };
}
