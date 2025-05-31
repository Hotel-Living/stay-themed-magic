
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Destination {
  city: string;
  country: string;
  stayCount: number;
}

export const useVisitedDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDestinations = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get completed bookings with hotel location data
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select(`
            hotels (city, country)
          `)
          .eq('user_id', user.id)
          .eq('status', 'completed');

        if (error) throw error;

        if (bookings) {
          // Group by city and country, count stays
          const destinationMap = new Map<string, Destination>();
          
          bookings.forEach(booking => {
            if (booking.hotels?.city && booking.hotels?.country) {
              const key = `${booking.hotels.city}-${booking.hotels.country}`;
              const existing = destinationMap.get(key);
              
              if (existing) {
                existing.stayCount++;
              } else {
                destinationMap.set(key, {
                  city: booking.hotels.city,
                  country: booking.hotels.country,
                  stayCount: 1
                });
              }
            }
          });

          // Convert to array and sort by stay count
          const destinationsArray = Array.from(destinationMap.values())
            .sort((a, b) => b.stayCount - a.stayCount);
          
          setDestinations(destinationsArray);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [user]);

  return {
    destinations,
    loading
  };
};
