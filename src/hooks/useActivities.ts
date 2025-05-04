
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("name");
      
      if (error) {
        throw error;
      }
      
      return data;
    }
  });
};
