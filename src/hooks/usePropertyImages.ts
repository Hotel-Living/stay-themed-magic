
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
  name?: string;
  uploaded?: boolean;
  isBlob?: boolean; // Flag to identify blob URLs
}

export function usePropertyImages(initialImages: UploadedImage[] = []) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState<number>(-1);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Update uploaded images when initialImages change (for editing)
  useEffect(() => {
    console.log("usePropertyImages: initialImages updated", initialImages);
    
    if (initialImages && initialImages.length > 0) {
      // Process images to detect and flag blob URLs
      const processedImages = initialImages.map(img => ({
        ...img,
        isBlob: img.url.startsWith('blob:')
      }));
      
      // Filter out any blob URLs which are no longer valid
      const validImages = processedImages.filter(img => {
        if (img.isBlob || img.url.startsWith('blob:')) {
          // For blob URLs, we'll mark them as invalid since they expire across sessions
          console.log(`Filtering out blob URL: ${img.url}`);
          return false;
        }
        return true;
      });
      
      console.log("usePropertyImages: processed valid images", validImages);
      
      setUploadedImages(validImages);
      
      // Set main image index
      const mainIndex = validImages.findIndex(img => img.isMain);
      setMainImageIndex(mainIndex !== -1 ? mainIndex : (validImages.length > 0 ? 0 : -1));
    } else {
      setUploadedImages([]);
      setMainImageIndex(-1);
    }
  }, [initialImages]);

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
  }, [mainImageIndex]);

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) {
      return;
    }
    
    setUploading(true);
    console.log("Starting upload of files:", files);
    
    try {
      // For demo purposes, simulate uploading by creating object URLs
      const newUploadedImages = [...uploadedImages];
      
      for (const file of files) {
        // Create a local URL for the file (this is a demo, not real uploading)
        const fileUrl = URL.createObjectURL(file);
        console.log(`Created blob URL for ${file.name}: ${fileUrl}`);
        
        newUploadedImages.push({
          url: fileUrl,
          isMain: newUploadedImages.length === 0, // First image is main by default
          id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          isBlob: true // Mark as blob URL
        });
      }
      
      console.log("New uploaded images after file processing:", newUploadedImages);
      setUploadedImages(newUploadedImages);
      setFiles([]);
      
      // If it's the first upload, set the first image as main
      if (mainImageIndex === -1 && newUploadedImages.length > 0) {
        setMainImageIndex(0);
      }
    } catch (error: any) {
      console.error("Error uploading files:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "An error occurred while uploading your images."
      });
    } finally {
      setUploading(false);
    }
  }, [files, uploadedImages, mainImageIndex, toast]);
  
  const setMainImage = useCallback((index: number) => {
    console.log(`Setting main image to index ${index}`);
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
