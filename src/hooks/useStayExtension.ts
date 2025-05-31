
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface EligibleBooking {
  id: string;
  hotel_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  duration: number;
  daysUntilCheckout: number;
  hotels: {
    name: string;
    allow_stay_extensions?: boolean;
    rates?: any; // Changed from Record<string, number> to any to handle Json type
  };
}

export const useStayExtension = () => {
  const [eligibleBookings, setEligibleBookings] = useState<EligibleBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchEligibleBookings = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const today = new Date();
        const fiveDaysFromNow = new Date(today);
        fiveDaysFromNow.setDate(today.getDate() + 5);

        const { data: bookings, error } = await supabase
          .from('bookings')
          .select(`
            *,
            hotels(
              name,
              allow_stay_extensions,
              rates
            )
          `)
          .eq('user_id', user.id)
          .eq('status', 'confirmed')
          .gte('check_out', today.toISOString().split('T')[0])
          .lte('check_out', fiveDaysFromNow.toISOString().split('T')[0]);

        if (error) throw error;

        const eligible = bookings
          ?.filter(booking => booking.hotels?.allow_stay_extensions !== false)
          .map(booking => {
            const checkInDate = new Date(booking.check_in);
            const checkOutDate = new Date(booking.check_out);
            const duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
            const daysUntilCheckout = Math.ceil((checkOutDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

            return {
              ...booking,
              duration,
              daysUntilCheckout,
              hotels: {
                name: booking.hotels?.name || '',
                allow_stay_extensions: booking.hotels?.allow_stay_extensions,
                rates: booking.hotels?.rates
              }
            };
          }) || [];

        setEligibleBookings(eligible);
      } catch (error) {
        console.error('Error fetching eligible bookings:', error);
        toast({
          title: "Error",
          description: "Failed to load extension opportunities",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEligibleBookings();
  }, [user, toast]);

  const calculateExtensionOptions = (booking: EligibleBooking) => {
    const standardTiers = [8, 16, 24, 32];
    const currentDuration = booking.duration;
    const rates = booking.hotels?.rates || {};
    
    // Safely handle the rates object which might be Json type
    const ratesObj = typeof rates === 'object' && rates !== null ? rates : {};
    
    const options = standardTiers
      .filter(tier => tier > currentDuration)
      .map(tier => {
        const newPrice = ratesObj[`${tier}_days`] || ratesObj[tier.toString()] || 0;
        const priceDifference = newPrice - booking.total_price;
        
        return {
          duration: tier,
          newPrice,
          priceDifference,
          available: priceDifference > 0 && newPrice > booking.total_price
        };
      })
      .filter(option => option.available);

    return options;
  };

  return {
    eligibleBookings,
    isLoading,
    calculateExtensionOptions
  };
};
