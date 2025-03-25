
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileForm } from './ProfileForm';
import { useProfileForm } from '@/hooks/useProfileForm';

export const ProfileSettings = () => {
  const { user, profile } = useAuth();
  
  const initialData = React.useMemo(() => ({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || '',
  }), [profile]);
  
  const {
    formData,
    isLoading,
    handleInputChange,
    handleAvatarChange,
    handleSubmit
  } = useProfileForm({
    initialData,
    userId: user?.id
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
      
      <ProfileAvatar 
        user={user} 
        avatarUrl={formData.avatar_url} 
        onAvatarChange={handleAvatarChange} 
      />
      
      <ProfileForm
        formData={formData}
        userEmail={user?.email}
        isLoading={isLoading}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProfileSettings;
