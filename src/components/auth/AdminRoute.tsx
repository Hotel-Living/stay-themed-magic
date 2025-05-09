
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface AdminRouteProps {
  children: JSX.Element;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, profile } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Call the is_admin RPC function
        const { data, error } = await supabase.rpc('is_admin', { user_id: user.id });
        
        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error("Exception checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  // Redirect to login if not authenticated or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};
