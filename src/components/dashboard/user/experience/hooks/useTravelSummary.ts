
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useTravelSummary = () => {
  const [totalStays, setTotalStays] = useState(0);
  const [uniqueCities, setUniqueCities] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTravelSummary = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get completed bookings
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select(`
            *,
            hotels (city, country)
          `)
          .eq('user_id', user.id)
          .eq('status', 'completed');

        if (error) throw error;

        if (bookings) {
          // Calculate total stays
          setTotalStays(bookings.length);

          // Calculate unique cities
          const uniqueCitiesSet = new Set();
          bookings.forEach(booking => {
            if (booking.hotels?.city && booking.hotels?.country) {
              uniqueCitiesSet.add(`${booking.hotels.city}, ${booking.hotels.country}`);
            }
          });
          setUniqueCities(uniqueCitiesSet.size);

          // Calculate total days
          const totalDaysCount = bookings.reduce((sum, booking) => {
            const checkIn = new Date(booking.check_in);
            const checkOut = new Date(booking.check_out);
            const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
            return sum + days;
          }, 0);
          setTotalDays(totalDaysCount);

          // Calculate total spent
          const totalSpentAmount = bookings.reduce((sum, booking) => sum + booking.total_price, 0);
          setTotalSpent(totalSpentAmount);
        }
      } catch (error) {
        console.error('Error fetching travel summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelSummary();
  }, [user]);

  return {
    totalStays,
    uniqueCities,
    totalDays,
    totalSpent,
    loading
  };
};
