
import React from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { RoomType } from "../rooms/roomTypes/useRoomTypes";

interface RoomTypeListProps {
  roomTypes: RoomType[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onRemoveRoomType: (id: string) => void;
}

export default function RoomTypeList({
  roomTypes,
  isOpen,
  setIsOpen,
  onRemoveRoomType
}: RoomTypeListProps) {
  if (roomTypes.length === 0) {
    return null;
  }

  return (
    <Collapsible 
      className="w-full border rounded-xl overflow-hidden" 
      open={isOpen} 
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between py-3 px-4 bg-fuchsia-900/10">
        <h4 className="font-medium">Available Room Types: {roomTypes.length}</h4>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-3 space-y-3">
          {roomTypes.map(room => (
            <div key={room.id} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-medium">{room.name}</div>
                <div className="text-sm text-muted-foreground">
                  {room.description || 'No description'} | Capacity: {room.maxOccupancy} | Base Price: ${room.baseRate}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onRemoveRoomType(room.id)} 
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
