
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const useAdminAccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAdminAccess = async () => {
    if (!user) {
      navigate('/login');
      return false;
    }

    const { data, error } = await supabase
      .rpc('is_admin', { user_id: user?.id });
    
    if (!data || error) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page",
        variant: "destructive"
      });
      navigate('/');
      return false;
    }
    return true;
  };

  return { checkAdminAccess };
};
