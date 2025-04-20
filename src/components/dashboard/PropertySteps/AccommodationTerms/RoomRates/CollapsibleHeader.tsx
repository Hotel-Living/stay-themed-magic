
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleHeaderProps {
  isOpen: boolean;
}

export default function CollapsibleHeader({ isOpen }: CollapsibleHeaderProps) {
  return (
    <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
      <h2 className="font-medium text-base text-white">Room Types - Prices - Availability</h2>
      {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
    </CollapsibleTrigger>
  );
}
