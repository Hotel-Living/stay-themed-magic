
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RoomType {
  id: string;
  name: string;
  maxOccupancy: number;
  size: number;
  description: string;
  baseRate: number;
  rates: Record<number, number>; // stayDuration -> rate
}

interface RoomTypeListProps {
  roomTypes: RoomType[];
  selectedStayLengths: number[];
  selectedUnit: string;
}

export default function RoomTypeList({
  roomTypes,
  selectedStayLengths,
  selectedUnit
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
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
            <h4 className="font-medium uppercase">{roomType.name}</h4>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-xs mb-1 block uppercase">MAXIMUM OCCUPANCY</label>
                <input 
                  type="number" 
                  min="1" 
                  value={roomType.maxOccupancy}
                  readOnly
                  className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" 
                />
              </div>
              <div>
                <label className="text-xs mb-1 block uppercase">ROOM SIZE ({selectedUnit})</label>
                <input 
                  type="number" 
                  min="1" 
                  value={roomType.size}
                  readOnly
                  className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs mb-1 block uppercase">DESCRIPTION</label>
              <p className="text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2">
                {roomType.description}
              </p>
            </div>

            {/* Rates Section */}
            <div className="mb-3">
              <label className="text-xs mb-1 block uppercase">RATES FOR SELECTED STAY DURATIONS</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {selectedStayLengths.map((duration) => (
                  <div key={duration} className="mb-2">
                    <label className="text-xs mb-1 block">{duration} DAYS ($)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={roomType.rates[duration] || ""}
                      readOnly
                      className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" 
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
