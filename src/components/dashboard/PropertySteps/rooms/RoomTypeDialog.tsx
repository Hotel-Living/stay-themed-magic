
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RoomTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (roomType: string) => void;
}

export default function RoomTypeDialog({ isOpen, onClose, onAdd }: RoomTypeDialogProps) {
  const [newRoomType, setNewRoomType] = useState("");
  const [baseRate, setBaseRate] = useState("");

  const handleAddRoomType = () => {
    if (newRoomType.trim()) {
      onAdd(newRoomType);
      setNewRoomType("");
      setBaseRate("");
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
          
          {/* Added RATES section */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm text-white">Base Rate ($)</label>
            <input 
              className="col-span-3 bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2 text-white"
              type="number"
              min="0"
              value={baseRate}
              onChange={(e) => setBaseRate(e.target.value)}
              placeholder="Enter base rate per night"
            />
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
