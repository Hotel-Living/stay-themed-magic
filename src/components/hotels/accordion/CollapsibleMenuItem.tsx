
import { ReactNode } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleMenuItemProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function CollapsibleMenuItem({ title, children, className = "mb-6" }: CollapsibleMenuItemProps) {
  return (
    <Collapsible className={`w-full ${className}`}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
        <span>{title}</span>
        <span className="text-sm ml-2">+</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 pl-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
