import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Trash2, CheckCircle, AlertCircle, Upload, Image } from "lucide-react";
import RoomsAndPricingStep from "./RoomsAndPricingStep";
interface RoomType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  basePrice: number;
  images?: File[];
}
interface StepTwoProps {
  onValidationChange?: (isValid: boolean) => void;
}
export default function StepTwo({
  onValidationChange = () => {}
}: StepTwoProps) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [newRoom, setNewRoom] = useState<Omit<RoomType, 'id'>>({
    name: '',
    description: '',
    capacity: 1,
    basePrice: 0,
    images: []
  });
  const [error, setError] = useState<string>("");
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);

  // Check if all required fields are completed
  const checkValidation = () => {
    if (roomTypes.length === 0) {
      setError("Please add at least one room type");
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  // Handle adding a new room type
  const handleAddRoomType = () => {
    if (newRoom.name.trim() && newRoom.basePrice > 0) {
      const newRoomType = {
        ...newRoom,
        id: Date.now().toString()
      };
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoom({
        name: '',
        description: '',
        capacity: 1,
        basePrice: 0,
        images: []
      });
      setIsRoomDialogOpen(false);
    }
  };

  // Handle removing a room type
  const handleRemoveRoomType = (id: string) => {
    setRoomTypes(roomTypes.filter(room => room.id !== id));
  };

  // Handle file selection for room images
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setNewRoom({
        ...newRoom,
        images: [...(newRoom.images || []), ...fileList]
      });
    }
  };

  // Handle file selection for an existing room
  const handleExistingRoomImageSelect = (e: React.ChangeEvent<HTMLInputElement>, roomId: string) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setRoomTypes(roomTypes.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            images: [...(room.images || []), ...fileList]
          };
        }
        return room;
      }));
    }
  };
  useEffect(() => {
    // Validate whenever room types change
    checkValidation();
  }, [roomTypes]);
  return <div className="space-y-8">
      <RoomsAndPricingStep />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          
        </div>
        
        <Collapsible className="w-full border rounded-xl overflow-hidden">
          <CollapsibleTrigger className="w-full flex items-center justify-center py-4 text-white transition-colors bg-[#9c0cc8]">
            <Plus className="mr-2 h-5 w-5" />
            ADD ROOM TYPE
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="room-name">Room Type Name <span className="text-red-500">*</span></Label>
                  <Input id="room-name" value={newRoom.name} onChange={e => setNewRoom({
                  ...newRoom,
                  name: e.target.value
                })} placeholder="e.g. Deluxe Double" className="bg-[#690695]" />
                </div>
                
                <div>
                  <Label htmlFor="room-description">Description</Label>
                  <Input id="room-description" value={newRoom.description} onChange={e => setNewRoom({
                  ...newRoom,
                  description: e.target.value
                })} placeholder="Brief description of the room" className="bg-[#6d099a]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="room-capacity">Max Capacity <span className="text-red-500">*</span></Label>
                    <Input id="room-capacity" type="number" min="1" value={newRoom.capacity} onChange={e => setNewRoom({
                    ...newRoom,
                    capacity: parseInt(e.target.value) || 1
                  })} className="bg-[#6e0b9b]" />
                  </div>
                  
                  <div>
                    <Label htmlFor="room-price">Base Price <span className="text-red-500">*</span></Label>
                    <Input id="room-price" type="number" min="0" value={newRoom.basePrice} onChange={e => setNewRoom({
                    ...newRoom,
                    basePrice: parseFloat(e.target.value) || 0
                  })} className="bg-[#850588]" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="room-images">Room Images</Label>
                  <div className="mt-2 flex items-center">
                    <label className="flex items-center gap-2 px-4 py-2 transition-colors rounded-lg cursor-pointer bg-[#6e0b9b]">
                      <Image className="w-4 h-4" />
                      <span>Upload Room Photos</span>
                      <input id="room-images" type="file" className="hidden" accept="image/*" multiple onChange={handleImageSelect} />
                    </label>
                    {newRoom.images && newRoom.images.length > 0 && <span className="ml-3 text-sm">{newRoom.images.length} image(s) selected</span>}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  
                  <Button onClick={() => handleAddRoomType()} disabled={!newRoom.name.trim() || newRoom.basePrice <= 0} className="font-normal bg-[#af00b0]">
                    Add Room Type
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {roomTypes.length > 0 && <div className="mt-4 space-y-3">
            <h4 className="font-medium">Added Room Types:</h4>
            {roomTypes.map(room => <div key={room.id} className="p-4 border rounded-md flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-medium">{room.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {room.description || 'No description'} | Capacity: {room.capacity} | Base Price: ${room.basePrice}
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center gap-2 px-3 py-1.5 bg-[#850588] hover:bg-[#9505a1] transition-colors text-white text-sm rounded-lg cursor-pointer inline-block">
                      <Upload className="w-3 h-3" />
                      <span>Upload Room Photos</span>
                      <input type="file" className="hidden" accept="image/*" multiple onChange={e => handleExistingRoomImageSelect(e, room.id)} />
                    </label>
                    {room.images && room.images.length > 0 && <span className="ml-3 text-sm">{room.images.length} image(s) selected</span>}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleRemoveRoomType(room.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>)}
          </div>}
        
        {error && <div className="p-3 mt-4 rounded-md bg-red-50 text-red-700 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>}
        
        {roomTypes.length > 0 && !error && <div className="p-3 mt-4 rounded-md bg-green-50 text-green-700 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>{roomTypes.length} room type(s) added successfully</span>
          </div>}
      </div>
    </div>;
}