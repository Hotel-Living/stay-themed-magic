
import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { accordionMenuItemStyles } from "./styles";

export interface AccordionMenuItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function AccordionMenuItem({ value, title, children, className = "", titleClassName }: AccordionMenuItemProps) {
  const styles = accordionMenuItemStyles();
  
  return (
    <AccordionItem value={value} className={`${styles.item} ${className}`}>
      <AccordionTrigger className={styles.trigger} titleClassName={titleClassName}>{title}</AccordionTrigger>
      <AccordionContent className={styles.content}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
