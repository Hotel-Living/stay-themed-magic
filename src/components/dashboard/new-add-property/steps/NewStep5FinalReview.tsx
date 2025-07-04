
import React, { useEffect, useState, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from '@/hooks/useTranslation';

interface NewStep5FinalReviewProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const NewStep5FinalReview: React.FC<NewStep5FinalReviewProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Validation logic
  useEffect(() => {
    const hasImages = formData.hotelImages && formData.hotelImages.length > 0;
    const hasAcceptedTerms = formData.termsAccepted === true;

    const isValid = hasImages && hasAcceptedTerms;
    onValidationChange(isValid);
  }, [formData.hotelImages, formData.termsAccepted, onValidationChange]);

  const handleFileSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const uploadImages = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      // Simulate image upload - in production, this would upload to actual storage
      const uploadedUrls = selectedFiles.map((file, index) => 
        URL.createObjectURL(file) // Temporary URL for demo
      );
      
      updateFormData('hotelImages', uploadedUrls);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Failed to upload images:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = formData.hotelImages || [];
    const newImages = currentImages.filter((_: any, i: number) => i !== index);
    updateFormData('hotelImages', newImages);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.finalReview')}</h2>
      </div>

      {/* Hotel Images Upload */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.hotelImages')} <span className="text-red-500">*</span>
        </Label>
        
        <div
          className="border-2 border-dashed border-purple-600 rounded-lg p-8 text-center bg-purple-800/20"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-4">
            <div className="text-white">
              <p className="text-lg">{t('dashboard.dragDropPhotos')}</p>
              <p className="text-sm text-white/60">{t('dashboard.orClickToBrowse')}</p>
            </div>
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelection}
              className="hidden"
              id="image-upload"
            />
            
            <Button
              type="button"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {t('dashboard.uploadPhotos')}
            </Button>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white font-medium">{t('dashboard.selectedFiles')}:</h4>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={index} className="text-white/80 text-sm">
                  {file.name}
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={uploadImages}
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {uploading ? t('dashboard.uploading') || 'Uploading...' : t('dashboard.uploadPhotos')}
            </Button>
          </div>
        )}

        {/* Uploaded Images */}
        {formData.hotelImages && formData.hotelImages.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-white font-medium">
              {t('dashboard.uploadedPhotos')}: {formData.hotelImages.length}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.hotelImages.map((imageUrl: string, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Hotel image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                      {t('dashboard.selectMainImage')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(!formData.hotelImages || formData.hotelImages.length === 0) && (
          <p className="text-yellow-400 text-sm">
            {t('dashboard.uploadAtLeastOneImage')}
          </p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.termsConditions') || 'Terms & Conditions'}
        </Label>
        
        <div className="bg-purple-800/30 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="termsAccepted"
              checked={formData.termsAccepted || false}
              onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
              className="border-purple-600 mt-1"
            />
            <Label htmlFor="termsAccepted" className="text-white text-sm leading-relaxed">
              {t('dashboard.acceptTermsAndConditions')} <span className="text-red-500">*</span>
            </Label>
          </div>
        </div>
      </div>

      {/* Form Summary */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.formSummary') || 'Form Summary'}
        </Label>
        
        <div className="bg-purple-800/20 p-4 rounded-lg space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-white/60">{t('dashboard.propertyForm.hotelName')}:</span>
              <span className="text-white ml-2">{formData.hotelName || 'N/A'}</span>
            </div>
            <div>
              <span className="text-white/60">{t('dashboard.propertyForm.propertyType')}:</span>
              <span className="text-white ml-2">{formData.propertyType || 'N/A'}</span>
            </div>
            <div>
              <span className="text-white/60">{t('dashboard.propertyForm.country')}:</span>
              <span className="text-white ml-2">{formData.country || 'N/A'}</span>
            </div>
            <div>
              <span className="text-white/60">{t('dashboard.propertyForm.city')}:</span>
              <span className="text-white ml-2">{formData.city || 'N/A'}</span>
            </div>
            <div>
              <span className="text-white/60">{t('dashboard.affinities')}:</span>
              <span className="text-white ml-2">{(formData.selectedAffinities || []).length}</span>
            </div>
            <div>
              <span className="text-white/60">{t('dashboard.activities')}:</span>
              <span className="text-white ml-2">{(formData.selectedActivities || []).length}</span>
            </div>
            <div>
              <span className="text-white/60">{t('dashboard.roomTypes')}:</span>
              <span className="text-white ml-2">{(formData.roomTypes || []).length}</span>
            </div>
            <div>
              <span className="text-white/60">{t('dashboard.imagesCount')}:</span>
              <span className="text-white ml-2">{(formData.hotelImages || []).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
