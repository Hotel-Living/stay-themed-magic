
import React from "react";
import { PlusCircle } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AddRoomTypeButtonProps {
  onOpenDialog: () => void;
}

export default function AddRoomTypeButton({ onOpenDialog }: AddRoomTypeButtonProps) {
  return (
    <AccordionItem value="add-room" className="bg-fuchsia-900/20 rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
        <h4 className="font-medium uppercase flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
        </h4>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <button 
          onClick={onOpenDialog} 
          className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase flex items-center justify-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
        </button>
      </AccordionContent>
    </AccordionItem>
  );
}
