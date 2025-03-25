
import React, { useRef, useState, useCallback, memo } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2, Camera, Upload } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Progress } from '@/components/ui/progress';
import { FileUpload } from '@/components/ui/file-upload';

interface ProfileAvatarProps {
  user: User | null;
  avatarUrl: string;
  onAvatarChange: (url: string) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = memo(({ 
  user, 
  avatarUrl, 
  onAvatarChange 
}) => {
  const { toast } = useToast();
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Function to get initials for avatar fallback - memoized
  const getInitials = useCallback(() => {
    const fullName = user?.user_metadata?.full_name || '';
    return fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
  }, [user?.user_metadata?.full_name]);

  // Handle successful file upload
  const handleFileUploaded = useCallback((url: string) => {
    onAvatarChange(url);
    
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated successfully.",
    });
  }, [onAvatarChange, toast]);

  const handleProgress = useCallback((value: number) => {
    setProgress(value);
    setShowProgress(true);
    
    if (value === 100) {
      // Hide progress after a delay
      setTimeout(() => {
        setShowProgress(false);
      }, 1500);
    }
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Profile Photo</label>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-2 border-fuchsia-800/30">
            {avatarUrl ? (
              <AvatarImage 
                src={avatarUrl} 
                alt="Profile" 
                loading="lazy"
              />
            ) : null}
            <AvatarFallback className="bg-fuchsia-800/30 text-xl font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FileUpload
              userId={user?.id || ''}
              onFileUploaded={handleFileUploaded}
              bucketName="avatars"
              folderPath="avatars"
              fileSizeLimit={5}
              fileTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
              buttonText=""
              buttonIcon={<Camera className="w-6 h-6 text-white" />}
              variant="ghost"
              className="w-full h-full p-0 bg-transparent hover:bg-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-col w-full">
          <FileUpload
            userId={user?.id || ''}
            onFileUploaded={handleFileUploaded}
            bucketName="avatars"
            folderPath="avatars"
            fileSizeLimit={5}
            fileTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
            buttonText="Upload Photo"
            buttonIcon={<Upload className="mr-2 h-4 w-4" />}
            variant="outline"
            className="bg-fuchsia-800/30 hover:bg-fuchsia-700/40 border-fuchsia-800/30"
            size="sm"
          />
          
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: Square JPG or PNG, max 5MB
          </p>
        </div>
      </div>
    </div>
  );
});

ProfileAvatar.displayName = 'ProfileAvatar';
