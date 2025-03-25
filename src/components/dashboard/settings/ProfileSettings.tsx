
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProfileOperations } from '@/hooks/useProfileOperations';
import { useToast } from '@/hooks/use-toast';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileForm } from './ProfileForm';

export const ProfileSettings = () => {
  const { user, profile } = useAuth();
  const { updateProfile } = useProfileOperations();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (url: string) => {
    setFormData(prev => ({ ...prev, avatar_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(user, formData);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
      
      <div className="space-y-6">
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
    </div>
  );
};

export default ProfileSettings;
