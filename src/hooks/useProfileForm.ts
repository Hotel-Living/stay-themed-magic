
import { useState } from 'react';
import { useProfileOperations } from '@/hooks/useProfileOperations';
import { useToast } from '@/hooks/use-toast';

interface ProfileFormData {
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string;
}

interface UseProfileFormProps {
  initialData: ProfileFormData;
  userId: string | undefined;
}

export function useProfileForm({ initialData, userId }: UseProfileFormProps) {
  const { updateProfile } = useProfileOperations();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (url: string) => {
    setFormData(prev => ({ ...prev, avatar_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID is required to update profile",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await updateProfile({ id: userId }, formData);
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

  return {
    formData,
    isLoading,
    handleInputChange,
    handleAvatarChange,
    handleSubmit
  };
}
