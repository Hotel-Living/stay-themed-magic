
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { RoomType } from "./useRoomTypes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface RoomTypeContentProps {
  roomTypes: RoomType[];
  initialRoomTypes?: any[];
  initialStayLengths?: number[];
  selectedStayLengths: number[];
  selectedUnit: string;
  dialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
  handleAddRoomType: (roomType: Omit<RoomType, "id">) => void;
  handleDeleteRoomType: (id: string) => void;
  handleEditRoomType?: (id: string, updatedRoomType: Partial<RoomType>) => void;
}

export default function RoomTypeContent({
  roomTypes,
  selectedStayLengths,
  selectedUnit,
  dialogOpen,
  setDialogOpen,
  handleAddRoomType,
  handleDeleteRoomType,
  handleEditRoomType
}: RoomTypeContentProps) {
  return (
    <>
      {/* Available Types of Rooms Accordion */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 uppercase">AVAILABLE TYPES OF ROOMS</h3>
        <Accordion type="single" collapsible className="w-full">
          {roomTypes.map(room => (
            <div key={room.id} className="p-4 border rounded-md flex justify-between items-center mb-2">
              <div>
                <div className="font-medium">{room.name}</div>
                <div className="text-sm text-white/70">
                  {room.description || 'No description'} | Max Occupancy: {room.maxOccupancy} | Base Rate: ${room.baseRate}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDeleteRoomType(room.id)} 
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          ))}
        </Accordion>
      </div>
      
      {/* Add Room Type Button directly on the main content */}
      <div className="mb-6">
        <Button
          onClick={() => setDialogOpen(true)}
          className="w-full py-4 font-bold text-white bg-[#7A0486] hover:bg-[#65037a] flex items-center justify-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          ADD ROOM TYPE
        </Button>
      </div>
    </>
  );
}
