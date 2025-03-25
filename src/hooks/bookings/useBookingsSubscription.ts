
import { useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/integrations/supabase/types-custom";

export interface BookingSubscriptionConfig {
  hotelId?: string;
  userId: string | undefined;
  onUpdate: (booking: Booking, eventType: 'INSERT' | 'UPDATE' | 'DELETE') => void;
}

export function useBookingsSubscription({ 
  hotelId, 
  userId, 
  onUpdate 
}: BookingSubscriptionConfig) {
  const channelRef = useRef<ReturnType<typeof supabase.channel>>();
  
  const getSubscriptionFilter = useCallback(() => {
    return hotelId ? `hotel_id=eq.${hotelId}` : `user_id=eq.${userId}`;
  }, [hotelId, userId]);

  const setupSubscription = useCallback(() => {
    if (!userId) return null;
    
    const currentFilter = getSubscriptionFilter();
    
    const channel = supabase
      .channel(`booking-changes-${hotelId || userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: currentFilter
      }, (payload) => {
        console.log('Real-time booking update:', payload);
        
        if (payload.eventType === 'INSERT') {
          onUpdate(payload.new as Booking, 'INSERT');
        } else if (payload.eventType === 'UPDATE') {
          onUpdate(payload.new as Booking, 'UPDATE');
        } else if (payload.eventType === 'DELETE') {
          onUpdate(payload.old as Booking, 'DELETE');
        }
      });

    return channel;
  }, [hotelId, userId, getSubscriptionFilter, onUpdate]);

  const cleanup = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = undefined;
    }
  }, []);

  return {
    setupSubscription,
    cleanup,
    channelRef
  };
}
