
import React from "react";
import { useParams } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useUserDetail } from "./user-detail/hooks/useUserDetail";
import { UserDetailHeader } from "./user-detail/UserDetailHeader";
import { UserLoadingState } from "./user-detail/UserLoadingState";
import { UserNotFound } from "./user-detail/UserNotFound";
import { DetailCard } from "./user-detail/DetailCard";
import { ProfileSection } from "./user-detail/ProfileSection";
import { BookingsSection } from "./user-detail/BookingsSection";
import { FavoritesSection } from "./user-detail/FavoritesSection";
import { ThemesSection } from "./user-detail/ThemesSection";
import { UserStatsSection } from "./user-detail/UserStatsSection";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminUserDetailView() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const {
    profile,
    bookings,
    favorites,
    themes,
    loading,
    editing,
    setEditing,
    editForm,
    setEditForm,
    handleSaveUserDetails
  } = useUserDetail(id);

  const handleCancelEdit = () => {
    if (profile) {
      // Reset form to original profile data
      setEditForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        is_hotel_owner: profile.is_hotel_owner || false,
        is_active: profile.is_active !== false // Default to true if field doesn't exist
      });
    }
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      await handleSaveUserDetails();
      toast({
        title: "Success",
        description: "User information updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
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
          {editing ? (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleCancelEdit}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" /> Edit User
            </Button>
          )}
        </div>

        {loading ? (
          <UserLoadingState />
        ) : profile ? (
          <div className="space-y-6">
            {/* User Stats */}
            <UserStatsSection bookings={bookings} favorites={favorites} />
            
            {/* User Profile */}
            <DetailCard title="Basic Information">
              <ProfileSection 
                profile={profile} 
                editing={editing} 
                editForm={editForm} 
                setEditForm={setEditForm} 
              />
            </DetailCard>

            {/* Bookings */}
            <DetailCard title="Bookings History">
              <BookingsSection bookings={bookings} />
            </DetailCard>

            {/* Favorite Hotels */}
            <DetailCard title="Favorite Hotels">
              <FavoritesSection favorites={favorites} />
            </DetailCard>

            {/* Preferred Themes */}
            <DetailCard title="Preferred Affinities/Themes">
              <ThemesSection themes={themes} />
            </DetailCard>
          </div>
        ) : (
          <UserNotFound />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
