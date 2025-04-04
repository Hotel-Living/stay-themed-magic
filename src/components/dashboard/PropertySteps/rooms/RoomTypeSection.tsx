
import React, { useState } from "react";
import { ChevronRight, PlusCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import RoomTypeDialog from "./RoomTypeDialog";

export default function RoomTypeSection({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
  const [selectedUnit, setSelectedUnit] = useState("sq. ft.");
  const [newRoomType, setNewRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState<string[]>(["Single Room"]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAddRoomType = (roomType: string) => {
    if (roomType.trim()) {
      setRoomTypes([...roomTypes, roomType.trim()]);
      setDialogOpen(false);
      if (roomTypes.length === 0) {
        onValidationChange(true);
      }
    }
  };

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          ROOM TYPES
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {roomTypes.map((roomType, index) => (
          <div key={index} className="bg-fuchsia-900/20 p-4 rounded-lg mb-3">
            <h4 className="font-medium mb-2 uppercase">{roomType}</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-xs mb-1 block uppercase">MAXIMUM OCCUPANCY</label>
                <input type="number" min="1" className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" placeholder="1" required />
              </div>
              <div>
                <label className="text-xs mb-1 block uppercase">ROOM SIZE ({selectedUnit})</label>
                <input type="number" min="1" className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" placeholder="Size" required />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs mb-1 block uppercase">DESCRIPTION</label>
              <textarea className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" rows={2} placeholder="Describe this room type" required></textarea>
            </div>
            <div>
              <label className="text-xs mb-1 block uppercase">UPLOAD IMAGES</label>
              <div className="border-2 border-dashed border-fuchsia-500/30 rounded-lg p-4 text-center">
                <p className="text-sm text-foreground/60">Drag & drop or click to upload</p>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => setDialogOpen(true)} 
          className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase flex items-center justify-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
        </button>

        <RoomTypeDialog 
          isOpen={dialogOpen} 
          onClose={() => setDialogOpen(false)} 
          onAdd={handleAddRoomType}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
