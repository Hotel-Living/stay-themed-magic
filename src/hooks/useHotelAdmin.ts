
import { useState, useEffect } from 'react';
import { fetchAllHotels } from '@/services/hotelService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useHotelAdmin() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user) {
          throw new Error("You must be logged in to access hotel administration.");
        }
        
        if (!profile || !profile.is_hotel_owner) {
          throw new Error("You don't have permission to access hotel administration.");
        }
        
        const data = await fetchAllHotels();
        console.log("Fetched hotels:", data);
        setHotels(data);
      } catch (err: any) {
        console.error("Failed to load hotels for admin:", err);
        setError(err instanceof Error ? err : new Error('Failed to load hotels'));
        toast({
          title: "Error Loading Hotels",
          description: err.message || "There was a problem loading your hotels.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
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
