
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RoomCountSectionProps {
  roomCount: number;
  onChange: (count: number) => void;
}

export default function RoomCountSection({ roomCount, onChange }: RoomCountSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">ROOM AVAILABILITY</h3>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-base text-white">Available Rooms</Label>
        <div className="col-span-3">
          <Input 
            type="number"
            min="1"
            value={roomCount}
            onChange={(e) => onChange(parseInt(e.target.value) || 1)}
            className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-32 text-base"
          />
        </div>
      </div>
    </div>
  );
}
