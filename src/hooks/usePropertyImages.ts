
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
  storagePath?: string;
}

export function usePropertyImages(
  initialImages: UploadedImage[] = [],
  onChange?: (images: UploadedImage[]) => void
) {
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleAddFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadImages = async () => {
    if (!files.length) return;

    setUploading(true);

    try {
      const newImages: UploadedImage[] = [];
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `hotel-images/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('properties')
          .upload(filePath, file);
        
        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          continue;
        }
        
        const { data: urlData } = supabase.storage
          .from('properties')
          .getPublicUrl(filePath);
        
        const isFirstImage = images.length === 0 && newImages.length === 0;
        
        newImages.push({
          url: urlData.publicUrl,
          isMain: isFirstImage,
          storagePath: filePath
        });
      }
      
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      setFiles([]);
      
      if (onChange) {
        onChange(updatedImages);
      }
      
    } catch (error) {
      console.error('Error in image upload process:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSetMainImage = (index: number) => {
    setImages(prev => 
      prev.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    );
    
    if (onChange) {
      onChange(images.map((img, i) => ({
        ...img,
        isMain: i === index
      })));
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = images[index];
    const wasMain = imageToRemove.isMain;
    
    // Remove the image
    const newImages = images.filter((_, i) => i !== index);
    
    // If the removed image was the main one and we have other images, set the first one as main
    if (wasMain && newImages.length > 0) {
      newImages[0].isMain = true;
    }
    
    setImages(newImages);
    
    if (onChange) {
      onChange(newImages);
    }
    
    // If the image was stored in Supabase, delete it there too
    if (imageToRemove.storagePath) {
      supabase.storage
        .from('properties')
        .remove([imageToRemove.storagePath])
        .then(({ error }) => {
          if (error) {
            console.error('Error removing file from storage:', error);
          }
        });
    }
  };

  return {
    images,
    files,
    uploading,
    handleAddFiles,
    handleRemoveFile,
    handleUploadImages,
    handleSetMainImage,
    handleRemoveImage
  };
}
