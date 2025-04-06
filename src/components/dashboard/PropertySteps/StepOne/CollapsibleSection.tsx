
import React from "react";
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
  return (
    <Collapsible className="w-full p-0 rounded-md py-0 px-[12px] bg-[#7a0486]" defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-0">
        <h3 className="font-bold uppercase text-white text-base">{title}</h3>
        <ChevronRight className="h-5 w-5 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
