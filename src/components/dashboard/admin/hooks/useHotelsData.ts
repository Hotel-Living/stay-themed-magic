
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHotelsData = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAllHotels = async () => {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        profiles:owner_id(
          first_name,
          last_name
        )
      `);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch hotels",
        variant: "destructive"
      });
      return;
    }

    setHotels(data || []);
    setLoading(false);
  };

  const fetchPendingHotels = async () => {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        profiles:owner_id(
          first_name,
          last_name
        )
      `)
      .eq('status', 'pending');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch pending hotels",
        variant: "destructive"
      });
      return;
    }

    setHotels(data || []);
    setLoading(false);
  };

  return {
    hotels,
    loading,
    setHotels,
    fetchAllHotels,
    fetchPendingHotels
  };
};
