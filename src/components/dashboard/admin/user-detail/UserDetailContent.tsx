
import React from "react";
import { DetailCard } from "./DetailCard";
import { ProfileSection } from "./ProfileSection";
import { BookingsSection } from "./BookingsSection";
import { FavoritesSection } from "./FavoritesSection";
import { ThemesSection } from "./ThemesSection";
import { UserStatsSection } from "./UserStatsSection";
import { UserAffinitiesSection } from "./UserAffinitiesSection";
import { UserHotelsSection } from "./UserHotelsSection";
import { UserReportsSection } from "./UserReportsSection";
import { TotalSpentCard } from "./TotalSpentCard";
import { RegistrationInfo } from "./RegistrationInfo";
import { EmailVerificationAlert } from "./EmailVerificationAlert";

interface UserDetailContentProps {
  profile: any;
  authData: any;
  bookings: any[];
  favorites: any[];
  themes: any[];
  userPreferences: any;
  hotels: any[];
  reports: any[];
  editing: boolean;
  editForm: any;
  setEditForm: (form: any) => void;
  themesPagination: any;
  isEmailVerified: boolean | undefined;
  formattedTotal: string;
  handleResendVerification: () => Promise<void>;
}

export const UserDetailContent: React.FC<UserDetailContentProps> = ({
  profile,
  authData,
  bookings,
  favorites,
  themes,
  userPreferences,
  hotels,
  reports,
  editing,
  editForm,
  setEditForm,
  themesPagination,
  isEmailVerified,
  formattedTotal,
  handleResendVerification
}) => {
  return (
    <div className="space-y-6">
      {/* User Registration Info */}
      <RegistrationInfo 
        createdAt={profile.created_at}
        isActive={profile.is_active}
        lastSignInAt={authData?.last_sign_in_at}
      />
      
      {/* Email Verification Status */}
      <EmailVerificationAlert 
        email={profile.email}
        isEmailVerified={isEmailVerified}
        onResendVerification={handleResendVerification}
      />
      
      {/* User Stats */}
      <UserStatsSection bookings={bookings} favorites={favorites} />
      
      {/* Total Amount Spent */}
      <TotalSpentCard formattedTotal={formattedTotal} />
      
      {/* User Reports Section */}
      {reports && reports.length > 0 && (
        <DetailCard title="User Reports">
          <div className="space-y-2">
            <div className="text-sm text-destructive font-semibold mb-2">
              This user has {reports.length} report(s) filed against them:
            </div>
            <UserReportsSection reports={reports} />
          </div>
        </DetailCard>
      )}
      
      {/* User Profile */}
      <DetailCard title="Basic Information">
        <ProfileSection 
          profile={profile} 
          editing={editing} 
          editForm={editForm} 
          setEditForm={setEditForm} 
        />
      </DetailCard>

      {/* User's Hotels - Only shown for hotel owners */}
      {profile.is_hotel_owner && (
        <DetailCard title="Hotels Registered">
          <UserHotelsSection hotels={hotels} />
        </DetailCard>
      )}

      {/* User Affinities/Themes */}
      <DetailCard title="User Affinities">
        <UserAffinitiesSection themes={themes} userPreferences={userPreferences} />
      </DetailCard>

      {/* Bookings */}
      <DetailCard title="Bookings History">
        <BookingsSection bookings={bookings} />
      </DetailCard>

      {/* Favorite Hotels */}
      <DetailCard title="Favorite Hotels">
        <FavoritesSection favorites={favorites} />
      </DetailCard>

      {/* Preferred Themes - Updated with pagination */}
      <DetailCard title="Preferred Affinities/Themes">
        <ThemesSection 
          themes={themes} 
          pagination={themesPagination}
        />
      </DetailCard>
    </div>
  );
};
