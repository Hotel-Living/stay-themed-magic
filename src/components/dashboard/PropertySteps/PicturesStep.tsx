
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
    filesToUpload,
    uploadedImages,
    isUploading,
    uploadProgress,
    handleFileSelect,
    handleUpload,
    clearFiles,
    removeUploadedImage,
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

  return (
    <div className="glass-card rounded-xl p-6 space-y-6 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">{t('hotelImages.title')}</h3>
      
      <UploadArea 
        onFileSelect={handleFileSelect}
        isUploading={isUploading}
      />
      
      {filesToUpload.length > 0 && (
        <FilesToUpload 
          files={filesToUpload}
          onUpload={handleUpload}
          onClear={clearFiles}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
        />
      )}
      
      <UploadedImages 
        images={uploadedImages}
        onRemove={removeUploadedImage}
        onSetMain={setMainImage}
      />
      
      <p className="text-sm text-white/70">
        ⭐ {t('hotelImages.selectMainImage')}
      </p>
      
      <p className="text-sm text-white/60">
        {t('hotelImages.mainImageNote')}
      </p>
    </div>
  );
}
