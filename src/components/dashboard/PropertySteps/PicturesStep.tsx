
import React, { useCallback } from "react";
import { usePropertyImages } from "@/hooks/usePropertyImages";
import { useImageUploadLimiter } from "@/hooks/useImageUploadLimiter";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, Star } from "lucide-react";

interface PicturesStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export default function PicturesStep({ formData, updateFormData }: PicturesStepProps) {
  const { t } = useTranslation();
  
  // Image upload limits
  const imageLimiter = useImageUploadLimiter({
    maxImages: 60,
    maxUploadsPerMinute: 10,
    maxFileSize: 10 * 1024 * 1024 // 10MB
  });

  const {
    files,
    uploadedImages,
    uploading,
    mainImageIndex,
    addFiles,
    removeFile,
    removeUploadedImage,
    uploadFiles,
    setMainImage
  } = usePropertyImages(formData.hotelImages || [], updateFormData);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (selectedFiles.length === 0) return;

    // Validate files
    const { validFiles, errors } = imageLimiter.validateFiles(selectedFiles);
    
    if (errors.length > 0) {
      // Show errors to user (already handled by the limiter)
      return;
    }

    // Check upload limits
    if (!imageLimiter.canUpload(uploadedImages.length, validFiles.length)) {
      return;
    }

    // Add valid files
    addFiles(validFiles);
    imageLimiter.recordUpload(validFiles.length);
    
    // Clear the input
    event.target.value = '';
  }, [addFiles, imageLimiter, uploadedImages.length]);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;
    
    await uploadFiles();
    updateFormData('hotelImages', uploadedImages);
  }, [uploadFiles, updateFormData, uploadedImages, files.length]);

  const handleRemoveImage = useCallback((index: number) => {
    removeUploadedImage(index);
    // Update form data will be handled by the usePropertyImages hook
  }, [removeUploadedImage]);

  const handleSetMainImage = useCallback((index: number) => {
    setMainImage(index);
    updateFormData('mainImageUrl', uploadedImages[index]?.url);
  }, [setMainImage, updateFormData, uploadedImages]);

  const remainingUploads = imageLimiter.getRemainingUploads();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          {t('dashboard.hotelImages')}
        </h3>
        <p className="text-gray-300 text-sm">
          {t('dashboard.uploadAtLeastOneImage')}
        </p>
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-fuchsia-600/50 rounded-lg p-8 text-center bg-fuchsia-950/20">
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <div className="space-y-4">
          <ImagePlus className="mx-auto h-12 w-12 text-fuchsia-400" />
          
          <div>
            <p className="text-white mb-2">{t('dashboard.dragDropPhotos')}</p>
            <Button
              type="button"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="bg-fuchsia-600 hover:bg-fuchsia-700"
              disabled={uploadedImages.length >= imageLimiter.limits.maxImages}
            >
              {t('dashboard.orClickToBrowse')}
            </Button>
          </div>
          
          <div className="text-sm text-gray-400 space-y-1">
            <p>{t('dashboard.imagesCount', { 
              current: uploadedImages.length, 
              max: imageLimiter.limits.maxImages 
            })}</p>
            <p>{t('dashboard.remainingUploads', { remaining: remainingUploads })}</p>
            <p>{t('dashboard.maxFileSize', { 
              size: Math.round(imageLimiter.limits.maxFileSize / (1024 * 1024)) 
            })}</p>
          </div>
        </div>
      </div>

      {/* Selected files (not yet uploaded) */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-white font-medium">{t('dashboard.selectedFiles')}</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-fuchsia-950/30 p-2 rounded">
                <span className="text-white text-sm">{file.name}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFile(index)}
                >
                  <Trash size={14} />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700"
          >
            {uploading ? t('dashboard.uploading') : t('dashboard.uploadPhotos')}
          </Button>
        </div>
      )}

      {/* Uploaded images */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-white font-medium">{t('dashboard.uploadedPhotos')}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={`Hotel image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                
                {/* Main image indicator */}
                {image.isMain && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                    <Star size={12} className="inline mr-1" />
                    {t('dashboard.mainImage')}
                  </div>
                )}
                
                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
                  {!image.isMain && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleSetMainImage(index)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-xs p-1"
                    >
                      <Star size={12} />
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveImage(index)}
                    className="text-xs p-1"
                  >
                    <Trash size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {mainImageIndex === -1 && uploadedImages.length > 0 && (
            <p className="text-yellow-400 text-sm">
              ★ {t('dashboard.selectMainImage')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
