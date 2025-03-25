
import { useState, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadOptions {
  bucketName: string;
  folderPath?: string;
  fileSizeLimit?: number; // in MB
  fileTypes?: string[];
  generateFileName?: (originalName: string, userId: string) => string;
  onProgress?: (progress: number) => void;
  onBeforeUpload?: (file: File) => boolean | Promise<boolean>;
}

interface UseFileUploadReturn {
  isUploading: boolean;
  progress: number;
  uploadFile: (file: File, userId: string) => Promise<string | null>;
  error: Error | null;
  resetState: () => void;
}

/**
 * Hook for uploading files to Supabase storage
 * @param options Upload configuration options
 * @returns Object with upload state and function
 */
export function useFileUpload(options: FileUploadOptions): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  const {
    bucketName,
    folderPath = '',
    fileSizeLimit = 5, // Default 5MB
    fileTypes = ['image/*'], // Default to images
    generateFileName = defaultFileNameGenerator,
    onProgress,
    onBeforeUpload,
  } = options;

  // Memoize this function as it doesn't depend on state
  const defaultFileNameGenerator = useCallback((fileName: string, userId: string): string => {
    const fileExt = fileName.split('.').pop();
    return `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  }, []);

  /**
   * Reset the upload state (useful after errors or completed uploads)
   */
  const resetState = useCallback(() => {
    setIsUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  /**
   * Validate file against configured constraints
   */
  const validateFile = useCallback((file: File): { valid: boolean; errorMessage?: string } => {
    // Validate file type
    const validType = fileTypes.some(type => {
      if (type.endsWith('/*')) {
        const generalType = type.split('/')[0];
        return file.type.startsWith(`${generalType}/`);
      }
      return file.type === type;
    });
    
    if (!validType) {
      return { 
        valid: false, 
        errorMessage: `File type not supported. Please upload: ${fileTypes.join(', ')}` 
      };
    }
    
    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > fileSizeLimit) {
      return { 
        valid: false, 
        errorMessage: `File size exceeds ${fileSizeLimit}MB limit` 
      };
    }

    return { valid: true };
  }, [fileTypes, fileSizeLimit]);

  // Memoize the upload function to prevent unnecessary recreations
  const uploadFile = useCallback(async (file: File, userId: string): Promise<string | null> => {
    try {
      resetState();
      setIsUploading(true);
      
      // Run custom before-upload validation if provided
      if (onBeforeUpload) {
        const shouldProceed = await onBeforeUpload(file);
        if (!shouldProceed) {
          throw new Error("Upload rejected by custom validation");
        }
      }
      
      // Validate file against constraints
      const validation = validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.errorMessage);
      }
      
      // Set initial progress
      setProgress(10);
      if (onProgress) onProgress(10);
      
      // Generate a unique file name
      const fileName = generateFileName(file.name, userId);
      
      // Construct the full file path (with folder if provided)
      const filePath = folderPath 
        ? `${folderPath}/${fileName}` 
        : fileName;
      
      // Use a more efficient progress simulation that won't cause unnecessary renders
      let progressTimer: NodeJS.Timeout | null = null;
      
      const simulateProgress = () => {
        progressTimer = setInterval(() => {
          setProgress(prev => {
            const newProgress = Math.min(prev + 10, 85);
            if (onProgress) onProgress(newProgress);
            return newProgress;
          });
        }, 300);
      };
      
      simulateProgress();
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);
        
      // Clear progress simulation
      if (progressTimer) {
        clearInterval(progressTimer);
      }
      
      if (uploadError) throw uploadError;
      
      // Set final progress
      setProgress(100);
      if (onProgress) onProgress(100);
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      const fileUrl = data.publicUrl;
      
      // Show success toast
      toast({
        title: "Upload complete",
        description: "Your file has been uploaded successfully.",
      });
      
      return fileUrl;
    } catch (err: any) {
      console.error("Error uploading file:", err);
      setError(err instanceof Error ? err : new Error(err.message || "Upload failed"));
      toast({
        title: "Upload failed",
        description: err.message || "There was a problem uploading your file.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [
    bucketName, 
    folderPath, 
    generateFileName, 
    onBeforeUpload, 
    onProgress, 
    resetState, 
    toast, 
    validateFile
  ]);

  // Return memoized value to prevent unnecessary re-renders of components using this hook
  return useMemo(() => ({ 
    isUploading, 
    progress, 
    uploadFile, 
    error, 
    resetState 
  }), [isUploading, progress, uploadFile, error, resetState]);
}
