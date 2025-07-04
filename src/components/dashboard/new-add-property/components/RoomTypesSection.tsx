
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from '@/hooks/useTranslation';
import { usePropertyImages } from '@/hooks/usePropertyImages';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RoomTypesSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Initialize uploaded images from formData
  const [roomImages, setRoomImages] = useState<Array<{url: string, uploaded: boolean}>>(
    (formData.roomImages || []).map((url: string) => ({ url, uploaded: true }))
  );

  // Update form data whenever roomImages change
  React.useEffect(() => {
    const uploadedUrls = roomImages.filter(img => img.uploaded).map(img => img.url);
    updateFormData('roomImages', uploadedUrls);
  }, [roomImages, updateFormData]);

  const uploadToStorage = async (file: File): Promise<string> => {
    const fileName = `room-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${file.name.split('.').pop()}`;
    const filePath = `hotel-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('Hotel Images')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('Hotel Images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleRoomImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setUploadingImages(true);
      setUploadError(null);

      try {
        const uploadPromises = files.map(async (file) => {
          // Validate file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`File ${file.name} is too large. Maximum size is 5MB.`);
          }

          // Validate file type
          if (!file.type.startsWith('image/')) {
            throw new Error(`File ${file.name} is not a valid image format.`);
          }

          const uploadedUrl = await uploadToStorage(file);
          return { url: uploadedUrl, uploaded: true };
        });

        const uploadedImages = await Promise.all(uploadPromises);
        
        setRoomImages(prev => [...prev, ...uploadedImages]);
        
        toast({
          title: "Success",
          description: `${files.length} image(s) uploaded successfully.`,
        });

      } catch (error: any) {
        console.error('Upload error:', error);
        setUploadError(error.message);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: error.message,
        });
      } finally {
        setUploadingImages(false);
        // Reset the input so the same file can be selected again if needed
        event.target.value = '';
      }
    }
  };

  const removeRoomImage = (index: number) => {
    setRoomImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRoomDescriptionChange = (value: string) => {
    updateFormData('roomDescription', value);
  };

  return (
    <div className="space-y-6 border border-purple-600/30 rounded-lg p-6">
      {/* Section Header */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">
          3.1— {t('dashboard.propertyForm.roomTypes')}
        </h3>
        <p className="text-white/70 text-sm">
          {t('dashboard.propertyForm.roomTypesDescription')}
        </p>
      </div>

      {/* Fixed Room Type */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">
          {t('dashboard.propertyForm.doubleRoomsCanBeSingle')}
        </h4>

        {/* Room Photos Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.roomPhotos')} *
            </Label>
          </div>
          
          {/* Upload Area */}
          <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-8 text-center bg-purple-800/20">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleRoomImageUpload}
              className="hidden"
              id="room-image-upload"
              disabled={uploadingImages}
            />
            <label htmlFor="room-image-upload" className={`cursor-pointer ${uploadingImages ? 'opacity-50' : ''}`}>
              <Upload className="mx-auto h-8 w-8 text-purple-400 mb-2" />
              <p className="text-white mb-2">{t('dashboard.dragDropPhotos')}</p>
              <p className="text-white/60 text-sm">{t('dashboard.orClickToBrowse')}</p>
              {roomImages.length > 0 && (
                <div className="flex items-center justify-center gap-2 text-green-400 mt-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{roomImages.length} image(s) uploaded</span>
                </div>
              )}
            </label>
          </div>

          {/* Upload Status */}
          {uploadingImages && (
            <div className="text-center py-2">
              <p className="text-purple-400">Uploading images...</p>
            </div>
          )}

          {/* Upload Error */}
          {uploadError && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Uploaded Room Images */}
          {roomImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {roomImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Room ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  {image.uploaded && (
                    <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                  )}
                  <button
                    onClick={() => removeRoomImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Room Description Section */}
        <div className="space-y-2">
          <Label className="text-white font-medium">
            {t('dashboard.propertyForm.roomDescription')} *
          </Label>
          <Textarea
            value={formData.roomDescription || ''}
            onChange={(e) => handleRoomDescriptionChange(e.target.value)}
            placeholder={t('dashboard.propertyForm.roomDescriptionPlaceholder')}
            className="min-h-[120px] bg-purple-800/30 border-purple-600/50 text-white placeholder:text-white/50 resize-none"
          />
          <p className="text-white/60 text-xs">
            {t('dashboard.propertyForm.roomDescriptionNote')}
          </p>
        </div>
      </div>
    </div>
  );
};
