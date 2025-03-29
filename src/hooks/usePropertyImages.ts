
import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
}

export function usePropertyImages() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState<number>(-1);
  const { user } = useAuth();
  const { toast } = useToast();

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const removeUploadedImage = useCallback(async (index: number) => {
    const imageToRemove = uploadedImages[index];
    
    // If this is a placeholder, just remove from state
    if (!imageToRemove.url.startsWith('http')) {
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
      return;
    }
    
    try {
      // Extract the file path from the URL
      const imagePath = imageToRemove.url.split('/').pop();
      
      if (imagePath) {
        await supabase.storage
          .from('hotel-images')
          .remove([imagePath]);
        
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
        
        toast({
          title: "Image removed",
          description: "The image has been removed successfully.",
        });
      }
    } catch (error) {
      console.error("Error removing image:", error);
      toast({
        title: "Error removing image",
        description: "There was a problem removing the image.",
        variant: "destructive",
      });
    }
  }, [uploadedImages, toast]);

  const uploadFiles = useCallback(async () => {
    if (!user || files.length === 0) return;
    
    setUploading(true);
    
    try {
      const newUploadedImages = [...uploadedImages];
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { data, error } = await supabase.storage
          .from('hotel-images')
          .upload(filePath, file);
        
        if (error) {
          throw error;
        }
        
        const { data: urlData } = supabase.storage
          .from('hotel-images')
          .getPublicUrl(data.path);
          
        newUploadedImages.push({
          url: urlData.publicUrl,
          isMain: false
        });
      }
      
      setUploadedImages(newUploadedImages);
      setFiles([]);
      
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
  }, [user, files, uploadedImages, toast]);
  
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
