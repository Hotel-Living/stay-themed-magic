
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode } from "react";
import { accordionMenuItemStyles } from "./styles";

export interface AccordionMenuItemProps {
  value: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function AccordionMenuItem({ 
  value, 
  title, 
  children, 
  className = "" 
}: AccordionMenuItemProps) {
  const styles = accordionMenuItemStyles();

  return (
    <AccordionItem 
      value={value} 
      className={`${styles.item} ${className}`}
    >
      <AccordionTrigger className={styles.trigger}>
        {title}
      </AccordionTrigger>
      <AccordionContent className={styles.content}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
