
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from '@/hooks/useTranslation';
import { usePropertyImages } from '@/hooks/usePropertyImages';
import { Upload, X } from 'lucide-react';

interface RoomTypesSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();
  
  const {
    files: roomFiles,
    uploadedImages: roomImages,
    uploading: roomUploading,
    addFiles: addRoomFiles,
    removeFile: removeRoomFile,
    removeUploadedImage: removeRoomImage,
    uploadFiles: uploadRoomFiles
  } = usePropertyImages(formData.roomImages || [], (field, value) => {
    // Update form data when images change
    if (field === 'mainImageUrl') return; // Skip main image updates for room images
    updateFormData('roomImages', value);
  });

  // Update form data whenever roomImages change
  React.useEffect(() => {
    updateFormData('roomImages', roomImages.map(img => img.url));
  }, [roomImages, updateFormData]);

  const handleRoomImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      addRoomFiles(newFiles);
      
      // Auto-upload immediately after selection
      setTimeout(async () => {
        await uploadRoomFiles();
      }, 100);
    }
  };

  const handleUploadRoomFiles = async () => {
    await uploadRoomFiles();
    // Update form data with room images
    updateFormData('roomImages', roomImages);
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
            />
            <label htmlFor="room-image-upload" className="cursor-pointer">
              <Upload className="mx-auto h-8 w-8 text-purple-400 mb-2" />
              <p className="text-white mb-2">{t('dashboard.dragDropPhotos')}</p>
              <p className="text-white/60 text-sm">{t('dashboard.orClickToBrowse')}</p>
              {roomFiles.length > 0 && (
                <p className="text-purple-400 mt-2">
                  {roomFiles.length} {t('dashboard.propertyForm.photosSelected')}
                </p>
              )}
            </label>
          </div>

          {/* Upload Status */}
          {roomUploading && (
            <div className="text-center py-2">
              <p className="text-purple-400">{t('dashboard.submitting')}...</p>
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
