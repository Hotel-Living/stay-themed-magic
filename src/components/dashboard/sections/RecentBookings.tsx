
import React from 'react';
import BookingItem from "../BookingItem";
import { Booking } from '@/integrations/supabase/types-custom';

interface RecentBookingsProps {
  bookings: {
    emmaBooking: Booking;
    michaelBooking: Booking;
    sarahBooking: Booking;
  };
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
      <div className="space-y-4">
        <BookingItem 
          booking={bookings.emmaBooking}
          name="Emma Thompson" 
          dates="Nov 15 - Nov 23" 
          property="Parador de Granada"
          status="confirmed"
        />
        <BookingItem 
          booking={bookings.michaelBooking}
          name="Michael Chen" 
          dates="Dec 5 - Dec 21" 
          property="TechHub Barcelona"
          status="pending"
        />
        <BookingItem 
          booking={bookings.sarahBooking}
          name="Sarah Johnson" 
          dates="Jan 10 - Jan 18" 
          property="Parador de Granada"
          status="confirmed"
        />
      </div>
      <button className="w-full mt-4 py-2 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition">
        View all bookings
      </button>
    </div>
  );
}

export default RecentBookings;
