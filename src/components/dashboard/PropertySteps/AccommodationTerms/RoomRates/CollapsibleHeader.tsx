
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleHeaderProps {
  isOpen: boolean;
}

export default function CollapsibleHeader({ isOpen }: CollapsibleHeaderProps) {
  return (
    <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-fuchsia-900/20">
      <h2 className="text-base font-medium text-white">Room Types - Prices - Availability</h2>
      {isOpen ? 
        <ChevronUp className="h-4 w-4 text-white" /> : 
        <ChevronDown className="h-4 w-4 text-white" />
      }
    </CollapsibleTrigger>
  );
}
