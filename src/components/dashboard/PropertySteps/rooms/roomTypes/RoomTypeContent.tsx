
import React, { useState } from "react";
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
  preferredWeekday: string;
}

export default function RoomTypeContent({
  roomTypes,
  selectedStayLengths,
  selectedUnit,
  dialogOpen,
  setDialogOpen,
  handleAddRoomType,
  handleDeleteRoomType,
  preferredWeekday
}: RoomTypeContentProps) {
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);
  
  const handleOpenDialog = () => {
    setEditingRoomType(null); // Reset editing state when adding new
    setDialogOpen(true);
  };
  
  const handleEditRoomType = (roomType: RoomType) => {
    setEditingRoomType(roomType);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setEditingRoomType(null);
    setDialogOpen(false);
  };
  
  return (
    <>
      {/* Available Types of Rooms Accordion with reduced spacing */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 uppercase">AVAILABLE TYPES OF ROOMS</h3>
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
      
      {/* Add Room Type Button with smaller text */}
      <div className="mb-6">
        <Accordion type="single" collapsible className="w-full">
          <AddRoomTypeButton onOpenDialog={handleOpenDialog} />
        </Accordion>
      </div>
      
      <RoomTypeDialog 
        isOpen={dialogOpen} 
        onClose={handleCloseDialog} 
        onAdd={handleAddRoomType}
        availableStayLengths={selectedStayLengths}
        preferredWeekday={preferredWeekday}
        editingRoomType={editingRoomType}
      />
    </>
  );
}
