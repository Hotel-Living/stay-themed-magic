
import React from "react";
import { Plus } from "lucide-react";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AddRoomTypeButtonProps {
  onOpenDialog: () => void;
}

export default function AddRoomTypeButton({ onOpenDialog }: AddRoomTypeButtonProps) {
  return (
    <AccordionItem value="add-room" className="border border-dashed border-white/30 rounded-lg">
      <AccordionTrigger 
        onClick={onOpenDialog}
        className="py-3 text-sm hover:no-underline justify-center text-white/70 hover:text-white"
      >
        <span className="flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" />
          ADD ROOM TYPE
        </span>
      </AccordionTrigger>
    </AccordionItem>
  );
}
