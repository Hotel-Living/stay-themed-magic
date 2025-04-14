
import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { accordionMenuItemStyles } from "./styles";

export interface AccordionMenuItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  preventScroll?: boolean;
}

export function AccordionMenuItem({ 
  value, 
  title, 
  children, 
  className = "", 
  titleClassName,
  preventScroll = false 
}: AccordionMenuItemProps) {
  const styles = accordionMenuItemStyles();
  
  const handleTriggerClick = (e: React.MouseEvent) => {
    if (preventScroll) {
      // Prevent the default behavior which might cause scrolling
      e.preventDefault();
    }
  };
  
  return (
    <AccordionItem value={value} className={`${styles.item} ${className}`}>
      <AccordionTrigger 
        className={`${styles.trigger} group`} 
        titleClassName={titleClassName}
        onClick={handleTriggerClick}
      >
        <span className={titleClassName}>
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className={`${styles.content} animate-accordion-down`}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
