
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RoomDetailsFormProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  roomCount: number;
  onRoomCountChange: (value: number) => void;
}

export default function RoomDetailsForm({
  description,
  onDescriptionChange,
  roomCount,
  onRoomCountChange
}: RoomDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white">Description</Label>
        <Input 
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="bg-[#850390] text-white border-white"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-base text-white">Available Rooms</Label>
        <div className="col-span-3">
          <Input 
            type="number"
            min="1"
            value={roomCount}
            onChange={(e) => onRoomCountChange(parseInt(e.target.value) || 1)}
            className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-32 text-base"
          />
        </div>
      </div>
    </div>
  );
}
