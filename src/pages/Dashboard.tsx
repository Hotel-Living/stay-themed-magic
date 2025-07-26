import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/entrance');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!profile?.role) {
        navigate('/register-role');
        return;
      }

      // Role-based redirection
      switch (profile.role) {
        case 'guest':
          navigate('/user-dashboard');
          break;
        case 'hotel_owner':
          navigate('/hotel-dashboard');
          break;
        case 'association':
          navigate('/panel-asociacion');
          break;
        case 'promoter':
          navigate('/promoter/dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/user-dashboard');
          break;
      }
    };

    checkAuthAndRedirect();
  }, [navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Redirecting...</div>
    </div>
  );
}