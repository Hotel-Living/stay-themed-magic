
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
        <AccordionItem value="utilities" className="glass-card rounded-lg mb-4 border-fuchsia-500/20">
          <AccordionTrigger className="text-lg font-medium px-6 py-4 text-white hover:text-fuchsia-200">
            Utilities
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 text-white/80">
              Utilities configuration will be added here.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cleaning" className="glass-card rounded-lg mb-4 border-fuchsia-500/20">
          <AccordionTrigger className="text-lg font-medium px-6 py-4 text-white hover:text-fuchsia-200">
            Cleaning
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 text-white/80">
              Cleaning configuration will be added here.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="meal-plans" className="glass-card rounded-lg mb-4 border-fuchsia-500/20">
          <AccordionTrigger className="text-lg font-medium px-6 py-4 text-white hover:text-fuchsia-200">
            Meal Plans
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 text-white/80">
              Meal plans configuration will be added here.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
