
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";
import { ImagePlus, Trash } from "lucide-react";

interface RoomTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (roomType: any) => void;
  availableStayLengths?: number[];
}

export default function RoomTypeDialog({ 
  isOpen, 
  onClose, 
  onAdd,
  availableStayLengths = [] 
}: RoomTypeDialogProps) {
  const [newRoomType, setNewRoomType] = useState("");
  const [maxOccupancy, setMaxOccupancy] = useState(1);
  const [roomSize, setRoomSize] = useState(200);
  const [description, setDescription] = useState("");
  const [rates, setRates] = useState<Record<number, number>>({});
  const [stayLengths, setStayLengths] = useState<number[]>(availableStayLengths);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);
  
  // Get the latest stay lengths on open
  useEffect(() => {
    if (isOpen) {
      // First try to use the provided lengths
      if (availableStayLengths && availableStayLengths.length > 0) {
        setStayLengths(availableStayLengths);
      } else {
        // Fallback to getting from localStorage
        const storedLengths = getSelectedStayLengths();
        if (storedLengths && storedLengths.length > 0) {
          setStayLengths(storedLengths);
        }
      }
    }
  }, [isOpen, availableStayLengths]);

  const handleAddRoomType = () => {
    if (newRoomType.trim()) {
      onAdd({
        id: Date.now().toString(),
        name: newRoomType,
        maxOccupancy,
        size: roomSize,
        description,
        baseRate: 0,
        rates,
        images: roomImagePreviews
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setNewRoomType("");
    setMaxOccupancy(1);
    setRoomSize(200);
    setDescription("");
    setRates({});
    setRoomImages([]);
    setRoomImagePreviews([]);
  };

  const handleRateChange = (duration: number, value: string) => {
    setRates(prev => ({
      ...prev,
      [duration]: parseInt(value) || 0
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setRoomImages(prev => [...prev, ...newFiles]);
      
      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setRoomImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setRoomImages(prev => prev.filter((_, i) => i !== index));
    
    // Also remove the preview and revoke the object URL to free memory
    const urlToRevoke = roomImagePreviews[index];
    URL.revokeObjectURL(urlToRevoke);
    setRoomImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#430453] text-black max-w-[80%] w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New Room Type</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm text-white">Room Type</Label>
            <Input 
              className="col-span-3 bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white"
              value={newRoomType}
              onChange={(e) => setNewRoomType(e.target.value)}
              placeholder="e.g. Double Room, Suite, etc."
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm text-white">Max Occupancy</Label>
            <Input 
              className="col-span-3 bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white"
              type="number"
              min="1"
              value={maxOccupancy}
              onChange={(e) => setMaxOccupancy(parseInt(e.target.value) || 1)}
              placeholder="Maximum number of guests"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm text-white">Room Size (sq. ft.)</Label>
            <Input 
              className="col-span-3 bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white"
              type="number"
              min="0"
              value={roomSize}
              onChange={(e) => setRoomSize(parseInt(e.target.value) || 0)}
              placeholder="Room size in square feet"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm text-white">Description</Label>
            <textarea 
              className="col-span-3 bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Brief description of the room"
            />
          </div>
          
          {/* Room Images Upload Section */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right text-sm text-white">Room Images</Label>
            <div className="col-span-3">
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
                  {roomImages.length} {roomImages.length === 1 ? 'image' : 'images'} selected
                </span>
              </div>
              
              {/* Image previews */}
              {roomImagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
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
              )}
            </div>
          </div>
          
          {/* Rates section for different stay lengths */}
          <div className="col-span-4 mt-2">
            <h4 className="font-medium text-white mb-2">RATES FOR STAY DURATIONS</h4>
            
            {stayLengths.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {stayLengths.map(duration => (
                  <div key={duration} className="mb-2">
                    <Label className="text-sm text-white">{duration} Days</Label>
                    <Input 
                      className="w-full bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white mt-1"
                      type="number"
                      min="0"
                      value={rates[duration] || ""}
                      onChange={(e) => handleRateChange(duration, e.target.value)}
                      placeholder={`Rate for ${duration} days`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-sm">No stay durations have been configured. Please configure stay durations in the Length of Stay section.</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleAddRoomType} 
            disabled={!newRoomType.trim()}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            Add Room Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
