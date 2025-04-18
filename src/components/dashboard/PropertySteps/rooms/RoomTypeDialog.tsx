
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploadSection from "./roomTypes/ImageUploadSection";
import RatesSection from "./roomTypes/RatesSection";

interface RoomTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (roomType: any) => void;
  selectedStayLengths: number[];
}

export default function RoomTypeDialog({
  open,
  onOpenChange,
  onSave,
  selectedStayLengths = []
}: RoomTypeDialogProps) {
  const [name, setName] = useState("");
  const [maxOccupancy, setMaxOccupancy] = useState(2);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [amenities, setAmenities] = useState<string[]>([]);
  
  // For image upload functionality
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);
  
  useEffect(() => {
    // Reset form when dialog opens
    if (open) {
      setName("");
      setMaxOccupancy(2);
      setDescription("");
      setImages([]);
      setRoomImages([]);
      setRoomImagePreviews([]);
      
      // Initialize rates based on selected stay lengths
      const initialRates: Record<string, number> = {};
      selectedStayLengths.forEach(length => {
        initialRates[`${length}`] = 0;
      });
      setRates(initialRates);
      
      setAmenities([]);
    }
  }, [open, selectedStayLengths]);
  
  const handleSave = () => {
    const roomType = {
      id: Date.now().toString(), // Generate a unique ID
      name,
      maxOccupancy,
      description,
      images,
      rates,
      amenities
    };
    
    onSave(roomType);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setRoomImages([...roomImages, ...fileArray]);
      
      // Create preview URLs
      const previewURLs = fileArray.map(file => URL.createObjectURL(file));
      setRoomImagePreviews([...roomImagePreviews, ...previewURLs]);
      
      // Update main images array with placeholder URLs for now
      // In a real app you'd upload these and get actual URLs
      setImages([...images, ...previewURLs]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...roomImagePreviews];
    newImages.splice(index, 1);
    setRoomImagePreviews(newImages);
    
    const newRoomImages = [...roomImages];
    newRoomImages.splice(index, 1);
    setRoomImages(newRoomImages);
    
    const newMainImages = [...images];
    newMainImages.splice(index, 1);
    setImages(newMainImages);
  };
  
  const handleRateChange = (duration: number, value: string) => {
    setRates({
      ...rates,
      [`${duration}`]: parseFloat(value) || 0
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-[#690695] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Add Room Type</DialogTitle>
        </DialogHeader>
        
        {/* Room Type Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="room-name" className="text-white">Room Name</Label>
            <Input
              id="room-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Standard Room"
              className="mt-1 bg-[#810586] border-fuchsia-800/30 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="max-occupancy" className="text-white">Max Occupancy</Label>
            <Input
              id="max-occupancy"
              type="number"
              min={1}
              value={maxOccupancy}
              onChange={(e) => setMaxOccupancy(parseInt(e.target.value))}
              className="mt-1 bg-[#810586] border-fuchsia-800/30 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this room type..."
              className="mt-1 bg-[#810586] border-fuchsia-800/30 text-white"
            />
          </div>
          
          <ImageUploadSection 
            roomImages={roomImages} 
            roomImagePreviews={roomImagePreviews}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
          />
          
          <RatesSection 
            stayLengths={selectedStayLengths}
            rates={rates}
            onRateChange={handleRateChange}
          />
          
          <div className="flex justify-end space-x-2 pt-4">
            <DialogClose asChild>
              <button 
                className="px-4 py-2 border border-fuchsia-800/50 rounded-md text-white hover:bg-fuchsia-950/50"
              >
                Cancel
              </button>
            </DialogClose>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-600 rounded-md text-white"
              disabled={!name || !description}
            >
              Save Room Type
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
