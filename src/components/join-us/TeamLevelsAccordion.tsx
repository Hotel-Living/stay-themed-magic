
import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "./Section";

interface TeamLevel {
  id: string;
  name: string;
  content: string;
}

export function TeamLevelsAccordion() {
  // Default content - to be updated later with real content
  const teamLevels: TeamLevel[] = [
    {
      id: "glow",
      name: "GLOW LEVEL - TIER 4",
      content: "Content for Glow Level - Tier 4 will be provided soon."
    },
    {
      id: "bridge",
      name: "BRIDGE LEVEL - TIER 3",
      content: "Content for Bridge Level - Tier 3 will be provided soon."
    },
    {
      id: "drive",
      name: "DRIVE LEVEL - TIER 2",
      content: "Content for Drive Level - Tier 2 will be provided soon."
    },
    {
      id: "summit",
      name: "SUMMIT LEVEL - TIER 1",
      content: "Content for Summit Level - Tier 1 will be provided soon."
    }
  ];

  return (
    <Section icon={ChevronDown} title="Team Structure Levels">
      <p className="text-white leading-relaxed mb-4">
        Explore the different levels of our team structure below:
      </p>
      <Accordion type="single" collapsible className="w-full">
        {teamLevels.map((level) => (
          <AccordionItem 
            key={level.id} 
            value={level.id}
            className="border-b border-[#3300B0]/30 py-2"
          >
            <AccordionTrigger 
              className="hover:no-underline group" 
              titleClassName="text-lg font-medium text-[#FFF9B0] group-hover:text-[#FEF7CD]"
            >
              {level.name}
            </AccordionTrigger>
            <AccordionContent className="text-white">
              <div className="px-2 py-4 bg-[#8017B0]/40 rounded-lg mt-2">
                {level.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
