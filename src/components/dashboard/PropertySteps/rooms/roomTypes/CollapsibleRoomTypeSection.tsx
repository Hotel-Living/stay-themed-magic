
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleRoomTypeSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleRoomTypeSection({ 
  title, 
  children,
  defaultOpen = false
}: CollapsibleRoomTypeSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border border-fuchsia-800/30 rounded-lg overflow-hidden bg-fuchsia-900/10"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-fuchsia-900/20">
        <h3 className="text-base font-medium text-white uppercase">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4 text-white" /> : <ChevronDown className="h-4 w-4 text-white" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
