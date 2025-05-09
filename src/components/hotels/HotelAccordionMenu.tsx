
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
        className="w-full space-y-3"
        value={openItem || ""}
        onValueChange={setOpenItem}
      >
        <AccordionItem 
          value="the-benefits" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1-   The benefits
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <BenefitsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="compare-systems" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2-   Let's compare systems
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ComparisonTable items={comparisonItems} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="we-dont-just-fill-rooms" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3-   We don't just fill rooms
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <DontJustFillRoomsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="how-much-profit-missing" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              4-   How much profit are we missing?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ProfitSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="specialized-hotels" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              5-   What are affinities-hotels?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg text-[#FFF9B0]">EXAMPLE 1</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Imagine a hotel focused on sports - cycling, golf, tennis, etc.</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- People interested in that sport book together</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Community forms around common interests</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- No gaps between stays. No losses</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">EXAMPLE 2</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Consider a hotel themed around cooking</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Chefs, cooking classes, wine pairings, etc.</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Premium rates for specialized experiences</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Full occupancy with longer average stays</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">EXAMPLE 3</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Language immersion hotels</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Similar language level guests grouped together</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Staff speaks target language</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Complete linguistic experience</p>
              
              <p className="text-base italic mt-4 text-[#FFF9B0]">These specialized hotels create powerful communal experiences while maintaining steady, predictable revenue</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="our-technology" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              6-   Our technology does what others cannot
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Matches people with shared interests</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Coordinates arrivals & departures for zero gaps</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Optimizes stays for maximum profitability</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Single platform. Multiple revenue streams</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="targeted-marketing" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              7-   Targeted marketing no one else can match
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Precision targeting by interest & affinity</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Market to motivated communities, not random travelers</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Global reach with hyper-specific focus</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Higher conversion rates. Lower acquisition costs</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="themed-hotels" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              8-   Affinities hotels = Perfect Social Networks
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Shared interests create instant connections</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Group psychology drives longer stays & returns</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Themed activities boost engagement & loyalty</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Community belonging becomes addictive</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="they-need-hotel" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              9-   They need your hotel
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <TheyNeedHotelSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="themes-revolution" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              10-   Affinities are the new social revolution
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <AffinitiesRevolutionSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="seamless-integration" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              11-   We're seamless integration
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <SeamlessIntegrationSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          value="steps-to-join" 
          className="overflow-hidden border-none shadow-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              12-   Steps to join Hotel-Living
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <StepsToJoinSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
