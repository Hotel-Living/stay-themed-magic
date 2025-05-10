
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
          // Here's where we fix the issue - making sure the RPC call is correct
          const { data, error: authUserError } = await supabase.rpc(
            "get_user_auth_details", // This is the name of the RPC function in Supabase
            { user_id: id }
          );
          
          // Validate that data exists and is an object before casting
          if (!authUserError && data && typeof data === 'object' && data !== null) {
            // Now it's safe to cast the data to our interface
            setAuthData(data as UserAuthDetails);
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
          .select("favorite_themes")
          .eq("user_id", id)
          .single();

        if (prefsData && prefsData.favorite_themes && prefsData.favorite_themes.length > 0) {
          // Fetch theme names based on IDs
          const { data: themesData, error: themesError } = await supabase
            .from("themes")
            .select("id, name")
            .in("id", prefsData.favorite_themes);

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
    loading,
    editing,
    setEditing,
    editForm,
    setEditForm,
    handleSaveUserDetails
  };
};
