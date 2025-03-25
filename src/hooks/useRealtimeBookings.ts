
import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Booking } from "@/integrations/supabase/types-custom";
import { useBookingsSubscription } from "./bookings/useBookingsSubscription";
import { useBookingsFetcher } from "./bookings/useBookingsFetcher";
import { useReconnectionHandler } from "./bookings/useReconnectionHandler";

export function useRealtimeBookings(hotelId?: string) {
  const { user } = useAuth();
  const prevFilterRef = useRef<string | null>(null);
  
  // Get the core functionality from our composable hooks
  const {
    bookings,
    isLoading,
    error,
    setError,
    fetchBookings,
    updateBookingState
  } = useBookingsFetcher();

  const reconnectHandler = useCallback(() => {
    // Remove existing channel if any
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = undefined;
    }
    
    // Create a new channel
    const channel = setupSubscription();
    if (channel) {
      channelRef.current = channel.subscribe((status) => {
        console.log(`Realtime subscription status: ${status}`);
        
        if (status === 'SUBSCRIBED') {
          // Successfully connected
          resetReconnection();
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          // Handle connection error
          handleSubscriptionError();
        }
      });
    }
    
    // Refetch data
    fetchBookings(user?.id, hotelId);
  }, [user, hotelId]);

  const {
    isReconnecting,
    handleSubscriptionError,
    reconnect: triggerReconnect,
    resetReconnection,
    cleanupReconnection
  } = useReconnectionHandler({
    onReconnect: reconnectHandler
  });

  const {
    setupSubscription,
    cleanup: cleanupSubscription,
    channelRef
  } = useBookingsSubscription({
    hotelId,
    userId: user?.id,
    onUpdate: updateBookingState
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    const currentFilter = hotelId ? `hotel_id=eq.${hotelId}` : `user_id=eq.${user.id}`;
    const hasFilterChanged = currentFilter !== prevFilterRef.current;
    
    fetchBookings(user.id, hotelId);
    
    if (hasFilterChanged) {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = undefined;
      }
      
      const channel = setupSubscription();
      if (channel) {
        channelRef.current = channel.subscribe((status) => {
          console.log(`Realtime subscription status: ${status}`);
          
          if (status === 'SUBSCRIBED') {
            // Successfully connected
            resetReconnection();
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            // Handle connection error
            handleSubscriptionError();
          }
        });
      }
      
      prevFilterRef.current = currentFilter;
    }

    return () => {
      cleanupSubscription();
      cleanupReconnection();
    };
  }, [user, hotelId, fetchBookings, setupSubscription, cleanupSubscription, 
      cleanupReconnection, resetReconnection, handleSubscriptionError]);

  // Public API for manual reconnection
  const reconnect = useCallback(() => {
    triggerReconnect();
  }, [triggerReconnect]);

  return { 
    bookings, 
    isLoading,
    error,
    isReconnecting,
    reconnect
  };
}
