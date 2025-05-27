
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useMyRoles() {
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyRoles = async () => {
      try {
        const { data, error } = await supabase.rpc('get_my_roles');
        
        if (error) {
          setError(error.message);
          console.error("Error fetching user roles:", error);
        } else {
          setRoles(data?.map(r => r.role) || []);
        }
      } catch (err) {
        setError("Failed to fetch roles");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRoles();
  }, []);

  return { roles, loading, error };
}
