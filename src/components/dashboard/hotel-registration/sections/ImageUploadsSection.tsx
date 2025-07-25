import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface ImageUploadsSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export function ImageUploadsSection({ form }: ImageUploadsSectionProps) {
  const { t } = useTranslation('dashboard/hotel-registration');
  const hotelFileInputRef = useRef<HTMLInputElement>(null);
  const roomFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null, type: 'hotel' | 'room') => {
    if (!files) return;

    const currentPhotos = form.getValues('photos') || { hotel: [], room: [] };
    const newFiles = Array.from(files);

    // Convert files to base64 for storage
    const promises = newFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Files) => {
      const updatedPhotos = {
        ...currentPhotos,
        [type]: [...currentPhotos[type], ...base64Files]
      };
      form.setValue('photos', updatedPhotos);
    });
  };

  const removePhoto = (type: 'hotel' | 'room', index: number) => {
    const currentPhotos = form.getValues('photos') || { hotel: [], room: [] };
    const updatedPhotos = {
      ...currentPhotos,
      [type]: currentPhotos[type].filter((_: any, i: number) => i !== index)
    };
    form.setValue('photos', updatedPhotos);
  };

  const photos = form.watch('photos') || { hotel: [], room: [] };

  return (
    <AccordionItem value="image-uploads" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">16</span>
          <span>{t('imageUploads.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-white/70 text-sm">
              {t('imageUploads.description')}
            </p>
          </div>

          <div className="space-y-8">
            {/* Hotel Photos */}
            <FormField
              control={form.control}
              name="photos.hotel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-base font-semibold">{t('imageUploads.hotelPhotos')}</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => hotelFileInputRef.current?.click()}
                          className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Upload className="h-4 w-4" />
                          {t('imageUploads.uploadHotelPhotos')}
                        </Button>
                        <input
                          ref={hotelFileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files, 'hotel')}
                        />
                      </div>
                      
                      {photos.hotel.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {photos.hotel.map((photo: string, index: number) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo}
                                alt={`Hotel photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-white/20"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removePhoto('hotel', index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
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
                  <FormLabel className="text-white text-base font-semibold">{t('imageUploads.roomPhotos')}</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => roomFileInputRef.current?.click()}
                          className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Upload className="h-4 w-4" />
                          {t('imageUploads.uploadRoomPhotos')}
                        </Button>
                        <input
                          ref={roomFileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files, 'room')}
                        />
                      </div>
                      
                      {photos.room.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {photos.room.map((photo: string, index: number) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo}
                                alt={`Room photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-white/20"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removePhoto('room', index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
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