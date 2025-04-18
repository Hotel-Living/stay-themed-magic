
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoomType } from "../useRoomTypes";

interface EditRoomTypeFormProps {
  editingRoom: RoomType | null;
  setEditingRoom: (room: RoomType | null) => void;
  selectedStayLengths: number[];
}

export default function EditRoomTypeForm({ 
  editingRoom, 
  setEditingRoom, 
  selectedStayLengths 
}: EditRoomTypeFormProps) {
  const handleRateChange = (duration: number, value: string) => {
    if (editingRoom) {
      setEditingRoom({
        ...editingRoom,
        rates: {
          ...editingRoom.rates,
          [duration]: parseInt(value) || 0
        }
      });
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right text-sm text-white">Room Type</Label>
        <Input 
          className="col-span-3 bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white"
          value={editingRoom?.name || ''}
          onChange={(e) => editingRoom && setEditingRoom({...editingRoom, name: e.target.value})}
        />
      </div>
      
      <div className="mb-3">
        <Label className="text-xs mb-1 block uppercase">RATES FOR SELECTED STAY DURATIONS</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {selectedStayLengths.map((duration) => (
            <div key={duration} className="mb-2">
              <Label className="text-xs mb-1 block">{duration} DAYS</Label>
              <Input 
                type="number" 
                min="0"
                value={editingRoom?.rates[duration] || ""}
                onChange={(e) => handleRateChange(duration, e.target.value)}
                className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
