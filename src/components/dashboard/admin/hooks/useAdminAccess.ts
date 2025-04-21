
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useAdminAccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminAccess = async () => {
    if (!user) {
      navigate('/login');
      return false;
    }

    try {
      const { data, error } = await supabase.rpc('is_admin', { user_id: user.id });
      
      if (error) {
        console.error('Error checking admin status:', error);
        toast({ 
          title: "Error", 
          description: "Could not verify admin status", 
          variant: "destructive" 
        });
        navigate('/');
        return false;
      }

      if (!data) {
        toast({ 
          title: "Access Denied", 
          description: "You do not have admin privileges", 
          variant: "destructive" 
        });
        navigate('/');
        return false;
      }

      setIsAdmin(true);
      return true;
    } catch (error) {
      console.error('Error in admin check:', error);
      toast({ 
        title: "Error", 
        description: "An unexpected error occurred", 
        variant: "destructive" 
      });
      navigate('/');
      return false;
    }
  };

  return {
    isAdmin,
    checkAdminAccess
  };
};
