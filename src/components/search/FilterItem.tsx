
import { ReactNode, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface FilterItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function FilterItem({
  title,
  children,
  defaultOpen = false
}: FilterItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-2 bg-[#5d0083] rounded-sm py-0 px-0">
        <CollapsibleTrigger 
          className="flex items-center justify-between w-full text-sm font-normal bg-[#7607b2] px-2 py-1 rounded cursor-pointer hover:bg-[#8a08cc] transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-left text-white text-sm font-semibold">{title}</span>
          <ChevronRight className={`h-4 w-4 text-white transition-transform ${isOpen ? "transform rotate-90" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1 pl-2 space-y-1">
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
