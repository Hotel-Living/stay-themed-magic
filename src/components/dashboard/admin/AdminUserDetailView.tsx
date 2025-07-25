
import React from "react";
import { useParams } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useUserDetail } from "./user-detail/hooks/useUserDetail";
import { UserDetailHeader } from "./user-detail/UserDetailHeader";
import { UserLoadingState } from "./user-detail/UserLoadingState";
import { UserNotFound } from "./user-detail/UserNotFound";
import { ProfileEditActions } from "./user-detail/ProfileEditActions";
import { UserDetailContent } from "./user-detail/UserDetailContent";
import { useToast } from "@/hooks/use-toast";

export default function AdminUserDetailView() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
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
    loading,
    editing,
    setEditing,
    editForm,
    setEditForm,
    handleSaveUserDetails,
    themesPagination,
    formattedTotal,
    freeNightsCount
  } = useUserDetail(id);

  const handleCancelEdit = () => {
    if (profile) {
      // Reset form to original profile data with all required fields
      setEditForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        is_hotel_owner: profile.is_hotel_owner || false,
        is_active: profile.is_active !== false // Default to true if field doesn't exist
      });
    }
    setEditing(false);
  };

  const handleSave = async (): Promise<void> => {
    try {
      await handleSaveUserDetails();
      toast({
        description: "User information updated successfully",
      });
    } catch (error: any) {
      toast({
        description: error.message || "Failed to update user information",
        variant: "destructive"
      });
    }
  };


  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">User Details</h2>
          <ProfileEditActions
            editing={editing}
            setEditing={setEditing}
            handleSave={handleSave}
            handleCancelEdit={handleCancelEdit}
          />
        </div>

        {loading ? (
          <UserLoadingState />
        ) : profile ? (
          <UserDetailContent
            profile={profile}
            authData={authData}
            bookings={bookings}
            favorites={favorites}
            themes={themes}
            userPreferences={userPreferences}
            hotels={hotels}
            reports={reports}
            referrals={referrals}
            editing={editing}
            editForm={editForm}
            setEditForm={setEditForm}
            themesPagination={themesPagination}
            
            formattedTotal={formattedTotal}
            freeNightsCount={freeNightsCount}
            
          />
        ) : (
          <UserNotFound />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
