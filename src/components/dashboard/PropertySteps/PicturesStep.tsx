
import React, { useState, useEffect, useRef } from "react";
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
  // Debug incoming formData
  useEffect(() => {
    console.log("PicturesStep: Received formData:", formData);
    console.log("PicturesStep: Received images:", formData.hotelImages);
  }, [formData]);

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local state when formData changes (e.g., when loading existing hotel data)
  useEffect(() => {
    if (formData.hotelImages && formData.hotelImages.length > 0) {
      console.log("PicturesStep: Processing existing images:", formData.hotelImages);
      
      // Filter out any expired blob URLs
      const validImages = formData.hotelImages.filter(img => {
        // If it's a blob URL or marked as a blob, filter it out
        if (img.isBlob || (img.url && img.url.startsWith('blob:'))) {
          console.log("Filtering out blob URL:", img.url);
          return false;
        }
        return true;
      });
      
      console.log("PicturesStep: Valid images after filtering:", validImages);
      setImages(validImages);
    } else {
      setImages([]);
    }
    
    if (formData.mainImageUrl) {
      console.log("PicturesStep: Received main image URL:", formData.mainImageUrl);
      // Only set mainImageUrl if it's not a blob URL
      if (!formData.mainImageUrl.startsWith('blob:')) {
        setMainImageUrl(formData.mainImageUrl);
      } else {
        console.log("Ignoring blob main image URL");
        setMainImageUrl("");
      }
    } else {
      setMainImageUrl("");
    }
  }, [formData.hotelImages, formData.mainImageUrl]);

  // Update parent form data when local state changes
  useEffect(() => {
    console.log("PicturesStep: Updating parent formData with images:", images);
    updateFormData("hotelImages", images);
    updateFormData("mainImageUrl", mainImageUrl);
  }, [images, mainImageUrl, updateFormData]);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleImageUpload = (uploadedImage: UploadedImage) => {
    // Set as main image if it's the first image or if no main image is set
    const isMain = images.length === 0 || !mainImageUrl;
    const newImage = { 
      ...uploadedImage, 
      isMain, 
      name: uploadedImage.name || `image-${Date.now()}`,
      isBlob: uploadedImage.url.startsWith('blob:')
    };
    
    console.log("Adding new image:", newImage);
    setImages(prev => [...prev, newImage]);
    
    if (isMain) {
      setMainImageUrl(uploadedImage.url);
    }
    
    // Remove the file from the files array
    const updatedFiles = files.filter(file => file.name !== (uploadedImage.name || ''));
    setFiles(updatedFiles);
  };

  const handleRemoveImage = (imageToRemove: UploadedImage) => {
    console.log("Removing image:", imageToRemove);
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
    console.log("Setting main image:", image);
    // Update the main image URL
    setMainImageUrl(image.url);
    
    // Update the isMain flag on all images
    const updatedImages = images.map(img => ({
      ...img,
      isMain: img.url === image.url
    }));
    
    setImages(updatedImages);
  };
  
  const handleUpload = () => {
    // Create demo uploaded images from files
    for (const file of files) {
      const fileUrl = URL.createObjectURL(file);
      console.log(`Created blob URL for ${file.name}: ${fileUrl}`);
      handleImageUpload({
        url: fileUrl,
        isMain: images.length === 0,
        name: file.name,
        id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        isBlob: true // Mark as blob URL
      });
    }
    setFiles([]);
  };
  
  const handleSetMainIndex = (index: number) => {
    if (index >= 0 && index < images.length) {
      handleSetMainImage(images[index]);
    }
  };

  const handleRemoveIndex = (index: number) => {
    if (index >= 0 && index < images.length) {
      handleRemoveImage(images[index]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-white">Hotel Images</h3>
      
      <UploadArea onFilesSelected={handleFilesChange} fileInputRef={fileInputRef} />
      
      <FilesToUpload 
        files={files} 
        onUpload={handleUpload} 
        onRemoveFile={(index) => setFiles(files.filter((_, i) => i !== index))} 
      />
      
      <UploadedImages 
        images={images} 
        onRemoveImage={handleRemoveIndex}
        onSetMainImage={handleSetMainIndex}
        mainImageUrl={mainImageUrl}
        onAddMoreClick={triggerFileInput}
        onRemove={handleRemoveImage}
        onSetMain={handleSetMainImage}
      />
      
      {images.length === 0 && (
        <p className="text-sm text-red-300">
          Please upload at least one image for your hotel. The first image will be set as the main image.
        </p>
      )}
    </div>
  );
}
