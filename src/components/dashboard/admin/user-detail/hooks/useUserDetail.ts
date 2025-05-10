
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "./user-profile/useUserProfile";
import { useUserAuth } from "./user-profile/useUserAuth";
import { useUserBookings } from "./user-data/useUserBookings";
import { useUserFavorites } from "./user-data/useUserFavorites";
import { useUserThemes } from "./user-data/useUserThemes";
import { useUserEdit } from "./user-edit/useUserEdit";

export const useUserDetail = (id: string | undefined) => {
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();

  // Fetch user profile and auth data
  const { profile, loading: profileLoading } = useUserProfile(id);
  const { authData } = useUserAuth(id);

  // Fetch user-related data
  const { bookings } = useUserBookings(id);
  const { favorites } = useUserFavorites(id);
  const { themes, userPreferences } = useUserThemes(id);

  // Handle user editing
  const { 
    editForm, 
    setEditForm, 
    handleSaveUserDetails 
  } = useUserEdit(id, profile, setEditing, toast);

  // Determine overall loading state
  const loading = profileLoading;

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
