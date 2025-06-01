
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const CostItemsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="utilities">
          <AccordionTrigger className="text-lg font-medium">
            Utilities
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-foreground/60">
              Utilities configuration will be added here.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cleaning">
          <AccordionTrigger className="text-lg font-medium">
            Cleaning
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-foreground/60">
              Cleaning configuration will be added here.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="meal-plans">
          <AccordionTrigger className="text-lg font-medium">
            Meal Plans
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-foreground/60">
              Meal plans configuration will be added here.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
