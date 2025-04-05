
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
import { getSelectedStayLengths } from "@/utils/stayLengthsContext";

interface RoomTypeSectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
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
  fullWidth = false,
  showHeader = true
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
    const storedLengths = getSelectedStayLengths();
    if (storedLengths.length > 0) {
      setSelectedStayLengths(storedLengths);
    }
    
    // Listen for updates to stay lengths
    const handleStayLengthsUpdate = (event: CustomEvent) => {
      setSelectedStayLengths(event.detail);
    };
    
    window.addEventListener('stayLengthsUpdated', handleStayLengthsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('stayLengthsUpdated', handleStayLengthsUpdate as EventListener);
    };
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

  const mainContent = (
    <>
      {/* Available Types of Rooms Accordion */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 uppercase">AVAILABLE TYPES OF ROOMS</h3>
        {roomTypes.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
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
          </Accordion>
        ) : (
          <div className="text-center py-4 bg-fuchsia-900/10 rounded-lg">
            <p className="text-sm text-gray-300">None</p>
          </div>
        )}
      </div>
      
      {/* Add Room Type Button */}
      <div className="mb-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="add-room" className="bg-fuchsia-900/20 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
              <h4 className="font-medium uppercase flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
              </h4>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <button 
                onClick={() => setDialogOpen(true)} 
                className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase flex items-center justify-center mb-4"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
              </button>
              
              <p className="text-sm text-gray-300 mb-2">
                A dialog will open where you can configure all room details including:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-300 mb-3 space-y-1">
                <li>Room type name and description</li>
                <li>Maximum occupancy and size</li>
                <li>Rates for each configured stay duration</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <RoomTypeDialog 
        isOpen={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onAdd={handleAddRoomType}
        availableStayLengths={selectedStayLengths}
      />
    </>
  );

  if (!showHeader) {
    return <div className={`${fullWidth ? "w-full" : ""}`}>{mainContent}</div>;
  }

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
          {mainContent}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
