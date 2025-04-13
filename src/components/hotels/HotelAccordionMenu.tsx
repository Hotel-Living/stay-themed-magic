
import { Accordion } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";
import { hotelAccordionMenuItems, comparisonItems } from "./accordion/menuData";
import { ComparisonTable } from "./accordion/ComparisonTable";

export function HotelAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {/* First section */}
        <AccordionMenuItem value="boost-profits" title={hotelAccordionMenuItems[0].title}>
          <MenuItemText items={hotelAccordionMenuItems[0].content} />
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
        
        {/* Comparison Table section - added with margin top for spacing */}
        <AccordionMenuItem
          value="compare-systems"
          title="LET'S COMPARE SYSTEMS"
          className="mt-24"
        >
          <ComparisonTable items={comparisonItems} />
        </AccordionMenuItem>
        
        {/* Special item with additional margin */}
        <AccordionMenuItem 
          value={hotelAccordionMenuItems[9].id} 
          title={hotelAccordionMenuItems[9].title}
          className="mt-24"
        >
          <MenuItemText items={hotelAccordionMenuItems[9].content} />
        </AccordionMenuItem>
        
        {/* Remaining items */}
        {hotelAccordionMenuItems.slice(10).map((item) => (
          <AccordionMenuItem key={item.id} value={item.id} title={item.title}>
            <MenuItemText items={item.content} />
          </AccordionMenuItem>
        ))}
      </Accordion>
    </div>
  );
}
