
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
      className="w-full border border-fuchsia-800/30 rounded-lg overflow-hidden"
    >
      <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-3 bg-fuchsia-900/30 hover:bg-fuchsia-900/40 text-white">
        <h3 className="font-medium text-base uppercase">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-fuchsia-900/10">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
