
import { ReactNode, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { collapsibleMenuItemStyles } from "./styles";

export interface CollapsibleMenuItemProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  defaultOpen?: boolean;
}

export function CollapsibleMenuItem({ 
  title, 
  children, 
  className = "mb-1",
  titleClassName = "",
  defaultOpen = false
}: CollapsibleMenuItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const styles = collapsibleMenuItemStyles();

  return (
    <Collapsible 
      className={`w-full ${className} overflow-visible`}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className={styles.trigger}>
        <span className={titleClassName}>{title}</span>
        <ChevronDown className={`${styles.icon} ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className={styles.content}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
