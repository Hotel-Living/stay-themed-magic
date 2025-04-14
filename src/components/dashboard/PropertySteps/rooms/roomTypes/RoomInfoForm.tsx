
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RoomInfoFormProps {
  newRoomType: string;
  maxOccupancy: number;
  roomSize: number;
  description: string;
  onRoomTypeChange: (value: string) => void;
  onMaxOccupancyChange: (value: number) => void;
  onRoomSizeChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;
}

export default function RoomInfoForm({
  newRoomType,
  maxOccupancy,
  roomSize,
  description,
  onRoomTypeChange,
  onMaxOccupancyChange,
  onRoomSizeChange,
  onDescriptionChange
}: RoomInfoFormProps) {
  return (
    <div className="space-y-4">
      {/* Room Type Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-sm text-white">Room Type</Label>
        <Input 
          className="col-span-3 bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white"
          value={newRoomType}
          onChange={(e) => onRoomTypeChange(e.target.value)}
          placeholder="e.g. Double Room, Suite, etc."
        />
      </div>
      
      {/* Max Occupancy and Room Size on same row */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-sm text-white">Max Occupancy</Label>
        <div className="flex items-center col-span-1">
          <Input 
            className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-24"
            type="number"
            min="1"
            value={maxOccupancy}
            onChange={(e) => onMaxOccupancyChange(parseInt(e.target.value) || 1)}
          />
          <span className="ml-2 text-white">persons</span>
        </div>
        
        <Label className="text-right text-sm text-white">Room Size</Label>
        <div className="flex items-center col-span-1">
          <Input 
            className="bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white w-24"
            type="number"
            min="0"
            value={roomSize}
            onChange={(e) => onRoomSizeChange(parseInt(e.target.value) || 0)}
          />
          <span className="ml-2 text-white">sq.ft</span>
        </div>
      </div>
      
      {/* Description Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-sm text-white">Description</Label>
        <textarea 
          className="col-span-3 bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={3}
          placeholder="Brief description of the room"
        />
      </div>
    </div>
  );
}
