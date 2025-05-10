
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserAuthDetails {
  last_sign_in_at?: string;
  created_at?: string;
  email_confirmed_at?: string;
}

export const useUserAuth = (id: string | undefined) => {
  const [authData, setAuthData] = useState<UserAuthDetails | null>(null);

  useEffect(() => {
    const fetchUserAuthData = async () => {
      if (!id) return;
      
      try {
        // Using a direct fetch for the RPC call instead of supabase.rpc to avoid TypeScript issues
        const response = await fetch(
          "https://pgdzrvdwgoomjnnegkcn.supabase.co/rest/v1/rpc/get_user_auth_details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0",
              "Authorization": `Bearer ${supabase.auth.getSession().then(res => res.data.session?.access_token)}`
            },
            body: JSON.stringify({ user_id: id })
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data === 'object' && data !== null) {
            setAuthData(data as UserAuthDetails);
          }
        }
      } catch (authError) {
        console.error("Error fetching auth user data:", authError);
        // Continue without auth data
      }
    };

    fetchUserAuthData();
  }, [id]);

  return { authData };
};
