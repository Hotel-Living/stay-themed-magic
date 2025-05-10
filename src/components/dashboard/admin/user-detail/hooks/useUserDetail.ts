
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserAuthDetails {
  last_sign_in_at?: string;
  created_at?: string;
  email_confirmed_at?: string;
}

export const useUserDetail = (id: string | undefined) => {
  const [profile, setProfile] = useState<any>(null);
  const [authData, setAuthData] = useState<UserAuthDetails | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    is_hotel_owner: false,
    is_active: true
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (profileError) throw profileError;
        
        setProfile(profileData);
        
        // Initialize edit form with user data
        setEditForm({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          phone: profileData.phone || "",
          is_hotel_owner: profileData.is_hotel_owner || false,
          is_active: profileData.is_active !== false // Default to true if field doesn't exist
        });

        // Separately fetch user's auth details from auth.users using admin function
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

        // Fetch user bookings with proper join syntax
        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select(`
            *,
            hotel:hotels(name, country, city)
          `)
          .eq("user_id", id);

        if (bookingsError) throw bookingsError;
        setBookings(bookingsData || []);

        // Updated favorites query with proper join
        const { data: favoritesData, error: favoritesError } = await supabase
          .from("favorites")
          .select(`
            id,
            created_at,
            hotel:hotels(name, country, city)
          `)
          .eq("user_id", id);

        if (favoritesError) throw favoritesError;
        setFavorites(favoritesData || []);

        // Fetch user preferences with themes
        const { data: prefsData, error: prefsError } = await supabase
          .from("user_preferences")
          .select("affinities")
          .eq("user_id", id)
          .single();
        
        if (prefsError && prefsError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
          throw prefsError;
        }
        
        // Set preferences even if empty, for UI display
        setUserPreferences(prefsData || { affinities: [] });

        if (prefsData && prefsData.affinities && prefsData.affinities.length > 0) {
          // Fetch theme names based on IDs
          const { data: themesData, error: themesError } = await supabase
            .from("themes")
            .select("id, name")
            .in("id", prefsData.affinities);

          if (themesError) throw themesError;
          setThemes(themesData || []);
        }

      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch user data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, toast]);

  const handleSaveUserDetails = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          phone: editForm.phone,
          is_hotel_owner: editForm.is_hotel_owner,
          is_active: editForm.is_active
        })
        .eq("id", id);

      if (error) throw error;

      // Update the local profile state with the edited data
      setProfile({
        ...profile,
        ...editForm
      });
      
      setEditing(false);
      toast({
        title: "Success",
        description: "User information updated successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error updating user",
        description: error.message || "Failed to update user information",
        variant: "destructive"
      });
      
      throw error;
    }
  };

  return {
    profile,
    authData,
    bookings,
    favorites,
    themes,
    userPreferences,
    loading,
    editing,
    setEditing,
    editForm,
    setEditForm,
    handleSaveUserDetails
  };
};
