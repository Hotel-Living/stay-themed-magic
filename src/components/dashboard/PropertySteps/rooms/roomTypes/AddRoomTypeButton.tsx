
import React from "react";
import { PlusCircle } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AddRoomTypeButtonProps {
  onOpenDialog: () => void;
}

export default function AddRoomTypeButton({ onOpenDialog }: AddRoomTypeButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onOpenDialog === 'function') {
      onOpenDialog();
    }
  };

  return (
    <AccordionItem value="add-room" className="bg-fuchsia-900/20 rounded-lg overflow-hidden">
      <AccordionTrigger 
        className="px-4 py-3 text-left hover:no-underline"
        onClick={handleClick}
      >
        <h4 className="font-medium uppercase flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> ADD ROOM TYPE
        </h4>
      </AccordionTrigger>
    </AccordionItem>
  );
}
