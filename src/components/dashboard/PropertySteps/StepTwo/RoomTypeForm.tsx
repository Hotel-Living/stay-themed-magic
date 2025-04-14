
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { FormRoomType } from "./types";

interface RoomTypeFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddRoomType: (newRoom: FormRoomType) => void;
}

export default function RoomTypeForm({
  isOpen,
  setIsOpen,
  onAddRoomType
}: RoomTypeFormProps) {
  const [newRoom, setNewRoom] = useState<FormRoomType>({
    name: '',
    description: '',
    capacity: 1,
    basePrice: 0
  });

  const handleAddRoomType = () => {
    onAddRoomType(newRoom);
    setNewRoom({
      name: '',
      description: '',
      capacity: 1,
      basePrice: 0
    });
  };

  return (
    <Collapsible className="w-full border rounded-xl overflow-hidden mb-4" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-center py-4 transition-colors bg-[#f4b1f4] font-extrabold text-[#6e036e]">
        <div className="flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          ADD ROOM TYPE
          {isOpen ? <ChevronUp className="ml-2 h-5 w-5" /> : <ChevronDown className="ml-2 h-5 w-5" />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="room-name">Room Type Name <span className="text-red-500">*</span></Label>
              <Input 
                id="room-name" 
                value={newRoom.name} 
                onChange={e => setNewRoom({
                  ...newRoom,
                  name: e.target.value
                })} 
                placeholder="e.g. Deluxe Double" 
                className="bg-[#850390] text-white border-white"
              />
            </div>
            
            <div>
              <Label htmlFor="room-description">Description</Label>
              <Input 
                id="room-description" 
                value={newRoom.description} 
                onChange={e => setNewRoom({
                  ...newRoom,
                  description: e.target.value
                })} 
                placeholder="Brief description of the room" 
                className="bg-[#7c057e] text-white border-white" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="room-capacity">Max Capacity <span className="text-red-500">*</span></Label>
                <Input 
                  id="room-capacity" 
                  type="number" 
                  min="1" 
                  value={newRoom.capacity} 
                  onChange={e => setNewRoom({
                    ...newRoom,
                    capacity: parseInt(e.target.value) || 1
                  })} 
                  className="bg-[#850588] text-white border-white w-full" 
                />
              </div>
              
              <div>
                <Label htmlFor="room-price">Base Price <span className="text-red-500">*</span></Label>
                <Input 
                  id="room-price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={newRoom.basePrice} 
                  onChange={e => setNewRoom({
                    ...newRoom,
                    basePrice: parseFloat(e.target.value) || 0
                  })} 
                  className="bg-[#850588] text-white border-white w-full" 
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                onClick={handleAddRoomType} 
                disabled={!newRoom.name.trim() || newRoom.basePrice <= 0} 
                className="font-normal bg-[#af00b0] text-white"
              >
                Add Room Type
              </Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
