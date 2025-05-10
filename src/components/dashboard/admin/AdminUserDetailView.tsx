
import React from "react";
import { useParams } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useUserDetail } from "./user-detail/hooks/useUserDetail";
import { UserDetailContainer } from "./user-detail/UserDetailContainer";
import { useUserDetailActions } from "./user-detail/hooks/useUserDetailActions";

export default function AdminUserDetailView() {
  const { id } = useParams<{ id: string }>();
  const {
    profile,
    authData,
    bookings,
    favorites,
    themes,
    userPreferences,
    hotels,
    reports,
    referrals,
    reviews,
    loading,
    editing,
    setEditing,
    editForm,
    setEditForm,
    handleSaveUserDetails,
    themesPagination,
    isEmailVerified,
    resendVerificationEmail,
    formattedTotal,
    freeNightsCount,
    usedFreeNights,
    remainingFreeNights,
    rewards,
    isGranting,
    grantFreeNight,
    markRewardAsUsed,
    markRewardAsUnused,
    removeFreeNight,
    isAdmin,
    updateAdminNote
  } = useUserDetail(id);

  const {
    handleCancelEdit,
    handleSave,
    handleResendVerification,
    handleGrantFreeNight,
    handleRemoveFreeNight,
    handleMarkRewardAsUsed,
    handleMarkRewardAsUnused
  } = useUserDetailActions(
    id,
    profile,
    setEditing,
    handleSaveUserDetails,
    resendVerificationEmail,
    grantFreeNight,
    removeFreeNight,
    markRewardAsUsed,
    markRewardAsUnused
  );

  // Explicitly typed wrapper function that guarantees Promise<void> with no implicit returns
  const handleUpdateAdminNote = async (userId: string, note: string): Promise<void> => {
    if (!updateAdminNote) {
      return;
    }
    
    try {
      await updateAdminNote(userId, note);
      // No return statement here - crucial for Promise<void>
    } catch (error) {
      console.error("Error in handleUpdateAdminNote:", error);
      // No return statement here either - ensures Promise<void>
    }
  };

  const detailProps = {
    authData,
    bookings,
    favorites,
    themes,
    userPreferences,
    hotels,
    reports,
    referrals,
    reviews,
    editForm,
    setEditForm,
    themesPagination,
    isEmailVerified,
    formattedTotal,
    freeNightsCount,
    usedFreeNights,
    remainingFreeNights,
    rewards,
    isGranting,
    isAdmin,
    onGrantFreeNight: handleGrantFreeNight,
    onRemoveFreeNight: handleRemoveFreeNight,
    onMarkRewardAsUsed: handleMarkRewardAsUsed,
    onMarkRewardAsUnused: handleMarkRewardAsUnused,
    handleResendVerification,
    updateAdminNote: handleUpdateAdminNote
  };

  return (
    <AdminDashboardLayout>
      <UserDetailContainer
        loading={loading}
        profile={profile}
        editing={editing}
        setEditing={setEditing}
        handleSave={handleSave}
        handleCancelEdit={handleCancelEdit}
        detailProps={detailProps}
      />
    </AdminDashboardLayout>
  );
}
