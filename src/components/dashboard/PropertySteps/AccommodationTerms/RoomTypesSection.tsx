
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface RoomTypesSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const [roomImagePreviews, setRoomImagePreviews] = React.useState<string[]>(
    formData?.roomImages || []
  );

  const handleDescriptionChange = (value: string) => {
    if (updateFormData) {
      updateFormData('roomDescription', value);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const newPreviews: string[] = [];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const newPreview = e.target.result as string;
            newPreviews.push(newPreview);
            
            if (newPreviews.length === files.length) {
              const updatedPreviews = [...roomImagePreviews, ...newPreviews];
              setRoomImagePreviews(updatedPreviews);
              
              if (updateFormData) {
                updateFormData('roomImages', updatedPreviews);
              }
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = roomImagePreviews.filter((_, i) => i !== index);
    setRoomImagePreviews(updatedPreviews);
    
    if (updateFormData) {
      updateFormData('roomImages', updatedPreviews);
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "room-types" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="room-types" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.1— ROOM TYPES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Define the room type, which can be used as double or individual.</p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="room-description" className="text-white">Room Description</Label>
                <Input
                  id="room-description"
                  value={formData?.roomDescription || ''}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  placeholder="Describe your room type..."
                  className="bg-fuchsia-950/50 border-fuchsia-800/30 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <Label className="text-white">Room Photo(s)</Label>
                <div className="mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Button 
                      type="button" 
                      className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center gap-2"
                      onClick={() => document.getElementById('room-images-upload')?.click()}
                    >
                      <ImagePlus size={16} />
                      Upload Images
                    </Button>
                    <input 
                      id="room-images-upload" 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />
                    <span className="text-xs text-gray-300">
                      {roomImagePreviews.length} {roomImagePreviews.length === 1 ? 'image' : 'images'} selected
                    </span>
                  </div>
                  
                  {roomImagePreviews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {roomImagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={preview} 
                            alt={`Room preview ${index + 1}`} 
                            className="h-20 w-full object-cover rounded-md" 
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <Trash size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 border-2 border-dashed border-fuchsia-800/30 rounded-lg">
                      <p className="text-center text-gray-400">Upload room images here</p>
                      <p className="text-center text-sm text-gray-500 mt-1">This room can be used as double or individual</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RoomTypesSection;
