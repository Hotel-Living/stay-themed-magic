
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TeamLevelTabs } from "./team-levels/TeamLevelTabs";
import { TeamLevelContent } from "./team-levels/TeamLevelContent";
import { teamLevelsData } from "./team-levels/teamLevelsData";

export function TeamLevelsAccordion() {
  const [activeLevel, setActiveLevel] = useState<string>("glow");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleSelectLevel = (levelId: string) => {
    setActiveLevel(levelId);
  };

  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue={isOpen ? "team-levels" : undefined} 
      onValueChange={(value) => setIsOpen(!!value)}
    >
      <AccordionItem value="team-levels" className="border-none">
        <AccordionTrigger className="flex items-center py-2">
          <div className="flex items-center">
            <ChevronDown className="h-6 w-6 text-yellow-300 mr-2 transition-transform" />
            <h2 className="text-3xl font-bold text-yellow-300">Explore Our Team Levels – Choose Your Impact</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-white leading-relaxed mb-8 text-center">
            Explore the different levels of our team structure:
          </p>
          
          {/* Horizontal Tabs */}
          <TeamLevelTabs 
            teamLevels={teamLevelsData}
            activeLevel={activeLevel}
            onSelectLevel={handleSelectLevel}
          />
          
          {/* Content Display */}
          {teamLevelsData.map((level) => (
            activeLevel === level.id && (
              <TeamLevelContent
                key={level.id}
                id={level.id}
                name={level.name}
                tier={level.tier}
                color={level.color}
                content={level.content}
              />
            )
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
