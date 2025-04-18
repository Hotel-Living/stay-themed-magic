
import { useState, useEffect } from 'react';
import { fetchAllHotels } from '@/services/hotelService';
import { useAuth } from '@/context/AuthContext';

export function useHotelAdmin() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);
        const data = await fetchAllHotels();
        setHotels(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load hotels for admin:", err);
        setError(err instanceof Error ? err : new Error('Failed to load hotels'));
      } finally {
        setLoading(false);
      }
    };

    if (user && profile && profile.is_hotel_owner) {
      loadHotels();
    } else {
      setHotels([]);
      setLoading(false);
    }
  }, [user, profile]);

  return {
    hotels,
    loading,
    error,
    isAdmin: profile?.is_hotel_owner === true
  };
}
