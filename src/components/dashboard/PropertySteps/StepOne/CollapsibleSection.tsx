
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible 
      className="w-full p-0 rounded-md py-0 px-[12px] bg-[#7a0486]" 
      open={isOpen} 
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-0">
        <h3 className="font-bold uppercase text-white text-base">{title}</h3>
        <ChevronRight className={`h-5 w-5 text-white transform transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
