import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AvailabilityPackage } from '@/types/availability-package';

interface UseRealTimeAvailabilityProps {
  hotelId?: string;
  selectedMonth?: string;
}

export function useRealTimeAvailability({ hotelId, selectedMonth }: UseRealTimeAvailabilityProps) {
  const [packages, setPackages] = useState<AvailabilityPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchPackages = useCallback(async () => {
    if (!hotelId) {
      setPackages([]);
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      
      let query = supabase
        .from('availability_packages')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('start_date', { ascending: true });

      // Apply month filter if provided
      if (selectedMonth) {
        const year = new Date().getFullYear();
        const monthIndex = new Date(`${selectedMonth} 1, ${year}`).getMonth();
        const startOfMonth = new Date(year, monthIndex, 1).toISOString().split('T')[0];
        const endOfMonth = new Date(year, monthIndex + 1, 0).toISOString().split('T')[0];
        
        query = query
          .gte('start_date', startOfMonth)
          .lte('end_date', endOfMonth);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        throw queryError;
      }

      setPackages(data || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [hotelId, selectedMonth]);

  // Set up real-time subscription for availability changes
  useEffect(() => {
    if (!hotelId) return;

    fetchPackages();

    // Subscribe to real-time changes for availability packages
    const channel = supabase
      .channel('package-availability-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'availability_packages',
          filter: `hotel_id=eq.${hotelId}`
        },
        (payload) => {
          console.log('Package availability changed:', payload);
          
          // Refresh availability data when changes occur
          fetchPackages();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `hotel_id=eq.${hotelId}`
        },
        (payload) => {
          console.log('Booking changed, refreshing availability:', payload);
          
          // Refresh when bookings change as it affects availability
          fetchPackages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hotelId, fetchPackages]);

  // Manual refresh function
  const refreshAvailability = useCallback(() => {
    setIsLoading(true);
    fetchPackages();
  }, [fetchPackages]);

  return {
    packages,
    isLoading,
    error,
    lastUpdated,
    refreshAvailability
  };
}