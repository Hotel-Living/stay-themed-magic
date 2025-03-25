
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";
import { Booking } from '@/integrations/supabase/types-custom';

export function useCancelBooking() {
  const [isDeleting, setIsDeleting] = useState(false);

  const cancelBooking = async (bookingId: string) => {
    try {
      setIsDeleting(true);
      
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast({
        title: "Booking cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error cancelling booking",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    cancelBooking,
    isDeleting
  };
}
