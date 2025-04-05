
import React, { useState, useEffect } from "react";
import { ChevronRight, PlusCircle, Upload, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RoomTypeDialog from "./RoomTypeDialog";
import { durations } from "@/utils/booking";

interface RoomTypeSectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  fullWidth?: boolean;
}

interface RoomType {
  id: string;
  name: string;
  maxOccupancy: number;
  size: number;
  description: string;
  baseRate: number;
  rates: Record<number, number>; // stayDuration -> rate
}

export default function RoomTypeSection({ 
  onValidationChange,
  title = "ROOM TYPES",
  fullWidth = false
}: RoomTypeSectionProps) {
  const [selectedUnit, setSelectedUnit] = useState("sq. ft.");
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    {
      id: "1",
      name: "Single Room",
      maxOccupancy: 1,
      size: 200,
      description: "A cozy room for one person",
      baseRate: 100,
      rates: { 8: 800, 16: 1500 }
    }
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([8, 16]); // Default values
  
  // Get selected stay lengths from localStorage if available
  useEffect(() => {
    const storedLengths = localStorage.getItem('selectedStayLengths');
    if (storedLengths) {
      try {
        const parsedLengths = JSON.parse(storedLengths);
        if (Array.isArray(parsedLengths) && parsedLengths.length > 0) {
          setSelectedStayLengths(parsedLengths);
        }
      } catch (e) {
        console.error("Error parsing stored stay lengths:", e);
      }
    }
  }, []);
  
  const handleAddRoomType = (roomType: RoomType) => {
    setRoomTypes([...roomTypes, roomType]);
    setDialogOpen(false);
    if (roomTypes.length === 0) {
      onValidationChange(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, roomType: string) => {
    // Handle file upload logic here
    if (e.target.files && e.target.files.length > 0) {
      console.log(`Files selected for ${roomType}:`, e.target.files);
      // Add your file handling logic here
    }
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <label className="block text-sm font-medium text-foreground/90 uppercase">
            {title}
          </label>
          <ChevronRight className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* Room Types Accordion */}
          <Accordion type="single" collapsible className="w-full mb-4">
            {roomTypes.map((roomType, index) => (
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
                        onChange={(e) => {
                          const updated = [...roomTypes];
                          updated[index].maxOccupancy = parseInt(e.target.value) || 1;
                          setRoomTypes(updated);
                        }}
                        className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" 
                        placeholder="1" 
                      />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block uppercase">ROOM SIZE ({selectedUnit})</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={roomType.size}
                        onChange={(e) => {
                          const updated = [...roomTypes];
                          updated[index].size = parseInt(e.target.value) || 0;
                          setRoomTypes(updated);
                        }}
                        className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" 
                        placeholder="Size" 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-xs mb-1 block uppercase">DESCRIPTION</label>
                    <textarea 
                      value={roomType.description}
                      onChange={(e) => {
                        const updated = [...roomTypes];
                        updated[index].description = e.target.value;
                        setRoomTypes(updated);
                      }}
                      className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" 
                      rows={2} 
                      placeholder="Describe this room type"
                    ></textarea>
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
                            onChange={(e) => {
                              const updated = [...roomTypes];
                              updated[index].rates = {
                                ...updated[index].rates,
                                [duration]: parseInt(e.target.value) || 0
                              };
                              setRoomTypes(updated);
                            }}
                            className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" 
                            placeholder={`Rate for ${duration} days`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs mb-1 block uppercase">UPLOAD IMAGES</label>
                    <div className="border-2 border-dashed border-fuchsia-500/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-foreground/60">Drag & drop or click to upload</p>
                      <label className="inline-flex items-center mt-2 px-4 py-2 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" /> 
                        Upload Room Photos
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileUpload(e, roomType.name)}
                        />
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <button 
            onClick={() => setDialogOpen(true)} 
            className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase flex items-center justify-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
          </button>

          <RoomTypeDialog 
            isOpen={dialogOpen} 
            onClose={() => setDialogOpen(false)} 
            onAdd={handleAddRoomType}
            availableStayLengths={selectedStayLengths}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
