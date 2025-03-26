
import { ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface FilterItemProps {
  title: string;
  children: ReactNode;
}

export function FilterItem({ title, children }: FilterItemProps) {
  return (
    <Collapsible>
      <div className="bg-[#5A1876]/50 rounded-lg p-3">
        <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
          <span>{title}</span>
          <ChevronRight className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pl-2 space-y-2">
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
