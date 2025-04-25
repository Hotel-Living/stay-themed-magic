
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
}

export function usePropertyImages(initialImages: UploadedImage[] = []) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState<number>(
    initialImages.findIndex(img => img.isMain) !== -1 
      ? initialImages.findIndex(img => img.isMain) 
      : initialImages.length > 0 ? 0 : -1
  );
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Update uploaded images when initialImages change (for editing)
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      console.log("usePropertyImages: initialImages updated", initialImages);
      setUploadedImages(initialImages);
      
      // Set main image index
      const mainIndex = initialImages.findIndex(img => img.isMain);
      setMainImageIndex(mainIndex !== -1 ? mainIndex : 0);
    }
  }, [JSON.stringify(initialImages)]); // Use JSON.stringify to compare object arrays

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const removeUploadedImage = useCallback((index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    
    // If removed image was the main image, set first remaining image as main
    if (index === mainImageIndex) {
      setMainImageIndex(prev => (prev > 0 ? 0 : -1));
    } else if (index < mainImageIndex) {
      // Adjust main image index if a previous image was removed
      setMainImageIndex(prev => prev - 1);
    }
    
    // Removed toast message
  }, [mainImageIndex]);

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) {
      // Removed toast message about no files
      return;
    }
    
    setUploading(true);
    
    try {
      // For demo purposes, simulate uploading by creating object URLs
      const newUploadedImages = [...uploadedImages];
      
      for (const file of files) {
        // Create a local URL for the file (this is a demo, not real uploading)
        const fileUrl = URL.createObjectURL(file);
        
        newUploadedImages.push({
          url: fileUrl,
          isMain: newUploadedImages.length === 0, // First image is main by default
          id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        });
      }
      
      setUploadedImages(newUploadedImages);
      setFiles([]);
      
      // If it's the first upload, set the first image as main
      if (mainImageIndex === -1 && newUploadedImages.length > 0) {
        setMainImageIndex(0);
      }
      
      // Removed toast message about successful upload
    } catch (error: any) {
      console.error("Error uploading files:", error);
      // Removed toast message for upload failure
    } finally {
      setUploading(false);
    }
  }, [files, uploadedImages, mainImageIndex]);
  
  const setMainImage = useCallback((index: number) => {
    setUploadedImages(prev => 
      prev.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    );
    setMainImageIndex(index);
  }, []);

  return {
    files,
    uploadedImages,
    uploading,
    mainImageIndex,
    addFiles,
    removeFile,
    removeUploadedImage,
    uploadFiles,
    setMainImage
  };
}
