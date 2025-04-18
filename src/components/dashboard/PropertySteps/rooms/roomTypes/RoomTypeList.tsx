
import React, { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import RoomTypeContent from "./RoomTypeContent";
import RoomTypeDialog from "../RoomTypeDialog";
import { useRoomTypes, RoomType } from "./useRoomTypes";

interface RoomTypeListProps {
  initialRoomTypes: any[];
  initialStayLengths: number[];
  onStayLengthsChange?: (lengths: number[]) => void;
  onMealPlansChange?: (plans: string[]) => void;
  onRoomTypesChange?: (roomTypes: RoomType[]) => void;
}

const RoomTypeList: React.FC<RoomTypeListProps> = ({
  initialRoomTypes = [],
  initialStayLengths = [],
  onStayLengthsChange = () => {},
  onMealPlansChange = () => {},
  onRoomTypesChange = () => {},
}) => {
  const {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType,
    handleEditRoomType,
  } = useRoomTypes(initialRoomTypes, initialStayLengths);

  // Notify parent when roomTypes change
  useEffect(() => {
    onRoomTypesChange(roomTypes);
  }, [roomTypes, onRoomTypesChange]);

  // Notify parent when stayLengths change
  useEffect(() => {
    onStayLengthsChange(selectedStayLengths);
  }, [selectedStayLengths, onStayLengthsChange]);

  return (
    <>
      <RoomTypeContent
        roomTypes={roomTypes}
        selectedStayLengths={selectedStayLengths}
        selectedUnit={selectedUnit}
        onDelete={handleDeleteRoomType}
        onEdit={handleEditRoomType}
      />
      <RoomTypeDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={handleAddRoomType}
        availableStayLengths={selectedStayLengths}
      />
    </>
  );
};

export default RoomTypeList;
