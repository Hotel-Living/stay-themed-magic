
import React from "react";
import { AccordionContent } from "@/components/ui/accordion";
import RoomImages from "./RoomImages";
import { RoomType } from "../useRoomTypes";

interface RoomTypeAccordionContentProps {
  roomType: RoomType;
  selectedUnit: string;
}

export default function RoomTypeAccordionContent({ 
  roomType, 
  selectedUnit 
}: RoomTypeAccordionContentProps) {
  return (
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
      
      <RoomImages images={roomType.images} name={roomType.name} />
    </AccordionContent>
  );
}
