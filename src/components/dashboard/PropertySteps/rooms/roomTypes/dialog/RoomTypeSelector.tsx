
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PREDEFINED_ROOM_TYPES } from "../constants";

interface RoomTypeSelectorProps {
  selectedRoomType: string;
  onRoomTypeChange: (value: string) => void;
}

export default function RoomTypeSelector({
  selectedRoomType,
  onRoomTypeChange
}: RoomTypeSelectorProps) {
  return (
    <div>
      <Label className="text-white mb-2">Room Type</Label>
      <Select value={selectedRoomType} onValueChange={onRoomTypeChange}>
        <SelectTrigger className="bg-[#850390] text-white border-white">
          <SelectValue placeholder="Select a room type" />
        </SelectTrigger>
        <SelectContent className="bg-[#850390] border-white">
          {PREDEFINED_ROOM_TYPES.map((type) => (
            <SelectItem 
              key={type.id} 
              value={type.id}
              className="text-white hover:bg-[#8A0499] focus:bg-[#8A0499] focus:text-white"
            >
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
