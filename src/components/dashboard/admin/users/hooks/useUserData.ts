
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  first_name?: string;
  last_name?: string;
  is_hotel_owner?: boolean;
  is_active?: boolean;
  created_at: string;
  hotels?: any;
  email?: string;
  role?: string;
}

export function useUserData(page: number, limit: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // First, get the total count for pagination
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' });

        if (countError) {
          throw countError;
        }

        setTotalCount(count || 0);

        // Then fetch the current page of users
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*, hotels(name, city)')
          .range(from, to);

        if (error) {
          throw error;
        }

        setUsers(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch users",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, toast]);

  return { users, loading, totalCount };
}
