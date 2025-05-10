
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "./user-profile/useUserProfile";
import { useUserAuth } from "./user-profile/useUserAuth";
import { useUserBookings } from "./user-data/useUserBookings";
import { useUserFavorites } from "./user-data/useUserFavorites";
import { useUserThemes } from "./user-data/useUserThemes";
import { useUserEdit } from "./user-edit/useUserEdit";
import { useUserHotels } from "./user-data/useUserHotels";

export const useUserDetail = (id: string | undefined) => {
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();

  // Fetch user profile and auth data
  const { profile, loading: profileLoading } = useUserProfile(id);
  const { authData, isEmailVerified, resendVerificationEmail } = useUserAuth(id);

  // Fetch user-related data
  const { bookings } = useUserBookings(id);
  const { favorites } = useUserFavorites(id);
  const { themes, userPreferences, totalThemes, page, setPage, hasMore } = useUserThemes(id, {
    enabled: true,
    pageSize: 10
  });

  // Fetch hotel data if user is a hotel owner
  const { hotels } = useUserHotels(id, profile?.is_hotel_owner);

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
    hotels,
    loading,
    editing,
    setEditing,
    editForm,
    setEditForm,
    handleSaveUserDetails,
    themesPagination: {
      page,
      totalThemes,
      hasMore,
      setPage,
      pageSize: 10
    },
    isEmailVerified,
    resendVerificationEmail
  };
};
