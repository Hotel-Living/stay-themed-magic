
import React, { useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2, Camera, Upload } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Progress } from '@/components/ui/progress';

interface ProfileAvatarProps {
  user: User | null;
  avatarUrl: string;
  onAvatarChange: (url: string) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  user, 
  avatarUrl, 
  onAvatarChange 
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showProgress, setShowProgress] = useState(false);
  const { isUploading, progress, uploadFile, resetState } = useFileUpload({
    bucketName: 'avatars',
    folderPath: 'avatars',
    fileSizeLimit: 5, // 5MB
    fileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    onProgress: () => setShowProgress(true),
    onBeforeUpload: (file) => {
      // Optional custom validation
      const img = new Image();
      const promise = new Promise<boolean>((resolve) => {
        img.onload = () => {
          // Validate image dimensions if needed
          // For example, ensure it's square
          const isSquarish = Math.abs(img.width - img.height) < 100;
          if (!isSquarish) {
            toast({
              title: "Image not ideal",
              description: "For best results, please use a square image.",
              variant: "destructive",
            });
          }
          resolve(true); // We still allow the upload even if not square
        };
        img.onerror = () => {
          resolve(false);
        };
      });
      
      img.src = URL.createObjectURL(file);
      return promise;
    }
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    try {
      const avatarUrl = await uploadFile(file, user.id);
      
      if (avatarUrl) {
        // Update parent component with the new avatar URL
        onAvatarChange(avatarUrl);
        
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated successfully.",
        });
      }
    } catch (error) {
      // Error handling is done in the hook
      console.error("Error in handleFileSelect:", error);
    } finally {
      // Reset file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Hide progress after a delay
      setTimeout(() => {
        setShowProgress(false);
        resetState();
      }, 1500);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Function to get initials for avatar fallback
  const getInitials = () => {
    const fullName = user?.user_metadata?.full_name || '';
    return fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Profile Photo</label>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-2 border-fuchsia-800/30">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt="Profile" />
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
        
        <div className="flex flex-col w-full">
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
          
          {showProgress && (
            <div className="mt-2 w-full">
              <Progress value={progress} className="h-1 bg-fuchsia-950/30" />
              <p className="text-xs text-right text-muted-foreground mt-1">
                {progress === 100 ? 'Complete' : `${Math.round(progress)}%`}
              </p>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: Square JPG or PNG, max 5MB
          </p>
        </div>
      </div>
    </div>
  );
};
