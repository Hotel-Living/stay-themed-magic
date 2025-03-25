
import React, { useRef, useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploadProps {
  userId: string;
  onFileUploaded: (url: string) => void;
  bucketName: string;
  folderPath?: string;
  fileSizeLimit?: number;
  fileTypes?: string[];
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

// Using memo to prevent unnecessary re-renders
export const FileUpload: React.FC<FileUploadProps> = memo(({
  userId,
  onFileUploaded,
  bucketName,
  folderPath,
  fileSizeLimit = 5,
  fileTypes = ['*/*'],
  buttonText = "Upload File",
  buttonIcon = <Upload className="mr-2 h-4 w-4" />,
  className,
  variant = "outline",
  size = "default",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showProgress, setShowProgress] = useState(false);
  
  const { isUploading, progress, uploadFile, resetState } = useFileUpload({
    bucketName,
    folderPath,
    fileSizeLimit,
    fileTypes,
    onProgress: () => setShowProgress(true),
  });

  // Memoize callback to prevent unnecessary re-renders
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const fileUrl = await uploadFile(file, userId);
      
      if (fileUrl) {
        onFileUploaded(fileUrl);
      }
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
  }, [uploadFile, userId, onFileUploaded, resetState]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Generate accept attribute for file input
  const acceptAttribute = fileTypes.join(',');

  // Use memo for potentially expensive rendering
  const progressIndicator = React.useMemo(() => {
    if (!showProgress) return null;
    
    return (
      <div className="mt-2 w-full">
        <Progress value={progress} className="h-1" />
        <p className="text-xs text-right text-muted-foreground mt-1">
          {progress === 100 ? 'Complete' : `${Math.round(progress)}%`}
        </p>
      </div>
    );
  }, [showProgress, progress]);

  return (
    <div className="w-full">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileSelect} 
        className="hidden" 
        accept={acceptAttribute}
      />
      
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={triggerFileInput}
        className={className}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            {buttonIcon}
            {buttonText}
          </>
        )}
      </Button>
      
      {progressIndicator}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
