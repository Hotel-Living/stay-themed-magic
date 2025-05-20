
import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Section } from "./Section";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ListGroup {
  title: string;
  items: string[];
}

interface MultiListSectionProps {
  icon: LucideIcon;
  title: string;
  listGroups: ListGroup[];
}

export function MultiListSection({ icon, title, listGroups }: MultiListSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const toggleAccordionItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Section icon={icon} title={title}>
      <div className="space-y-6">
        <Accordion 
          type="multiple" 
          value={openItems}
          className="space-y-4"
        >
          {listGroups.map((group, index) => (
            <AccordionItem 
              key={index} 
              value={`group-${index}`}
              className="border-none bg-[#560365]/40 rounded-lg overflow-hidden"
            >
              <AccordionTrigger 
                className="px-4 py-3 text-white hover:no-underline"
                onClick={() => toggleAccordionItem(`group-${index}`)}
              >
                <span className="font-bold text-[#FFF9B0]">{group.title}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-white">
                <div className="space-y-3">
                  {group.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-white">{item}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
