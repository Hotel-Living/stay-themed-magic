
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from '@/hooks/useTranslation';

interface RoomTypesSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [uploadedImages, setUploadedImages] = useState<string[]>(formData.roomImages || []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Validate when images change
  useEffect(() => {
    const isValid = uploadedImages.length > 0;
    onValidationChange(isValid);
  }, [uploadedImages, onValidationChange]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image`);
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large (max 10MB)`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `room-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `rooms/${fileName}`;

        console.log('Uploading to bucket: hotel-images, path:', filePath);

        const { data, error } = await supabase.storage
          .from('hotel-images')
          .upload(filePath, file);

        if (error) {
          console.error('Storage upload error:', error);
          throw new Error(`Upload failed: ${error.message}`);
        }

        console.log('Upload successful:', data);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('hotel-images')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const newImageUrls = await Promise.all(uploadPromises);
      const updatedImages = [...uploadedImages, ...newImageUrls];
      
      setUploadedImages(updatedImages);
      updateFormData('roomImages', updatedImages);
      
      console.log('All images uploaded successfully:', newImageUrls);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageUrl = uploadedImages[index];
    
    try {
      // Extract file path from URL for deletion
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `rooms/${fileName}`;
      
      // Delete from storage
      const { error } = await supabase.storage
        .from('hotel-images')
        .remove([filePath]);
      
      if (error) {
        console.error('Error deleting image:', error);
      }
    } catch (error) {
      console.error('Error removing image from storage:', error);
    }
    
    // Remove from local state regardless of storage deletion result
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    updateFormData('roomImages', updatedImages);
  };

  const isValid = uploadedImages.length > 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          {t('dashboard.roomImages')} *
        </label>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-6 text-center">
          <input
            type="file"
            id="room-images"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
          
          <label
            htmlFor="room-images"
            className={`cursor-pointer flex flex-col items-center space-y-3 ${
              uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-900/20'
            } p-4 rounded-lg transition-colors`}
          >
            {uploading ? (
              <>
                <Upload className="w-8 h-8 text-purple-400 animate-spin" />
                <span className="text-purple-300">Uploading...</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-purple-400" />
                <span className="text-purple-300">{t('dashboard.dragDropPhotos')}</span>
                <span className="text-sm text-purple-400">{t('dashboard.orClickToBrowse')}</span>
              </>
            )}
          </label>
        </div>

        {/* Upload Error */}
        {uploadError && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{uploadError}</span>
          </div>
        )}

        {/* Upload Success Status */}
        {!uploading && uploadedImages.length > 0 && !uploadError && (
          <div className="flex items-center space-x-2 text-green-400 bg-green-900/20 p-3 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">
              {uploadedImages.length} {uploadedImages.length === 1 ? 'image' : 'images'} uploaded successfully
            </span>
          </div>
        )}

        {/* Validation Error */}
        {!isValid && !uploading && uploadedImages.length === 0 && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Please upload at least one room image</span>
          </div>
        )}

        {/* Image Previews */}
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {uploadedImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Room ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-purple-600/30"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* File Requirements */}
        <div className="text-xs text-purple-400 space-y-1">
          <p>• Supported formats: JPG, PNG, WebP</p>
          <p>• Maximum file size: 10MB per image</p>
          <p>• At least one image is required</p>
        </div>
      </div>
    </div>
  );
};
