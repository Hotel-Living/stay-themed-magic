import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProfileOperations } from '@/hooks/useProfileOperations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const ProfileSettings = () => {
  const { user, profile } = useAuth();
  const { updateProfile } = useProfileOperations();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    bio: profile?.bio || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Profile Photo</label>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-fuchsia-800/30 flex items-center justify-center text-lg font-medium">
              {profile?.first_name?.[0]}{profile?.last_name?.[0]}
            </div>
            <button className="ml-4 px-3 py-1 text-sm bg-fuchsia-800/30 hover:bg-fuchsia-700/40 rounded-lg transition-colors">
              Upload Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input 
              type="text" 
              name="first_name"
              className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input 
              type="text" 
              name="last_name"
              className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <Input 
            type="email" 
            className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            value={user?.email || ''}
            disabled
          />
          <p className="text-xs text-muted-foreground mt-1">Your email address is verified and cannot be changed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea 
            className="w-full px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 h-24"
            placeholder="Tell us a bit about yourself"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="pt-4">
          <Button 
            type="submit"
            className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
