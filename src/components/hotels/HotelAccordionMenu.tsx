
import { Accordion } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";
import { hotelAccordionMenuItems } from "./accordion/accordionData";
import { comparisonItems } from "./accordion/comparisonData";
import { ComparisonTable } from "./accordion/ComparisonTable";

export function HotelAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {/* First section */}
        <AccordionMenuItem value="boost-profits" title={hotelAccordionMenuItems[0].title}>
          <MenuItemText items={hotelAccordionMenuItems[0].content} />
        </AccordionMenuItem>
        
        {/* Zero Risk menu item moved here */}
        <AccordionMenuItem value="zero-risk" title="WE ARE ZERO RISK">
          <MenuItemText items={["Zero upfront cost", "Zero monthly fees", "You don't change a thing", "You don't have to do a thing", "You just make HUGE PROFITS from your typically vacant rooms"]} />
        </AccordionMenuItem>
        
        <AccordionMenuItem value="item-2" title={hotelAccordionMenuItems[1].title}>
          <MenuItemText items={hotelAccordionMenuItems[1].content} />
        </AccordionMenuItem>
        
        {/* Main section */}
        {hotelAccordionMenuItems.slice(2, 9).map((item) => (
          <AccordionMenuItem key={item.id} value={item.id} title={item.title}>
            <MenuItemText items={item.content} />
          </AccordionMenuItem>
        ))}
        
        {/* Comparison Table section */}
        <AccordionMenuItem
          value="compare-systems"
          title="LET'S COMPARE SYSTEMS"
          className="mt-24"
        >
          <ComparisonTable items={comparisonItems} />
        </AccordionMenuItem>
        
        {/* New slogans after comparison table */}
        <div className="space-y-4 py-6 text-center">
          <p className="text-xl text-white font-bold">We don't just fill rooms. We reshape society.</p>
          <p className="text-xl text-white font-bold">People grouped by affinities</p>
          <p className="text-xl text-white font-bold">Zero randomness. 100% connections</p>
          <p className="text-xl text-white font-bold">Hotels to belong, not just to stay.</p>
        </div>
        
        {/* Special item with additional margin */}
        <AccordionMenuItem 
          value={hotelAccordionMenuItems[9].id} 
          title={hotelAccordionMenuItems[9].title}
          className="mt-24"
        >
          <MenuItemText items={hotelAccordionMenuItems[9].content} />
        </AccordionMenuItem>
        
        {/* Remaining items - skipping the "zero-risk" item as it's moved up */}
        {hotelAccordionMenuItems.slice(10).filter(item => item.id !== "item-1").map((item) => (
          <AccordionMenuItem key={item.id} value={item.id} title={item.title}>
            <MenuItemText items={item.content} />
          </AccordionMenuItem>
        ))}
      </Accordion>
    </div>
  );
}
