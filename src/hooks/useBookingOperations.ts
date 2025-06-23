
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { BookingStatus } from '@/types/booking';

export const useBookingOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const canModifyBooking = (status: string) => {
    return status === BookingStatus.PENDING || status === BookingStatus.CONFIRMED;
  };

  const canCancelBooking = (status: string) => {
    return status === BookingStatus.PENDING || status === BookingStatus.CONFIRMED;
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: BookingStatus.CANCELLED,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: t('booking.messages.cancelSuccess'),
        description: t('booking.messages.cancelSuccess')
      });

      return true;
    } catch (error: any) {
      console.error('Error cancelling booking:', error);
      toast({
        title: t('booking.messages.cancelError'),
        description: error.message || t('booking.messages.cancelError'),
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const modifyBooking = async (bookingId: string, newCheckIn: string, newCheckOut: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('bookings')
        .update({ 
          check_in: newCheckIn,
          check_out: newCheckOut,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: t('booking.messages.modifySuccess'),
        description: t('booking.messages.modifySuccess')
      });

      return true;
    } catch (error: any) {
      console.error('Error modifying booking:', error);
      toast({
        title: t('booking.messages.modifyError'),
        description: error.message || t('booking.messages.modifyError'),
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    canModifyBooking,
    canCancelBooking,
    cancelBooking,
    modifyBooking
  };
};
