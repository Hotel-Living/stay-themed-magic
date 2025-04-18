
import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RoomType {
  id: string;
  name: string;
  maxOccupancy: number;
  size: number;
  description: string;
  baseRate: number;
  rates: Record<number, number>; // stayDuration -> rate
  images?: string[];
}

interface RoomTypeListProps {
  roomTypes: RoomType[];
  selectedStayLengths: number[];
  selectedUnit: string;
  onDelete: (id: string) => void;
  onEdit?: (id: string, updatedRoomType: Partial<RoomType>) => void;
}

export default function RoomTypeList({
  roomTypes,
  selectedStayLengths,
  selectedUnit,
  onDelete,
  onEdit
}: RoomTypeListProps) {
  const [editingRoom, setEditingRoom] = useState<RoomType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (roomTypes.length === 0) {
    return (
      <div className="text-center py-4 bg-fuchsia-900/10 rounded-lg">
        <p className="text-sm text-gray-300">None</p>
      </div>
    );
  }

  const handleEditClick = (roomType: RoomType) => {
    setEditingRoom({...roomType});
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingRoom && onEdit) {
      onEdit(editingRoom.id, editingRoom);
      setIsEditDialogOpen(false);
      setEditingRoom(null);
    }
  };

  const handleRateChange = (duration: number, value: string) => {
    if (editingRoom) {
      setEditingRoom({
        ...editingRoom,
        rates: {
          ...editingRoom.rates,
          [duration]: parseInt(value) || 0
        }
      });
    }
  };

  return (
    <div className="w-full">
      {roomTypes.map((roomType) => (
        <AccordionItem key={roomType.id} value={roomType.id} className="bg-fuchsia-900/20 rounded-lg mb-3 overflow-hidden">
          <div className="flex justify-between items-center px-4">
            <AccordionTrigger className="py-3 text-left hover:no-underline flex-1">
              <h4 className="font-medium uppercase">{roomType.name}</h4>
            </AccordionTrigger>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(roomType);
                }}
                className="text-blue-400 hover:text-blue-300 hover:bg-fuchsia-900/30"
              >
                <Edit2 size={18} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(roomType.id);
                }}
                className="text-red-500 hover:text-red-300 hover:bg-fuchsia-900/30"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-xs mb-1 block uppercase">MAXIMUM OCCUPANCY</label>
                <input 
                  type="number" 
                  min="1" 
                  value={roomType.maxOccupancy}
                  readOnly
                  className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2" 
                />
              </div>
              <div>
                <label className="text-xs mb-1 block uppercase">ROOM SIZE ({selectedUnit})</label>
                <input 
                  type="number" 
                  min="1" 
                  value={roomType.size}
                  readOnly
                  className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2" 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs mb-1 block uppercase">DESCRIPTION</label>
              <p className="text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2">
                {roomType.description}
              </p>
            </div>
            
            {/* Room Images Section */}
            {roomType.images && roomType.images.length > 0 && (
              <div className="mb-3">
                <label className="text-xs mb-1 block uppercase">ROOM IMAGES</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {roomType.images.map((imageUrl, idx) => (
                    <img 
                      key={idx} 
                      src={imageUrl} 
                      alt={`${roomType.name} image ${idx + 1}`}
                      className="h-20 w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Rates Section */}
            <div className="mb-3">
              <label className="text-xs mb-1 block uppercase">RATES FOR SELECTED STAY DURATIONS</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {selectedStayLengths.map((duration) => (
                  <div key={duration} className="mb-2">
                    <label className="text-xs mb-1 block">{duration} DAYS</label>
                    <input 
                      type="number" 
                      min="0"
                      value={roomType.rates[duration] || ""}
                      readOnly
                      className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}

      {/* Edit Dialog */}
      {editingRoom && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#430453] text-white max-w-[80%] w-[80%]">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Edit Room Type</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4 overflow-y-auto max-h-[70vh]">
              {/* Room Type Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-sm text-white">Room Type</Label>
                <Input 
                  className="col-span-3 bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white"
                  value={editingRoom.name}
                  onChange={(e) => setEditingRoom({...editingRoom, name: e.target.value})}
                />
              </div>
              
              {/* Max Occupancy and Room Size */}
              <div className="grid grid-cols-6 items-center gap-4">
                <Label className="text-right text-sm text-white col-span-1">Max Occupancy</Label>
                <div className="flex items-center col-span-2">
                  <Input 
                    className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-16"
                    type="number"
                    min="1"
                    value={editingRoom.maxOccupancy}
                    onChange={(e) => setEditingRoom({...editingRoom, maxOccupancy: parseInt(e.target.value) || 1})}
                  />
                  <span className="ml-2 text-white">persons</span>
                </div>
                
                <Label className="text-right text-sm text-white col-span-1">Room Size</Label>
                <div className="flex items-center col-span-2">
                  <Input 
                    className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-16"
                    type="number"
                    min="0"
                    value={editingRoom.size}
                    onChange={(e) => setEditingRoom({...editingRoom, size: parseInt(e.target.value) || 0})}
                  />
                  <span className="ml-2 text-white">{selectedUnit}</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-sm text-white">Description</Label>
                <textarea 
                  className="col-span-3 bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white"
                  value={editingRoom.description}
                  onChange={(e) => setEditingRoom({...editingRoom, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              {/* Rates */}
              <div className="grid gap-4">
                <Label className="text-white">Rates for Selected Stay Durations</Label>
                <div className="grid grid-cols-2 gap-4">
                  {selectedStayLengths.map((duration) => (
                    <div key={duration} className="mb-2">
                      <Label className="text-sm text-white">{duration} Days</Label>
                      <Input 
                        className="w-full bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white mt-1"
                        type="number"
                        min="0"
                        value={editingRoom.rates[duration] || ""}
                        onChange={(e) => handleRateChange(duration, e.target.value)}
                        placeholder={`Rate for ${duration} days`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={handleSaveEdit} 
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
