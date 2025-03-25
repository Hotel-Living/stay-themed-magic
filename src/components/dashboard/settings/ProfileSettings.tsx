
import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProfileOperations } from '@/hooks/useProfileOperations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Camera, Upload } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const ProfileSettings = () => {
  const { user, profile } = useAuth();
  const { updateProfile } = useProfileOperations();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    try {
      setIsUploading(true);
      
      // Check if file is an image and size is reasonable
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        throw new Error('File size exceeds 5MB limit');
      }
      
      // Create a unique file name to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const avatarUrl = data.publicUrl;
      
      // Update formData with the new avatar URL
      setFormData(prev => ({ ...prev, avatar_url: avatarUrl }));
      
      // Update profile with the new avatar URL
      await updateProfile(user, { avatar_url: avatarUrl });
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your profile picture.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Function to get initials for avatar fallback
  const getInitials = () => {
    const first = formData.first_name?.[0] || '';
    const last = formData.last_name?.[0] || '';
    return first + last;
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Profile Photo</label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-2 border-fuchsia-800/30">
                {formData.avatar_url ? (
                  <AvatarImage src={formData.avatar_url} alt="Profile" />
                ) : null}
                <AvatarFallback className="bg-fuchsia-800/30 text-xl font-medium">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              
              <button 
                type="button"
                onClick={triggerFileInput}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
            
            <div className="flex flex-col">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect} 
                className="hidden" 
                accept="image/*"
              />
              <Button
                type="button"
                variant="outline"
                onClick={triggerFileInput}
                className="bg-fuchsia-800/30 hover:bg-fuchsia-700/40 border-fuchsia-800/30"
                size="sm"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: Square JPG or PNG, max 5MB
              </p>
            </div>
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
            className="bg-fuchsia-600 hover:bg-fuchsia-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
