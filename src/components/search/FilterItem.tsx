
import { ReactNode, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function FilterItem({ 
  title, 
  children, 
  defaultOpen = false,
  className
}: FilterItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className={cn("bg-[#5A1876]/50 rounded-lg p-3", className)}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-transform" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pl-2 space-y-2 animate-accordion-down">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
