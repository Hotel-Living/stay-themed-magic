
import { ReactNode } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { collapsibleMenuItemStyles } from "./styles";

export interface CollapsibleMenuItemProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function CollapsibleMenuItem({ 
  title, 
  children, 
  className = "mb-2" // Reduced spacing from mb-4 to mb-2 for consistent spacing
}: CollapsibleMenuItemProps) {
  const styles = collapsibleMenuItemStyles();

  return (
    <Collapsible className={`w-full ${className} overflow-visible`}>
      <CollapsibleTrigger className={styles.trigger}>
        <span>{title}</span>
        <ChevronDown className={styles.icon} />
      </CollapsibleTrigger>
      <CollapsibleContent className={styles.content}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
