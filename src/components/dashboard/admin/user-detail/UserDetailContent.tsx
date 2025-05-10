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
import { UserReferralsSection } from "./UserReferralsSection";
import { TotalSpentCard } from "./TotalSpentCard";
import { FreeNightsCard } from "./FreeNightsCard";
import { RegistrationInfo } from "./RegistrationInfo";
import { EmailVerificationAlert } from "./EmailVerificationAlert";
import { UserReviewsSection } from "./UserReviewsSection";
import { AdminNoteSection } from "./AdminNoteSection";
import { type UserReview } from "./hooks/user-data/useUserReviews";

interface UserDetailContentProps {
  profile: any;
  authData: any;
  bookings: any[];
  favorites: any[];
  themes: any[];
  userPreferences: any;
  hotels: any[];
  reports: any[];
  referrals: any[];
  reviews: UserReview[];
  editing: boolean;
  editForm: any;
  setEditForm: (form: any) => void;
  themesPagination: any;
  isEmailVerified: boolean | undefined;
  formattedTotal: string;
  freeNightsCount: number;
  usedFreeNights: number;
  remainingFreeNights: number;
  rewards?: any[];
  isGranting?: boolean;
  isAdmin?: boolean;
  onGrantFreeNight?: (quantity: number) => Promise<void>;
  onRemoveFreeNight?: (rewardId: string) => Promise<void>;
  onMarkRewardAsUsed?: (rewardId: string) => Promise<void>;
  onMarkRewardAsUnused?: (rewardId: string) => Promise<void>;
  handleResendVerification: () => Promise<void>;
  updateAdminNote?: (userId: string, note: string) => Promise<void>;
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
  referrals,
  reviews,
  editing,
  editForm,
  setEditForm,
  themesPagination,
  isEmailVerified,
  formattedTotal,
  freeNightsCount,
  usedFreeNights = 0,
  remainingFreeNights = 0,
  rewards = [],
  isGranting = false,
  isAdmin = false,
  onGrantFreeNight,
  onRemoveFreeNight,
  onMarkRewardAsUsed,
  onMarkRewardAsUnused,
  handleResendVerification,
  updateAdminNote
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
      
      {/* Admin Note Section */}
      {isAdmin && updateAdminNote && (
        <DetailCard title="Admin Notes">
          <AdminNoteSection 
            profileId={profile.id} 
            initialNote={profile.admin_note} 
            onUpdateNote={updateAdminNote} 
          />
        </DetailCard>
      )}
      
      {/* User Stats */}
      <UserStatsSection bookings={bookings} favorites={favorites} />
      
      {/* Total Amount Spent */}
      <TotalSpentCard formattedTotal={formattedTotal} />
      
      {/* Free Nights Redeemed */}
      <FreeNightsCard 
        freeNightsCount={freeNightsCount}
        usedFreeNights={usedFreeNights}
        remainingFreeNights={remainingFreeNights}
        rewards={rewards}
        isAdmin={isAdmin}
        isGranting={isGranting}
        onGrant={onGrantFreeNight}
        onRemove={onRemoveFreeNight}
        onMarkUsed={onMarkRewardAsUsed}
        onMarkUnused={onMarkRewardAsUnused}
      />
      
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
      
      {/* Hotel Referrals Section */}
      {referrals && referrals.length > 0 && (
        <DetailCard title="Hotel Referrals">
          <div className="space-y-2">
            <div className="text-sm font-medium mb-2">
              This user has referred {referrals.length} hotel(s) to the platform:
            </div>
            <UserReferralsSection referrals={referrals} />
          </div>
        </DetailCard>
      )}
      
      {/* User Reviews Section */}
      <DetailCard title="User Reviews">
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">
            {reviews && reviews.length > 0 
              ? `This user has submitted ${reviews.length} review(s):`
              : "This user hasn't submitted any reviews yet."}
          </div>
          <UserReviewsSection reviews={reviews || []} />
        </div>
      </DetailCard>
      
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
