
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";
import { hotelAccordionMenuItems } from "./accordion/accordionData";
import { comparisonItems } from "./accordion/comparisonData";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { BenefitsSection } from "./accordion/sections/BenefitsSection";
import { ProfitSection } from "./accordion/sections/ProfitSection";
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
            <div className="space-y-6 text-left py-6">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> People grouped by affinities</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Zero randomness. 100% connections</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hotels to belong, not just to stay.</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> We reshape society.</p>
            </div>
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
            <div className="space-y-6 text-left py-6">
              <p className="text-base font-semibold py-0">BECAUSE 40% OF THE WESTERN POPULATION:</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Lives alone or as a couple</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Is either early retired or retired</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Is an online worker</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Is a student living away from home</p>
              <p className="text-base flex items-start pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Lives too far from work</p>
              
              <p className="text-base font-semibold mt-14 py-[9px]">AND MOST OF THEM:</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Would like to be free from household chores</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Is too lonely</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Has no family ties</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Wishes to expand their social life</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Wishes to meet people with similar tastes and mindsets</p>
              <p className="text-base flex items-start pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Needs the complete security of living in a hotel, especially in the case of older or single individuals</p>
              
              <p className="text-base font-semibold mt-14 py-[17px]">BECAUSE HUMANITY'S DREAM IS TO LIVE IN A HOTEL</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> With everything taken care of</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> On an endless vacation</p>
              <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> So, why do we have 40% of empty rooms every year?</p>
              <p className="text-base flex items-start pl-4 mt-2">Because we have been stuck in an outdated model for far too long. We are the dream solution for 40% of the Western population.</p>
              
              <p className="text-base mt-14 font-semibold uppercase py-[7px]">THEY NEED YOUR HOTEL BECAUSE:</p>
              <p className="text-base flex items-start mt-1 my-[10px]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Because people want to socialize. Make friends</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They want to stay longer in your hotel</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They want you to take care of their household chores</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They urgently need your empty rooms and services</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Just help them: give them both</p>
            </div>
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
            <div className="space-y-4 text-left py-6">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Guests don't just want rooms — they want meaning</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Interests connect faster than discounts</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Themed stays build loyalty</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Strangers become communities</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> You don't just fill rooms — you spark belonging</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Attract the right guests, not just any guests</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Your affinity is your magnet</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hotels with soul win the future</p>
            </div>
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
            <div className="space-y-6 text-left py-6">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> You don't have to choose between systems.</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Combine both models as you wish</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Start with just a few rooms, then scale as needed</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Switch more rooms to our system whenever it makes sense</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Our platform blends effortlessly with your current operations</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Zero disruption to your daily operations</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> We adapt to you, not the other way around</p>
              <p className="text-base font-semibold mt-4">This is flexibility. This is profit</p>
              <p className="text-base font-semibold">This is Seamless Integration</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
