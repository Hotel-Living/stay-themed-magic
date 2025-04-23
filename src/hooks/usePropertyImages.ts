
import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
}

export function usePropertyImages(initialImages: UploadedImage[] = []) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState<number>(initialImages.findIndex(img => img.isMain) || 0);
  const { user } = useAuth();
  const { toast } = useToast();

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const removeUploadedImage = useCallback(async (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    
    toast({
      title: "Image removed",
      description: "The image has been removed successfully.",
    });
  }, [toast]);

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) {
      toast({
        title: "No files to upload",
        description: "Please select files first.",
        variant: "destructive",
      });
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
      
      toast({
        title: "Upload successful",
        description: `${files.length} image${files.length > 1 ? 's' : ''} uploaded successfully.`,
      });
    } catch (error: any) {
      console.error("Error uploading files:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your images.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [files, uploadedImages, toast, mainImageIndex]);
  
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
