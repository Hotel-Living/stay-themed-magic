
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

export default function AdminUserDetailView() {
  const { id } = useParams<{ id: string }>();
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

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <UserDetailHeader 
          editing={editing} 
          handleSaveUserDetails={handleSaveUserDetails} 
          setEditing={setEditing} 
        />

        {loading ? (
          <UserLoadingState />
        ) : profile ? (
          <div className="space-y-6">
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
