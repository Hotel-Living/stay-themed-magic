
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { handleApiError } from '@/utils/errorHandling';

interface ProfileFormData {
  first_name: string;
  last_name: string;
  bio?: string;
  avatar_url?: string;
}

interface UseProfileFormOptions {
  initialData: ProfileFormData;
  userId?: string;
}

export function useProfileForm({ initialData, userId }: UseProfileFormOptions) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { updateProfile } = useAuth();
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleAvatarChange = useCallback((url: string) => {
    setFormData(prev => ({ ...prev, avatar_url: url }));
  }, []);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID is required to update profile",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      await updateProfile(formData);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      handleApiError(error, "Profile Update Failed");
    } finally {
      setIsLoading(false);
    }
  }, [formData, userId, toast, updateProfile]);
  
  return {
    formData,
    isLoading,
    handleInputChange,
    handleAvatarChange,
    handleSubmit
  };
}
