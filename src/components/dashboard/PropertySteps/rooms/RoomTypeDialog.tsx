
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface RoomTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (roomType: string) => void;
}

export default function RoomTypeDialog({ isOpen, onClose, onAdd }: RoomTypeDialogProps) {
  const [newRoomType, setNewRoomType] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleAddRoomType = () => {
    if (newRoomType.trim()) {
      onAdd(newRoomType);
      setNewRoomType("");
      setImages([]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#430453] text-black">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New Room Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm text-white">Room Type</label>
            <input 
              className="col-span-3 bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white"
              value={newRoomType}
              onChange={(e) => setNewRoomType(e.target.value)}
              placeholder="e.g. Double Room, Suite, etc."
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm text-white">Images</label>
            <div className="col-span-3">
              <label className="flex items-center justify-center gap-2 p-3 cursor-pointer bg-fuchsia-900/50 hover:bg-fuchsia-800/50 text-white rounded-lg border border-fuchsia-500/30">
                <Camera className="w-5 h-5" />
                <span>Upload Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {images.length > 0 && (
                <div className="mt-2 text-white text-sm">
                  {images.length} image{images.length > 1 ? 's' : ''} selected
                </div>
              )}
            </div>
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
