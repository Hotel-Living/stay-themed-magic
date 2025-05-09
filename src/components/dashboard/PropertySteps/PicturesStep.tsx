
import React, { useState, useEffect, useRef } from "react";
import FilesToUpload from "./Pictures/FilesToUpload";
import UploadArea from "./Pictures/UploadArea";
import UploadedImages from "./Pictures/UploadedImages";
import { useToast } from "@/hooks/use-toast";
import { UploadedImage, usePropertyImages } from "@/hooks/usePropertyImages";

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
  const [initialized, setInitialized] = useState<boolean>(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the hook with the updateFormData function
  const {
    files,
    uploadedImages: images,
    uploading,
    mainImageIndex,
    addFiles: handleFilesChange,
    removeFile: handleRemoveFile,
    removeUploadedImage: handleRemoveIndex,
    uploadFiles: handleUpload,
    setMainImage: handleSetMainIndex
  } = usePropertyImages(formData.hotelImages || [], updateFormData);

  // Initialize state from formData only once when component mounts or when formData first becomes available
  useEffect(() => {
    if (!initialized && formData.hotelImages && formData.hotelImages.length > 0) {
      // Mark as initialized since the hook will handle the initial state
      setInitialized(true);
    }
  }, [formData.hotelImages, initialized]);

  // Update parent form data when local state changes
  useEffect(() => {
    if (initialized || images.length > 0) {
      updateFormData("hotelImages", images);
    }
  }, [images, updateFormData, initialized]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-white">HOTEL IMAGES</h3>
      
      <UploadArea onFilesSelected={handleFilesChange} fileInputRef={fileInputRef} />
      
      <FilesToUpload 
        files={files} 
        onUpload={handleUpload} 
        onRemoveFile={handleRemoveFile} 
      />
      
      <UploadedImages 
        images={images} 
        onRemoveImage={handleRemoveIndex} 
        onSetMainImage={handleSetMainIndex} 
        mainImageUrl={images.length > 0 && mainImageIndex >= 0 ? images[mainImageIndex].url : ""} 
        onAddMoreClick={triggerFileInput} 
      />
      
      {images.length === 0 && (
        <p className="text-sm text-red-300">
          Please upload at least one image for your hotel. The first image will be set as the main image.
        </p>
      )}
    </div>
  );
}
