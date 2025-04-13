
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
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {/* Main sections */}
        <AccordionMenuItem 
          value="the-benefits" 
          title="THE BENEFITS"
        >
          <BenefitsSection />
        </AccordionMenuItem>
        
        {/* 1.2 LET'S COMPARE SYSTEMS section */}
        <AccordionMenuItem
          value="compare-systems"
          title="LET'S COMPARE SYSTEMS"
          className="mt-6"
        >
          <ComparisonTable items={comparisonItems} />
        </AccordionMenuItem>
        
        {/* 1.3 WE DON'T JUST FILL ROOMS section */}
        <AccordionMenuItem
          value="we-dont-just-fill-rooms"
          title="WE DON'T JUST FILL ROOMS"
          className="mt-6"
        >
          <div className="space-y-3">
            <p className="text-lg">We reshape society.</p>
            <p className="text-lg">People grouped by affinities</p>
            <p className="text-lg">Zero randomness. 100% connections</p>
            <p className="text-lg">Hotels to belong, not just to stay.</p>
          </div>
        </AccordionMenuItem>
        
        {/* 1.4 HOW MUCH PROFIT ARE WE MISSING section */}
        <AccordionMenuItem
          value="how-much-profit-missing"
          title="HOW MUCH PROFIT ARE WE MISSING?"
          className="mt-6"
        >
          <ProfitSection />
        </AccordionMenuItem>
        
        {/* Five special menu items */}
        <SpecialMenuItems />
        
        {/* Special item with additional margin */}
        <AccordionMenuItem 
          value={hotelAccordionMenuItems[9].id} 
          title={hotelAccordionMenuItems[9].title}
          className="mt-24"
        >
          <MenuItemText items={hotelAccordionMenuItems[9].content} />
        </AccordionMenuItem>
        
        {/* The last few items */}
        <AccordionMenuItem value="item-5" title={hotelAccordionMenuItems[12].title}>
          <MenuItemText items={hotelAccordionMenuItems[12].content} />
        </AccordionMenuItem>
        
        <AccordionMenuItem value="item-6" title={hotelAccordionMenuItems[13].title}>
          <MenuItemText items={hotelAccordionMenuItems[13].content} />
        </AccordionMenuItem>
        
        <AccordionMenuItem value="item-7" title={hotelAccordionMenuItems[14].title}>
          <MenuItemText items={hotelAccordionMenuItems[14].content} />
        </AccordionMenuItem>
      </Accordion>
    </div>
  );
}
