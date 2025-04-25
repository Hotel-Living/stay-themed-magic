
import React, { useState, useEffect } from "react";
import FilesToUpload from "./Pictures/FilesToUpload";
import UploadArea from "./Pictures/UploadArea";
import UploadedImages from "./Pictures/UploadedImages";
import { useToast } from "@/hooks/use-toast";
import { UploadedImage } from "@/hooks/usePropertyImages";

interface PicturesStepProps {
  formData?: {
    hotelImages?: UploadedImage[];
    mainImageUrl?: string;
  };
  updateFormData?: (field: string, value: any) => void;
}

export default function PicturesStep({
  formData = {
    hotelImages: [],
    mainImageUrl: ""
  },
  updateFormData = () => {}
}: PicturesStepProps) {
  const [images, setImages] = useState<UploadedImage[]>(formData.hotelImages || []);
  const [mainImageUrl, setMainImageUrl] = useState<string>(formData.mainImageUrl || "");
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  // Update local state when formData changes (e.g., when loading existing hotel data)
  useEffect(() => {
    if (formData.hotelImages && formData.hotelImages.length > 0) {
      console.log("PicturesStep: Received existing images:", formData.hotelImages);
      setImages(formData.hotelImages);
    }
    
    if (formData.mainImageUrl) {
      console.log("PicturesStep: Received main image URL:", formData.mainImageUrl);
      setMainImageUrl(formData.mainImageUrl);
    }
  }, [formData.hotelImages, formData.mainImageUrl]);

  // Update parent form data when local state changes
  useEffect(() => {
    updateFormData("hotelImages", images);
    updateFormData("mainImageUrl", mainImageUrl);
  }, [images, mainImageUrl, updateFormData]);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleImageUpload = (uploadedImage: UploadedImage) => {
    // Set as main image if it's the first image or if no main image is set
    const isMain = images.length === 0 || !mainImageUrl;
    const newImage = { ...uploadedImage, isMain };
    
    setImages(prev => [...prev, newImage]);
    
    if (isMain) {
      setMainImageUrl(uploadedImage.url);
    }
    
    // Remove the file from the files array
    const updatedFiles = files.filter(file => file.name !== uploadedImage.name);
    setFiles(updatedFiles);
  };

  const handleRemoveImage = (imageToRemove: UploadedImage) => {
    const updatedImages = images.filter(img => img.url !== imageToRemove.url);
    setImages(updatedImages);
    
    // If the removed image was the main image, set a new main image
    if (imageToRemove.isMain && updatedImages.length > 0) {
      const newMainImage = updatedImages[0];
      newMainImage.isMain = true;
      setMainImageUrl(newMainImage.url);
      
      // Update the remaining images to ensure only one is marked as main
      updatedImages.forEach((img, index) => {
        img.isMain = index === 0;
      });
    } else if (updatedImages.length === 0) {
      setMainImageUrl("");
    }
  };

  const handleSetMainImage = (image: UploadedImage) => {
    // Update the main image URL
    setMainImageUrl(image.url);
    
    // Update the isMain flag on all images
    const updatedImages = images.map(img => ({
      ...img,
      isMain: img.url === image.url
    }));
    
    setImages(updatedImages);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-white">Hotel Images</h3>
      
      <UploadArea onFilesSelected={handleFilesChange} />
      
      <FilesToUpload 
        files={files} 
        onUpload={handleImageUpload} 
        onRemove={file => setFiles(files.filter(f => f !== file))} 
      />
      
      <UploadedImages 
        images={images} 
        onRemove={handleRemoveImage}
        onSetMain={handleSetMainImage}
        mainImageUrl={mainImageUrl}
      />
      
      {images.length === 0 && (
        <p className="text-sm text-red-300">
          Please upload at least one image for your hotel. The first image will be set as the main image.
        </p>
      )}
    </div>
  );
}
