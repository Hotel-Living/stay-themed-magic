
import { ReactNode, useState, memo } from "react";
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
  contentClassName?: string;
  variant?: "purple" | "dark" | "light";
}

export const FilterItem = memo(function FilterItem({ 
  title, 
  children, 
  defaultOpen = false,
  className,
  contentClassName,
  variant = "purple"
}: FilterItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Determine background color based on variant
  const getBgColor = () => {
    switch (variant) {
      case "light":
        return "bg-fuchsia-900/20";
      case "dark":
        return "bg-[#3A1054]/70";
      case "purple":
      default:
        return "bg-[#5A1876]/50";
    }
  };
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className={cn(getBgColor(), "rounded-lg p-3", className)}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full font-medium text-sm">
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-transform" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent 
        className={cn("pt-2 pl-2 space-y-2 animate-accordion-down", contentClassName)}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
});
