
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
          <div className="space-y-2">
            <p className="text-lg">We reshape society.</p>
            <p className="text-lg">People grouped by affinities</p>
            <p className="text-lg">Zero randomness. 100% connections</p>
            <p className="text-lg">Hotels to belong, not just to stay.</p>
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
        
        {/* Special item with additional margin */}
        <AccordionMenuItem 
          value={hotelAccordionMenuItems[9].id} 
          title="11. They need your hotel"
          className="mt-0"
        >
          <MenuItemText items={hotelAccordionMenuItems[9].content} />
        </AccordionMenuItem>
        
        {/* The last few items */}
        <AccordionMenuItem value="item-5" title="12. Themes are the new social revolution">
          <MenuItemText items={hotelAccordionMenuItems[12].content} />
        </AccordionMenuItem>
        
        <AccordionMenuItem value="item-6" title="13. We're seamless integration">
          <MenuItemText items={hotelAccordionMenuItems[13].content} />
        </AccordionMenuItem>
      </Accordion>
    </div>
  );
}
