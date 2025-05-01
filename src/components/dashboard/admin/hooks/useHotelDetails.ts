// RUTA: src/components/dashboard/admin/hooks/useHotelDetails.ts

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

export function useHotelDetails(hotelId: string) {
  const [hotel, setHotel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!hotelId) return;

    const fetchHotel = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("hotels")
        .select(`
          *,
          hotel_images(*),
          hotel_themes!hotel_id(theme_id, themes(*)),
          hotel_activities!hotel_id(activity_id, activities(*))
        `)
        .eq("id", hotelId)
        .single();

      if (error) {
        toast({ title: "Error cargando hotel", description: error.message });
      } else {
        setHotel(data);
      }
      setIsLoading(false);
    };

    fetchHotel();
  }, [hotelId, toast]);

  const onApprove = () => {
    toast({ title: "Aprobado", description: "El hotel ha sido aprobado." });
  };

  const onReject = () => {
    toast({ title: "Rechazado", description: "El hotel ha sido rechazado." });
  };

  return { hotel, isLoading, onApprove, onReject };
}
