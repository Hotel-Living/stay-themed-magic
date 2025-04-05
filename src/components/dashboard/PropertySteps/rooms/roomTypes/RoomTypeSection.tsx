
import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Accordion
} from "@/components/ui/accordion";
import RoomTypeDialog from "../RoomTypeDialog";
import RoomTypeList from "./RoomTypeList";
import AddRoomTypeButton from "./AddRoomTypeButton";
import { useRoomTypes } from "./useRoomTypes";

interface RoomTypeSectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
}

export default function RoomTypeSection({ 
  onValidationChange,
  title = "ROOM TYPES",
  fullWidth = false,
  showHeader = true
}: RoomTypeSectionProps) {
  const {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType
  } = useRoomTypes();

  // Notify parent when room types change
  React.useEffect(() => {
    if (roomTypes.length > 0) {
      onValidationChange(true);
    }
  }, [roomTypes, onValidationChange]);

  const mainContent = (
    <>
      {/* Available Types of Rooms Accordion */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 uppercase">AVAILABLE TYPES OF ROOMS</h3>
        <Accordion type="single" collapsible className="w-full">
          <RoomTypeList 
            roomTypes={roomTypes} 
            selectedStayLengths={selectedStayLengths}
            selectedUnit={selectedUnit}
          />
        </Accordion>
      </div>
      
      {/* Add Room Type Button */}
      <div className="mb-6">
        <Accordion type="single" collapsible className="w-full">
          <AddRoomTypeButton onOpenDialog={() => setDialogOpen(true)} />
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
