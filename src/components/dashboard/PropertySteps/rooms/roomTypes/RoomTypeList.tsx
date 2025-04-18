
import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RoomType } from "./useRoomTypes";
import RoomTypeDetails from "./components/RoomTypeDetails";
import EditRoomTypeForm from "./components/EditRoomTypeForm";

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
          </AccordionContent>
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
