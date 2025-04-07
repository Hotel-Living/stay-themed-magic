
import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

interface CollapsibleRoomTypeSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapsibleRoomTypeSection({
  title,
  children
}: CollapsibleRoomTypeSectionProps) {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          {title}
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
