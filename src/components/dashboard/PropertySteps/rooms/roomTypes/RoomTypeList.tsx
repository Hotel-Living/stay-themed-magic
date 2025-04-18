
import React, { useState } from "react";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RoomType } from "./useRoomTypes";
import RoomTypeDetails from "./components/RoomTypeDetails";
import EditRoomTypeForm from "./components/EditRoomTypeForm";
import RoomTypeAccordionContent from "./components/RoomTypeAccordionContent";

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

  return (
    <div className="w-full">
      {roomTypes.map((roomType) => (
        <AccordionItem key={roomType.id} value={roomType.id} className="bg-fuchsia-900/20 rounded-lg mb-3 overflow-hidden">
          <div className="px-4">
            <AccordionTrigger className="py-3 text-left hover:no-underline">
              <RoomTypeDetails
                name={roomType.name}
                description={roomType.description}
                capacity={roomType.maxOccupancy}
                baseRate={roomType.baseRate}
                onEdit={() => handleEditClick(roomType)}
                onDelete={() => onDelete(roomType.id)}
              />
            </AccordionTrigger>
          </div>
          <RoomTypeAccordionContent roomType={roomType} selectedUnit={selectedUnit} />
        </AccordionItem>
      ))}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#430453] text-white max-w-[80%] w-[80%]">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Edit Room Type</DialogTitle>
          </DialogHeader>
          
          <EditRoomTypeForm
            editingRoom={editingRoom}
            setEditingRoom={setEditingRoom}
            selectedStayLengths={selectedStayLengths}
          />
          
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
    </div>
  );
}
