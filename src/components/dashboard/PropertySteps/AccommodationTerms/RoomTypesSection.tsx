import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RoomTypesSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  
  // Simple local state without circular dependencies
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);
  const [roomDescription, setRoomDescription] = useState("");

  // Simple validation - no infinite loops
  React.useEffect(() => {
    const isValid = roomDescription.trim().length > 0;
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [roomDescription, onValidationChange]);

  // Update form data only when user makes changes (not on every render)
  const handleDescriptionChange = (value: string) => {
    setRoomDescription(value);
    if (updateFormData) {
      updateFormData('roomDescription', value);
    }
  };

  const handleImagesUpdate = (newImages: File[], newPreviews: string[]) => {
    setRoomImages(newImages);
    setRoomImagePreviews(newPreviews);
    if (updateFormData) {
      updateFormData('roomImages', newImages);
      updateFormData('roomImagePreviews', newPreviews);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...roomImages, ...files];
    const newPreviews = [...roomImagePreviews];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        // Use the helper function to prevent loops
        handleImagesUpdate(newImages, [...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
    
    // Update images immediately
    handleImagesUpdate(newImages, newPreviews);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = roomImages.filter((_, i) => i !== index);
    const newPreviews = roomImagePreviews.filter((_, i) => i !== index);
    handleImagesUpdate(newImages, newPreviews);
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "room-types" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="room-types" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.1— ROOM TYPES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <p className="text-muted-foreground">Configure your room types and capacity:</p>
            
            {/* Room Type Title */}
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-foreground">
                {t('dashboard.accommodation.doubleRoomsCanBeSingle')}
              </h4>
            </div>
            
            {/* Room Photos Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                {t('dashboard.accommodation.roomPhotos')}
              </Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('room-photos-upload')?.click()}
                    className="flex items-center gap-2"
                  >
                    <ImagePlus size={16} />
                    Upload Photos
                  </Button>
                  <input 
                    id="room-photos-upload" 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                  <span className="text-xs text-muted-foreground">
                    {roomImages.length} {roomImages.length === 1 ? 'photo' : 'photos'} selected
                  </span>
                </div>
                
                {/* Image previews */}
                {roomImagePreviews.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {roomImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Room preview ${index + 1}`} 
                          className="h-20 w-full object-cover rounded-md border" 
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Trash size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Room Description */}
            <div className="space-y-3">
              <Label htmlFor="room-description" className="text-sm font-medium text-foreground">
                {t('dashboard.accommodation.roomDescription')}
              </Label>
              <Textarea
                id="room-description"
                value={roomDescription}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder={t('dashboard.accommodation.roomDescriptionPlaceholder')}
                className="min-h-[100px] resize-vertical"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                This description will be shown to guests in your hotel's public listing
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RoomTypesSection;
