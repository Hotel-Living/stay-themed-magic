
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
  errors?: Record<string, string>;
}

export default function RoomInfoForm({
  newRoomType,
  maxOccupancy,
  roomSize,
  description,
  onRoomTypeChange,
  onMaxOccupancyChange,
  onRoomSizeChange,
  onDescriptionChange,
  errors = {}
}: RoomInfoFormProps) {
  return (
    <div className="space-y-4">
      {/* Room Type Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-sm text-white">Room Type <span className="text-red-400">*</span></Label>
        <div className="col-span-3">
          <Input 
            className={`bg-fuchsia-950/50 border ${errors.roomType ? 'border-red-400' : 'border-white'} rounded-lg p-2 text-white`}
            value={newRoomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            placeholder="e.g. Double Room, Suite, etc."
          />
          {errors.roomType && <p className="text-red-400 text-xs mt-1">{errors.roomType}</p>}
        </div>
      </div>
      
      {/* Max Occupancy and Room Size on same row */}
      <div className="grid grid-cols-6 items-center gap-4">
        <Label className="text-right text-sm text-white col-span-1">Max Occupancy <span className="text-red-400">*</span></Label>
        <div className="flex items-center col-span-2 flex-col">
          <div className="flex items-center w-full">
            <Input 
              className={`bg-fuchsia-950/50 border ${errors.maxOccupancy ? 'border-red-400' : 'border-white'} rounded-lg p-2 text-white w-16`}
              type="number"
              min="1"
              value={maxOccupancy}
              onChange={(e) => onMaxOccupancyChange(parseInt(e.target.value) || 1)}
            />
            <span className="ml-2 text-white">persons</span>
          </div>
          {errors.maxOccupancy && <p className="text-red-400 text-xs mt-1 self-start">{errors.maxOccupancy}</p>}
        </div>
        
        <Label className="text-right text-sm text-white col-span-1">Room Size <span className="text-red-400">*</span></Label>
        <div className="flex items-center col-span-2 flex-col">
          <div className="flex items-center w-full">
            <Input 
              className={`bg-fuchsia-950/50 border ${errors.roomSize ? 'border-red-400' : 'border-white'} rounded-lg p-2 text-white w-16`}
              type="number"
              min="0"
              value={roomSize}
              onChange={(e) => onRoomSizeChange(parseInt(e.target.value) || 0)}
            />
            <span className="ml-2 text-white">sq.ft</span>
          </div>
          {errors.roomSize && <p className="text-red-400 text-xs mt-1 self-start">{errors.roomSize}</p>}
        </div>
      </div>
      
      {/* Description Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-sm text-white">Description <span className="text-red-400">*</span></Label>
        <div className="col-span-3">
          <textarea 
            className={`w-full bg-fuchsia-950/50 border ${errors.description ? 'border-red-400' : 'border-white'} rounded-lg p-2 text-white`}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            placeholder="Brief description of the room"
          />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
        </div>
      </div>
    </div>
  );
}
