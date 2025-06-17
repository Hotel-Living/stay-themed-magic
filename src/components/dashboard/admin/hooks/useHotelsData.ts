
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHotelsData = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAllHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          profiles:owner_id(
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch hotels",
          variant: "destructive"
        });
        return { data: null, error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error in fetchAllHotels:', error);
      return { data: null, error };
    }
  };

  const fetchPendingHotels = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          profiles:owner_id(
            first_name,
            last_name
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch pending hotels",
          variant: "destructive"
        });
        return;
      }

      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching pending hotels:', error);
      toast({
        title: "Error", 
        description: "Failed to fetch pending hotels",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    hotels,
    loading,
    setHotels,
    fetchAllHotels,
    fetchPendingHotels
  };
};
