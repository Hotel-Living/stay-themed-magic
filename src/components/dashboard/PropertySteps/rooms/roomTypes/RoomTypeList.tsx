import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface RoomTypeListProps {
  roomTypes: any[];
  selectedStayLengths: number[];
  selectedUnit: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

export default function RoomTypeList({
  roomTypes,
  selectedStayLengths,
  selectedUnit,
  onDelete,
  onEdit
}: RoomTypeListProps) {
  return (
    <AccordionItem value="room-types" className="border-none">
      <AccordionTrigger className="py-2">
        {roomTypes.length === 0 ? (
          <span className="text-white/70 text-sm">None</span>
        ) : (
          <span className="text-white text-sm">{roomTypes.length} room types configured</span>
        )}
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4">
          {roomTypes.map((roomType) => (
            <div key={roomType.id} className="border rounded-md p-4">
              <div className="font-semibold text-white">{roomType.name}</div>
              <div className="text-sm text-white/70">
                Base Price: ${roomType.basePrice}
              </div>
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  className="px-3 py-1 bg-fuchsia-700 text-white rounded-md text-xs"
                  onClick={onEdit}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-700 text-white rounded-md text-xs"
                  onClick={() => onDelete(roomType.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
