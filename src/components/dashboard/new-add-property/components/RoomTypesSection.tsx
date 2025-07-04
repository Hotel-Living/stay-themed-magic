
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RoomTypesSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function RoomTypesSection({ formData, updateFormData, onValidationChange }: RoomTypesSectionProps) {
  const [roomImages, setRoomImages] = useState<string[]>(formData.roomImages || []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `room-images/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    console.log('Uploading room image to hotel-images bucket:', fileName);
    
    const { data, error } = await supabase.storage
      .from('hotel-images')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading room image:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('hotel-images')
      .getPublicUrl(fileName);

    console.log('Room image uploaded successfully:', publicUrl);
    return publicUrl;
  };

  const handleImageUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);

    try {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      console.log('Starting room image upload for file:', file.name);
      const imageUrl = await uploadImageToStorage(file);
      
      const newImages = [...roomImages, imageUrl];
      setRoomImages(newImages);
      updateFormData('roomImages', newImages);
      
      toast({
        title: "Image uploaded successfully",
        description: "Room photo has been added."
      });

      // Validate immediately after successful upload
      validateRoomSection(newImages);

    } catch (error: any) {
      console.error('Room image upload failed:', error);
      const errorMessage = error.message || 'Upload failed. Please try again.';
      setUploadError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: errorMessage
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = roomImages.filter((_, i) => i !== index);
    setRoomImages(newImages);
    updateFormData('roomImages', newImages);
    validateRoomSection(newImages);
  };

  const validateRoomSection = (images: string[] = roomImages) => {
    const roomDescription = formData.roomDescription || '';
    const hasImages = images.length > 0;
    const hasDescription = roomDescription.trim().length > 0;
    
    const isValid = hasImages && hasDescription;
    onValidationChange(isValid);
  };

  const handleDescriptionChange = (value: string) => {
    updateFormData('roomDescription', value);
    validateRoomSection();
  };

  // Validate on mount
  React.useEffect(() => {
    validateRoomSection();
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Double Room (can be used as single)</h3>
        
        <div className="space-y-4">
          {/* Room Photos Section */}
          <div>
            <Label className="text-white text-base font-medium">
              Room Photos <span className="text-red-400">*</span>
            </Label>
            
            {/* Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center cursor-pointer hover:border-purple-300 transition-colors mt-2"
              onClick={() => document.getElementById('room-image-input')?.click()}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <p className="text-lg font-medium text-white mb-2">
                {uploading ? 'Uploading...' : 'Drag and drop photos here'}
              </p>
              <p className="text-sm text-purple-300">
                or click to browse
              </p>
              
              <input
                id="room-image-input"
                type="file"
                multiple={false}
                accept="image/*"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                className="hidden"
                disabled={uploading}
              />
            </div>

            {/* Upload Error */}
            {uploadError && (
              <div className="mt-2 p-3 bg-red-900/20 border border-red-500 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-400 text-sm">{uploadError}</span>
              </div>
            )}

            {/* Uploaded Images */}
            {roomImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-white font-medium mb-2">Uploaded Images ({roomImages.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {roomImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Room image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Room Description */}
          <div>
            <Label htmlFor="roomDescription" className="text-white text-base font-medium">
              Room Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="roomDescription"
              value={formData.roomDescription || ''}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Describe the room features, amenities, and what makes it special..."
              className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
