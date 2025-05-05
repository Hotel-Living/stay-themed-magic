
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
  const [initialized, setInitialized] = useState<boolean>(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize state from formData only once when component mounts or when formData first becomes available
  useEffect(() => {
    if (!initialized && formData.hotelImages && formData.hotelImages.length > 0) {
      setImages(formData.hotelImages);
      const mainImage = formData.hotelImages.find(img => img.isMain);
      if (mainImage) {
        setMainImageUrl(mainImage.url);
      } else if (formData.mainImageUrl) {
        setMainImageUrl(formData.mainImageUrl);
      } else if (formData.hotelImages.length > 0) {
        setMainImageUrl(formData.hotelImages[0].url);
      }
      setInitialized(true);
    } else if (!initialized && formData.mainImageUrl && !mainImageUrl) {
      // If we have a main image URL but no images, set the main image URL
      setMainImageUrl(formData.mainImageUrl);
    }
  }, [formData.hotelImages, formData.mainImageUrl, initialized, mainImageUrl]);

  // Update parent form data when local state changes, but only after initialization
  // or when user makes actual changes
  useEffect(() => {
    if (initialized || images.length > 0) {
      updateFormData("hotelImages", images);
      updateFormData("mainImageUrl", mainImageUrl);
    }
  }, [images, mainImageUrl, updateFormData, initialized]);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleImageUpload = (uploadedImage: UploadedImage) => {
    // Set as main image if it's the first image or if no main image is set
    const isMain = images.length === 0 || !mainImageUrl;
    const newImage = {
      ...uploadedImage,
      isMain,
      name: uploadedImage.name || `image-${Date.now()}`
    };
    setImages(prev => [...prev, newImage]);
    if (isMain) {
      setMainImageUrl(uploadedImage.url);
    }

    // Remove the file from the files array
    const updatedFiles = files.filter(file => file.name !== (uploadedImage.name || ''));
    setFiles(updatedFiles);
    if (!initialized) {
      setInitialized(true);
    }
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

  const handleUpload = () => {
    // Create demo uploaded images from files
    for (const file of files) {
      const fileUrl = URL.createObjectURL(file);
      handleImageUpload({
        url: fileUrl,
        isMain: images.length === 0,
        name: file.name,
        id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
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
      <h3 className="font-semibold text-lg text-white">HOTEL IMAGES</h3>
      
      <UploadArea onFilesSelected={handleFilesChange} fileInputRef={fileInputRef} />
      
      <FilesToUpload 
        files={files} 
        onUpload={handleUpload} 
        onRemoveFile={index => setFiles(files.filter((_, i) => i !== index))} 
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
