
import React, { useState, useEffect } from "react";
import { usePropertyImages, UploadedImage } from "@/hooks/usePropertyImages";
import UploadArea from "./Pictures/UploadArea";
import FilesToUpload from "./Pictures/FilesToUpload";
import UploadedImages from "./Pictures/UploadedImages";
import { useTranslation } from "@/hooks/useTranslation";

interface PicturesStepProps {
  formData?: {
    hotelImages?: UploadedImage[];
    mainImageUrl?: string;
  };
  updateFormData?: (field: string, value: any) => void;
}

export default function PicturesStep({ 
  formData = {}, 
  updateFormData = () => {} 
}: PicturesStepProps) {
  const { t } = useTranslation();
  const {
    files,
    uploadedImages,
    uploading,
    addFiles,
    removeFile,
    removeUploadedImage,
    uploadFiles,
    setMainImage
  } = usePropertyImages();

  // Initialize with existing images from formData
  useEffect(() => {
    if (formData.hotelImages && formData.hotelImages.length > 0) {
      // Set the uploaded images from formData if they exist
      const existingImages = formData.hotelImages.map(img => ({
        id: img.id || Date.now().toString(),
        url: img.url,
        isMain: img.isMain || false
      }));
      // This would need to be handled by the hook if we add a setter
    }
  }, [formData.hotelImages]);

  // Update parent formData when images change
  useEffect(() => {
    if (updateFormData) {
      updateFormData('hotelImages', uploadedImages);
      const mainImage = uploadedImages.find(img => img.isMain);
      updateFormData('mainImageUrl', mainImage?.url || '');
    }
  }, [uploadedImages, updateFormData]);

  const handleClearFiles = () => {
    // Clear all files
    files.forEach((_, index) => removeFile(index));
  };

  return (
    <div className="glass-card rounded-xl p-6 space-y-6 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">{t('dashboard.hotelImagesTitle')}</h3>
      
      <UploadArea 
        onFilesSelected={addFiles}
        disabled={uploading}
      />
      
      {files.length > 0 && (
        <FilesToUpload 
          files={files}
          onUpload={uploadFiles}
          onRemove={removeFile}
          isUploading={uploading}
        />
      )}
      
      <UploadedImages 
        images={uploadedImages}
        onRemove={(image) => {
          const index = uploadedImages.findIndex(img => img.url === image.url);
          if (index !== -1) removeUploadedImage(index);
        }}
        onSetMain={(image) => {
          const index = uploadedImages.findIndex(img => img.url === image.url);
          if (index !== -1) setMainImage(index);
        }}
      />
      
      <p className="text-sm text-white/70">
        ⭐ {t('dashboard.selectMainImage')}
      </p>
      
      <p className="text-sm text-white/60">
        {t('dashboard.mainImageNote')}
      </p>
    </div>
  );
}
