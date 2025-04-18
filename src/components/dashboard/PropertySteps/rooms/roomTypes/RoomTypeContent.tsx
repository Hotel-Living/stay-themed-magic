
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import RoomTypeList from "./RoomTypeList";
import AddRoomTypeButton from "./AddRoomTypeButton";
import RoomTypeDialog from "../RoomTypeDialog";
import { RoomType } from "./useRoomTypes";

interface RoomTypeContentProps {
  roomTypes: RoomType[];
  selectedStayLengths: number[];
  selectedUnit: string;
  dialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
  handleAddRoomType: (roomType: RoomType) => void;
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
          <RoomTypeList 
            roomTypes={roomTypes} 
            selectedStayLengths={selectedStayLengths}
            selectedUnit={selectedUnit}
            onDelete={handleDeleteRoomType}
            onEdit={handleEditRoomType}
          />
        </Accordion>
      </div>
      
      {/* Add Room Type Button */}
      <div className="mb-6">
        <Accordion type="single" collapsible className="w-full">
          <AddRoomTypeButton onOpenDialog={() => setDialogOpen(true)} />
        </Accordion>
      </div>
      
      <RoomTypeDialog 
        isOpen={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onAdd={handleAddRoomType}
        availableStayLengths={selectedStayLengths}
      />
    </>
  );
}
