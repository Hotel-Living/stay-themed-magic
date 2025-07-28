
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
      if (process.env.NODE_ENV === 'development') console.log(`Checking admin access for user: ${user.email}`);
      
      const { data, error } = await supabase.rpc('has_role', { role_name: 'admin' });
      
      console.log('Admin check result:', { data, error });
      
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
      console.log('Admin access granted');
      return true;
    } catch (error) {
      console.error('Unexpected error in admin check:', error);
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
