
import { ReactNode } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface FilterItemProps {
  title: string;
  children: ReactNode;
}

export function FilterItem({ title, children }: FilterItemProps) {
  return (
    <Collapsible>
      <div className="p-2 bg-[#5d0083] rounded-sm py-[3px]">
        <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
          <span>{title}</span>
          <ChevronRight className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1 pl-2 space-y-1">
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
