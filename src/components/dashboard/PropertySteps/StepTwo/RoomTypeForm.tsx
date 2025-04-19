
import React, { useState } from "react";
import { RoomType } from "../rooms/roomTypes/useRoomTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RoomTypeFormProps {
  onAddRoomType: (newRoom: Omit<RoomType, "id">) => void;
  onCancel: () => void;
}

export default function RoomTypeForm({ onCancel, onAddRoomType }: RoomTypeFormProps) {
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    maxOccupancy: 2,
    size: 200,
    baseRate: 0,
    roomCount: 1,
    rates: {},
    images: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRoomData(prev => ({
      ...prev,
      [name]: name === "maxOccupancy" || name === "baseRate" || name === "size" || name === "roomCount" 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRoomType(roomData);
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-fuchsia-900/10">
      <h3 className="text-lg font-medium mb-4 text-white">Add New Room Type</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-white">Room Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={roomData.name}
            onChange={handleChange}
            className="text-white bg-[#7A0486] border-white mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-white">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={roomData.description}
            onChange={handleChange}
            className="text-white bg-[#7A0486] border-white mt-1"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="maxOccupancy" className="text-white">Maximum Occupancy</Label>
          <Input
            id="maxOccupancy"
            name="maxOccupancy"
            type="number"
            min="1"
            required
            value={roomData.maxOccupancy}
            onChange={handleChange}
            className="text-white bg-[#7A0486] border-white mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="baseRate" className="text-white">Base Rate</Label>
          <Input
            id="baseRate"
            name="baseRate"
            type="number"
            min="0"
            step="0.01"
            required
            value={roomData.baseRate}
            onChange={handleChange}
            className="text-white bg-[#7A0486] border-white mt-1"
          />
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-white text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
          >
            Save Room
          </Button>
        </div>
      </form>
    </div>
  );
}
