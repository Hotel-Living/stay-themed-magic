// RUTA: src/components/dashboard/property/hooks/usePropertyUpdate.ts

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

export function usePropertyUpdate(formData: any) {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { toast } = useToast();

  useEffect(() => {
    if (!editId || !formData?.hotelName) return;

    const updateHotel = async () => {
      const { error } = await supabase
        .from("hotels")
        .update({ ...formData })
        .eq("id", editId);

      if (error) {
        toast({
          title: "Error al actualizar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Propiedad actualizada",
          description: "Los datos se han guardado correctamente",
        });
      }
    };

    updateHotel();
  }, [editId, formData, toast]);
}
