
import { Accordion } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";
import { hotelAccordionMenuItems } from "./accordion/accordionData";
import { comparisonItems } from "./accordion/comparisonData";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { BenefitsSection } from "./accordion/sections/BenefitsSection";
import { ProfitSection } from "./accordion/sections/ProfitSection";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";

export function HotelAccordionMenu() {
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full space-y-0">
        {/* Main sections */}
        <AccordionMenuItem 
          value="the-benefits" 
          title="1. The benefits"
        >
          <BenefitsSection />
        </AccordionMenuItem>
        
        {/* 1.2 LET'S COMPARE SYSTEMS section */}
        <AccordionMenuItem
          value="compare-systems"
          title="2. Let's compare systems"
          className="mt-0"
        >
          <ComparisonTable items={comparisonItems} />
        </AccordionMenuItem>
        
        {/* 1.3 WE DON'T JUST FILL ROOMS section */}
        <AccordionMenuItem
          value="we-dont-just-fill-rooms"
          title="3. We don't just fill rooms"
          className="mt-0"
        >
          <div className="space-y-2 text-left">
            <p className="text-base">- We reshape society.</p>
            <p className="text-base">- People grouped by affinities</p>
            <p className="text-base">- Zero randomness. 100% connections</p>
            <p className="text-base">- Hotels to belong, not just to stay.</p>
          </div>
        </AccordionMenuItem>
        
        {/* 1.4 HOW MUCH PROFIT ARE WE MISSING section */}
        <AccordionMenuItem
          value="how-much-profit-missing"
          title="4. How much profit are we missing?"
          className="mt-0"
        >
          <ProfitSection />
        </AccordionMenuItem>
        
        {/* Special menu items */}
        <SpecialMenuItems startingNumber={5} />
        
        {/* They need your hotel section - now item 11 */}
        <AccordionMenuItem 
          value="they-need-hotel" 
          title="11. They need your hotel"
          className="mt-0"
        >
          <div className="space-y-2 text-left">
            <p className="text-base">- Because people want to socialize. Make friends</p>
            <p className="text-base">- They want to stay longer in your hotel</p>
            <p className="text-base">- They want you to take care of their household chores</p>
            <p className="text-base">- They urgently need your empty rooms and services</p>
            <p className="text-base">- Just help them: give them both</p>
          </div>
        </AccordionMenuItem>
        
        {/* The last two items - now 12 and 13 */}
        <AccordionMenuItem value="themes-revolution" title="12. Themes are the new social revolution" className="mt-0">
          <div className="space-y-2 text-left">
            <p className="text-base">- Just think on a theme and let the magic happen</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem value="seamless-integration" title="13. We're seamless integration" className="mt-0">
          <div className="space-y-2 text-left">
            <p className="text-base">- You don't have to choose between systems.</p>
            <p className="text-base">- Combine both models as you wish</p>
            <p className="text-base">- Start with just a few rooms, then scale as needed</p>
            <p className="text-base">- Switch more rooms to our system whenever it makes sense</p>
            <p className="text-base">- Our platform blends effortlessly with your current operations</p>
            <p className="text-base">- Zero disruption to your daily operations</p>
            <p className="text-base">- We adapt to you, not the other way around</p>
            <p className="text-base font-semibold mt-4">This is flexibility. This is profit</p>
            <p className="text-base font-semibold">This is Seamless Integration</p>
          </div>
        </AccordionMenuItem>
      </Accordion>
    </div>
  );
}
