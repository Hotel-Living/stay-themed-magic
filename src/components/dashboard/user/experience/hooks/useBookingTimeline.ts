
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface TimelineBooking {
  id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  hotels?: {
    name: string;
    city: string;
    country: string;
    hotel_themes?: Array<{
      themes: {
        id: string;
        name: string;
        description?: string;
        category?: string;
      };
    }>;
  };
}

export const useBookingTimeline = () => {
  const [bookings, setBookings] = useState<TimelineBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookingTimeline = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get completed bookings with hotel and theme data
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            check_in,
            check_out,
            total_price,
            hotels (
              name,
              city,
              country,
              hotel_themes (
                themes (
                  id,
                  name,
                  description,
                  category
                )
              )
            )
          `)
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('check_in', { ascending: false })
          .limit(10); // Show last 10 bookings

        if (error) throw error;

        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching booking timeline:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingTimeline();
  }, [user]);

  return {
    bookings,
    loading
  };
};
