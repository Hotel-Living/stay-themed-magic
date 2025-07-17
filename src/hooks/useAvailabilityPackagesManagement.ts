import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AvailabilityPackage } from '@/types/availability-package';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useAvailabilityPackagesManagement() {
  const [packages, setPackages] = useState<AvailabilityPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuth();
  const { toast } = useToast();

  const fetchPackages = async () => {
    if (!profile?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      // Fetch packages for hotels owned by the current user
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('id')
        .eq('owner_id', profile.id);

      if (hotelError) {
        throw hotelError;
      }

      if (!hotelData || hotelData.length === 0) {
        setPackages([]);
        return;
      }

      const hotelIds = hotelData.map(hotel => hotel.id);

      const { data, error: queryError } = await supabase
        .from('availability_packages')
        .select('*')
        .in('hotel_id', hotelIds)
        .order('start_date', { ascending: true });

      if (queryError) {
        throw queryError;
      }

      setPackages(data || []);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const createPackage = async (packageData: Omit<AvailabilityPackage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('availability_packages')
        .insert(packageData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Package Created",
        description: "Availability package has been created successfully.",
      });

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create package';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updatePackage = async (id: string, updates: Partial<AvailabilityPackage>) => {
    try {
      const { data, error } = await supabase
        .from('availability_packages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Package Updated",
        description: "Availability package has been updated successfully.",
      });

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update package';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('availability_packages')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Package Deleted",
        description: "Availability package has been deleted successfully.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete package';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [profile?.id]);

  return {
    packages,
    isLoading,
    error,
    refetch: fetchPackages,
    createPackage,
    updatePackage,
    deletePackage
  };
}