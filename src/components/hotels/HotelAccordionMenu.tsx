
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { comparisonItems } from "./accordion/comparisonData";
import { 
  BenefitsSection, 
  ProfitSection, 
  DontJustFillRoomsSection,
  AffinitiesRevolutionSection,
  TheyNeedHotelSection,
  SeamlessIntegrationSection,
  StepsToJoinSection
} from "./accordion/sections";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";

export function HotelAccordionMenu() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  const handleItemToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };
  
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-0"
        value={openItem || ""}
        onValueChange={setOpenItem}
      >
        <AccordionItem 
          value="the-benefits" 
          className="hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0"
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            1-   The benefits
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <BenefitsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="compare-systems" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            2-   Let's compare systems
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ComparisonTable items={comparisonItems} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="we-dont-just-fill-rooms" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            3-   We don't just fill rooms
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <DontJustFillRoomsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="how-much-profit-missing" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            4-   How much profit are we missing?
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ProfitSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="specialized-hotels" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            5-   What are affinities-hotels?
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg font-semibold">EXAMPLE 1</p>
              <p className="text-base flex items-start pl-4">- Imagine a hotel focused on sports - cycling, golf, tennis, etc.</p>
              <p className="text-base flex items-start pl-4">- People interested in that sport book together</p>
              <p className="text-base flex items-start pl-4">- Community forms around common interests</p>
              <p className="text-base flex items-start pl-4">- No gaps between stays. No losses</p>
              
              <p className="text-lg font-semibold mt-6">EXAMPLE 2</p>
              <p className="text-base flex items-start pl-4">- Consider a hotel themed around cooking</p>
              <p className="text-base flex items-start pl-4">- Chefs, cooking classes, wine pairings, etc.</p>
              <p className="text-base flex items-start pl-4">- Premium rates for specialized experiences</p>
              <p className="text-base flex items-start pl-4">- Full occupancy with longer average stays</p>
              
              <p className="text-lg font-semibold mt-6">EXAMPLE 3</p>
              <p className="text-base flex items-start pl-4">- Language immersion hotels</p>
              <p className="text-base flex items-start pl-4">- Similar language level guests grouped together</p>
              <p className="text-base flex items-start pl-4">- Staff speaks target language</p>
              <p className="text-base flex items-start pl-4">- Complete linguistic experience</p>
              
              <p className="text-base italic mt-4">These specialized hotels create powerful communal experiences while maintaining steady, predictable revenue</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="our-technology" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            6-   Our technology does what others cannot
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Matches people with shared interests</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Coordinates arrivals & departures for zero gaps</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Optimizes stays for maximum profitability</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Single platform. Multiple revenue streams</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="targeted-marketing" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            7-   Targeted marketing no one else can match
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Precision targeting by interest & affinity</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Market to motivated communities, not random travelers</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Global reach with hyper-specific focus</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Higher conversion rates. Lower acquisition costs</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="themed-hotels" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            8-   Affinities hotels = Perfect Social Networks
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Shared interests create instant connections</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Group psychology drives longer stays & returns</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Themed activities boost engagement & loyalty</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Community belonging becomes addictive</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="they-need-hotel" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            9-   They need your hotel
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <TheyNeedHotelSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="themes-revolution" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            10-   Affinities are the new social revolution
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <AffinitiesRevolutionSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="seamless-integration" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            11-   We're seamless integration
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <SeamlessIntegrationSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="steps-to-join" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md border-0" 
        >
          <AccordionTrigger className="py-4 px-4 text-xl font-medium hover:no-underline">
            12-   Steps to join Hotel-Living
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <StepsToJoinSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
