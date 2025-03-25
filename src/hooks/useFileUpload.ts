
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadOptions {
  bucketName: string;
  folderPath?: string;
  fileSizeLimit?: number; // in MB
  fileTypes?: string[];
  generateFileName?: (originalName: string, userId: string) => string;
}

interface UseFileUploadReturn {
  isUploading: boolean;
  uploadFile: (file: File, userId: string) => Promise<string | null>;
  error: Error | null;
}

/**
 * Hook for uploading files to Supabase storage
 * @param options Upload configuration options
 * @returns Object with upload state and function
 */
export function useFileUpload(options: FileUploadOptions): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  const {
    bucketName,
    folderPath = '',
    fileSizeLimit = 5, // Default 5MB
    fileTypes = ['image/*'], // Default to images
    generateFileName = defaultFileNameGenerator,
  } = options;

  function defaultFileNameGenerator(fileName: string, userId: string): string {
    const fileExt = fileName.split('.').pop();
    return `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  }

  const uploadFile = async (file: File, userId: string): Promise<string | null> => {
    try {
      setError(null);
      setIsUploading(true);
      
      // Validate file type
      const validType = fileTypes.some(type => {
        if (type.endsWith('/*')) {
          const generalType = type.split('/')[0];
          return file.type.startsWith(`${generalType}/`);
        }
        return file.type === type;
      });
      
      if (!validType) {
        throw new Error(`File type not supported. Please upload: ${fileTypes.join(', ')}`);
      }
      
      // Validate file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > fileSizeLimit) {
        throw new Error(`File size exceeds ${fileSizeLimit}MB limit`);
      }
      
      // Generate a unique file name
      const fileName = generateFileName(file.name, userId);
      
      // Construct the full file path (with folder if provided)
      const filePath = folderPath 
        ? `${folderPath}/${fileName}` 
        : fileName;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      const fileUrl = data.publicUrl;
      
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
  };

  return { isUploading, uploadFile, error };
}
