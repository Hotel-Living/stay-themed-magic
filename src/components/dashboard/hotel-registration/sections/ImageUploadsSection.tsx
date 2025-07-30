import React, { useRef, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, RefreshCw, AlertCircle, CheckCircle2, Star } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';
import { useImageUploadReliable } from '@/hooks/useImageUploadReliable';

interface ImageUploadsSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export function ImageUploadsSection({ form }: ImageUploadsSectionProps) {
  const { t } = useTranslation('dashboard/hotel-registration');
  const hotelFileInputRef = useRef<HTMLInputElement>(null);
  const roomFileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    hotelImages,
    roomImages,
    uploadProgress,
    addFiles,
    removeImage,
    setMainImage,
    retryFailedUploads,
    isUploading,
    getAllUploadedUrls,
    limits
  } = useImageUploadReliable();

  // Sync form data with uploaded URLs
  useEffect(() => {
    const { hotel, room } = getAllUploadedUrls();
    form.setValue('photos', { hotel, room });
  }, [hotelImages, roomImages, form, getAllUploadedUrls]);

  const handleFileUpload = (files: FileList | null, type: 'hotel' | 'room') => {
    if (!files) return;
    const fileArray = Array.from(files);
    addFiles(fileArray, type);
  };

  const formatFileSize = (bytes: number): string => {
    return `${Math.round(bytes / 1024)} KB`;
  };

  const renderImageGrid = (images: any[], type: 'hotel' | 'room') => {
    if (images.length === 0) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={image.id || index} className="relative group">
            <div className="relative">
              <img
                src={image.url}
                alt={`${type} photo ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-white/20"
              />
              
              {/* Upload status overlay */}
              {image.uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs">Uploading...</div>
                </div>
              )}
              
              {image.error && (
                <div className="absolute inset-0 bg-red-500/50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
              )}
              
              {image.uploaded && (
                <div className="absolute top-1 left-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              )}

              {/* Main image indicator */}
              {image.isMain && (
                <div className="absolute top-1 left-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {type === 'hotel' && !image.isMain && image.uploaded && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setMainImage(image.id, type)}
                  title="Set as main image"
                >
                  <Star className="h-3 w-3" />
                </Button>
              )}
              
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => removeImage(image.id, type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            {/* File info */}
            <div className="mt-1 text-xs text-white/70">
              {image.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AccordionItem value="image-uploads" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">16</span>
          <span>{t('imageUploads.title')}</span>
          {isUploading() && (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Uploading...
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-6">
          {/* Upload restrictions info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Upload Guidelines</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Maximum {limits.maxHotelImages} hotel photos and {limits.maxRoomImages} room photos</li>
              <li>• Maximum {formatFileSize(limits.maxFileSize)} per photo</li>
              <li>• Only JPG and PNG formats allowed</li>
              <li>• Images are uploaded directly to secure storage</li>
            </ul>
          </div>

          {/* Upload progress */}
          {uploadProgress.uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white">
                <span>Upload Progress</span>
                <span>{uploadProgress.completed}/{uploadProgress.total}</span>
              </div>
              <Progress 
                value={(uploadProgress.completed / uploadProgress.total) * 100} 
                className="w-full"
              />
              {uploadProgress.errors.length > 0 && (
                <div className="text-red-400 text-sm">
                  {uploadProgress.errors[uploadProgress.errors.length - 1]}
                </div>
              )}
            </div>
          )}

          <div className="space-y-8">
            {/* Hotel Photos */}
            <FormField
              control={form.control}
              name="photos.hotel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-base font-semibold">
                    {t('imageUploads.hotelPhotos')} ({hotelImages.length}/{limits.maxHotelImages})
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => hotelFileInputRef.current?.click()}
                          disabled={hotelImages.length >= limits.maxHotelImages || isUploading()}
                          className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-50"
                        >
                          <Upload className="h-4 w-4" />
                          {t('imageUploads.uploadHotelPhotos')}
                        </Button>
                        
                        {hotelImages.some(img => img.error) && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => retryFailedUploads('hotel')}
                            className="flex items-center gap-2 bg-orange-500/20 border-orange-500/30 text-orange-200 hover:bg-orange-500/30"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Retry Failed
                          </Button>
                        )}
                        
                        <input
                          ref={hotelFileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files, 'hotel')}
                        />
                      </div>
                      
                      {renderImageGrid(hotelImages, 'hotel')}
                      
                      {hotelImages.length === 0 && (
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 text-white/40 mx-auto mb-2" />
                          <p className="text-white/60">No hotel photos uploaded yet</p>
                          <p className="text-white/40 text-sm">At least one hotel photo is required</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Room Photos */}
            <FormField
              control={form.control}
              name="photos.room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-base font-semibold">
                    {t('imageUploads.roomPhotos')} ({roomImages.length}/{limits.maxRoomImages})
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => roomFileInputRef.current?.click()}
                          disabled={roomImages.length >= limits.maxRoomImages || isUploading()}
                          className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-50"
                        >
                          <Upload className="h-4 w-4" />
                          {t('imageUploads.uploadRoomPhotos')}
                        </Button>
                        
                        {roomImages.some(img => img.error) && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => retryFailedUploads('room')}
                            className="flex items-center gap-2 bg-orange-500/20 border-orange-500/30 text-orange-200 hover:bg-orange-500/30"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Retry Failed
                          </Button>
                        )}
                        
                        <input
                          ref={roomFileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files, 'room')}
                        />
                      </div>
                      
                      {renderImageGrid(roomImages, 'room')}
                      
                      {roomImages.length === 0 && (
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                          <Upload className="h-6 w-6 text-white/40 mx-auto mb-2" />
                          <p className="text-white/60">No room photos uploaded yet</p>
                          <p className="text-white/40 text-sm">Room photos are optional</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}