import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoomType } from "./useRoomTypes";

interface RoomTypeListProps {
  roomTypes: RoomType[];
  selectedStayLengths: number[];
  selectedUnit: string;
  onDelete: (id: string) => void;
  onEdit: (roomType: RoomType) => void;
}

export default function RoomTypeList({
  roomTypes,
  selectedStayLengths,
  selectedUnit,
  onDelete,
  onEdit
}: RoomTypeListProps) {
  if (roomTypes.length === 0) {
    return (
      <div className="text-center py-4 bg-fuchsia-900/10 rounded-lg">
        <p className="text-sm text-gray-300">None</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {roomTypes.map((roomType) => (
        <AccordionItem key={roomType.id} value={roomType.id} className="bg-fuchsia-900/20 rounded-lg mb-3 overflow-hidden">
          <div className="flex justify-between items-center px-4">
            <AccordionTrigger className="py-3 text-left hover:no-underline flex-1">
              <h4 className="font-medium uppercase">{roomType.name}</h4>
            </AccordionTrigger>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(roomType);
                }}
                className="text-blue-500 hover:text-blue-300 hover:bg-fuchsia-900/30"
              >
                <Edit2 size={18} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(roomType.id);
                }}
                className="text-red-500 hover:text-red-300 hover:bg-fuchsia-900/30"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-xs mb-1 block uppercase">AVAILABLE ROOMS</label>
                <input 
                  type="number" 
                  value={roomType.roomCount}
                  readOnly
                  className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2" 
                />
              </div>
              <div>
                <label className="text-xs mb-1 block uppercase">MAXIMUM OCCUPANCY</label>
                <input 
                  type="number" 
                  min="1" 
                  value={roomType.maxOccupancy}
                  readOnly
                  className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2" 
                />
              </div>
              <div>
                <label className="text-xs mb-1 block uppercase">ROOM SIZE ({selectedUnit})</label>
                <input 
                  type="number" 
                  min="1" 
                  value={roomType.size}
                  readOnly
                  className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2" 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs mb-1 block uppercase">DESCRIPTION</label>
              <p className="text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2">
                {roomType.description}
              </p>
            </div>
            
            {roomType.images && roomType.images.length > 0 && (
              <div className="mb-3">
                <label className="text-xs mb-1 block uppercase">ROOM IMAGES</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {roomType.images.map((imageUrl, idx) => (
                    <img 
                      key={idx} 
                      src={imageUrl} 
                      alt={`${roomType.name} image ${idx + 1}`}
                      className="h-20 w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="text-xs mb-1 block uppercase">RATES FOR SELECTED STAY DURATIONS</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {selectedStayLengths.map((duration) => (
                  <div key={duration} className="mb-2">
                    <label className="text-xs mb-1 block">{duration} DAYS</label>
                    <input 
                      type="number" 
                      min="0"
                      value={roomType.rates[duration] || ""}
                      readOnly
                      className="w-full text-sm bg-fuchsia-950/50 border border-white rounded-lg p-2" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </div>
  );
}
