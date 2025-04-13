
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
        
        {/* New profit-focused menu items with vertical spacing */}
        <div className="mt-24">
          <AccordionMenuItem 
            value="western-hotels-profit" 
            title="WESTERN HOTELS. HOW MUCH PROFIT ARE WE MISSING EVERY YEAR?"
          >
            <MenuItemText items={[
              "As a whole, around $75 billion. Every year.",
              "No sales: pure profit, before taxes",
              "Because our average yearly occupancy rate is 60%",
              "That means we reach break-even, pay our costs, and make some earnings",
              "But we don't capture the real profit: the remaining 40% of vacant rooms. Our pure profit"
            ]} />
          </AccordionMenuItem>
          
          <AccordionMenuItem 
            value="your-hotel-profit" 
            title="AND HOW MUCH PROFIT IS YOUR HOTEL MISSING EVERY YEAR?"
          >
            <MenuItemText items={[
              "Just five vacant rooms per day = around $55,000 missed annually",
              "20 vacant rooms daily = around $220,000 pure pre-tax profit",
              "A 200-room resort closing from october to may not only misses $1 million in profit yearly, but also racks up $420,000 in losses",
              "A 500-room resort? Over $3 million in lost profit every year. And the losses? Let's not even look…"
            ]} />
          </AccordionMenuItem>
          
          <AccordionMenuItem 
            value="missing-potential" 
            title="YES. THE VAST MAJORITY OF HOTELS ARE MISSING THEIR TRUE PROFIT POTENTIAL"
          >
            <MenuItemText items={[
              "Empty rooms are our untapped gold",
              "Few of us achieve 100% occupancy all year round",
              "It doesn't matter if we're 5 stars or 3: we're all missing the point and a lot of money",
              "The pure-profit rooms we fail to sell"
            ]} />
          </AccordionMenuItem>
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
