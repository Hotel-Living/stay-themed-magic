
import React, { useState } from "react";
import { RoomType } from "../rooms/roomTypes/useRoomTypes";

interface RoomTypeFormProps {
  onCancel: () => void;
  onSave: (newRoom: Omit<RoomType, "id">) => void;
}

export default function RoomTypeForm({ onCancel, onSave }: RoomTypeFormProps) {
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
    onSave(roomData);
  };

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Add New Room Type</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Room Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={roomData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={roomData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="maxOccupancy" className="block text-sm font-medium mb-1">Maximum Occupancy</label>
          <input
            id="maxOccupancy"
            name="maxOccupancy"
            type="number"
            min="1"
            required
            value={roomData.maxOccupancy}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="baseRate" className="block text-sm font-medium mb-1">Base Rate</label>
          <input
            id="baseRate"
            name="baseRate"
            type="number"
            min="0"
            step="0.01"
            required
            value={roomData.baseRate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Room
          </button>
        </div>
      </form>
    </div>
  );
}
