
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode } from "react";

interface AccordionMenuItemProps {
  value: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function AccordionMenuItem({ value, title, children, className = "" }: AccordionMenuItemProps) {
  return (
    <AccordionItem value={value} className={`border-b border-fuchsia-400/30 ${className}`}>
      <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-white space-y-2">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
