import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AvailabilityPackage } from '@/types/availability-package';

interface BookingData {
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  roomsToReserve: number;
}

export const usePackageBookingOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createPackageBooking = async (
    selectedPackage: AvailabilityPackage,
    hotelId: string,
    bookingData: BookingData,
    totalPrice: number
  ) => {
    setLoading(true);

    try {
      // Log booking attempt for audit purposes
      console.log('Attempting package booking:', {
        packageId: selectedPackage.id,
        hotelId,
        roomsRequested: bookingData.roomsToReserve,
        guestEmail: bookingData.guestEmail
      });

      // Step 1: Check package availability atomically using enhanced function
      const { data: availabilityCheck, error: availabilityError } = await supabase.rpc('check_package_availability_enhanced', {
        p_package_id: selectedPackage.id,
        p_rooms_needed: bookingData.roomsToReserve
      });

      if (availabilityError) {
        throw new Error(`Availability check failed: ${availabilityError.message}`);
      }

      if (!availabilityCheck) {
        throw new Error('The selected rooms are no longer available');
      }

      // Step 2: Reserve the rooms atomically using enhanced function
      const { data: reservationSuccess, error: reservationError } = await supabase.rpc('reserve_package_rooms_enhanced', {
        p_package_id: selectedPackage.id,
        p_rooms_to_reserve: bookingData.roomsToReserve
      });

      if (reservationError) {
        throw new Error(`Room reservation failed: ${reservationError.message}`);
      }

      if (!reservationSuccess) {
        throw new Error('Unable to reserve the selected rooms');
      }

      // Step 3: Create the booking record
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          hotel_id: hotelId,
          package_id: selectedPackage.id,
          check_in: selectedPackage.start_date,
          check_out: selectedPackage.end_date,
          total_price: Math.round(totalPrice),
          status: 'confirmed'
        })
        .select()
        .single();

      if (bookingError || !booking) {
        // Critical: If booking creation fails, restore package availability using enhanced function
        console.error('Booking creation failed, restoring package availability:', bookingError);
        
        const { error: restoreError } = await supabase.rpc('restore_package_availability_enhanced', {
          p_package_id: selectedPackage.id,
          p_rooms_to_restore: bookingData.roomsToReserve
        });

        if (restoreError) {
          console.error('CRITICAL: Failed to restore package availability after booking failure:', restoreError);
        }

        throw new Error('Unable to create booking record');
      }

      // Log successful booking for audit purposes
      console.log('Package booking completed successfully:', {
        bookingId: booking.id,
        packageId: selectedPackage.id,
        roomsReserved: bookingData.roomsToReserve,
        totalPrice: Math.round(totalPrice)
      });

      return booking;

    } catch (error: any) {
      console.error('Package booking error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const validateBookingData = (bookingData: BookingData, selectedPackage: AvailabilityPackage) => {
    if (!bookingData.guestName || !bookingData.guestEmail) {
      throw new Error('Guest name and email are required');
    }

    if (bookingData.roomsToReserve <= 0) {
      throw new Error('Number of rooms must be positive');
    }

    if (bookingData.roomsToReserve > selectedPackage.available_rooms) {
      throw new Error(`Only ${selectedPackage.available_rooms} rooms available`);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.guestEmail)) {
      throw new Error('Please enter a valid email address');
    }
  };

  return {
    loading,
    createPackageBooking,
    validateBookingData
  };
};