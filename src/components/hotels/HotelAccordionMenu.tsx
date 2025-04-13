
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
              "The pure-profit rooms we fail to sell",
              "And we're giving up our rightful place in society"
            ]} />
          </AccordionMenuItem>
        </div>
        
        {/* New five menu items with vertical spacing */}
        <div className="mt-24">
          <AccordionMenuItem 
            value="empty-rooms" 
            title="DOES YOUR HOTEL HAVE EMPTY ROOMS?"
          >
            <MenuItemText items={[
              "For at least eight nights in a row? Those rooms are your gold mine.",
              "Because if your hotel COVER costs, they're pure profit.",
              "Because if your hotel DON'T COVER costs, they're your lifeline.",
              "Because if your hotel is CLOSED some months every year, those empty rooms are your treasure: stop accumulating losses and start generating real income."
            ]} />
          </AccordionMenuItem>
          
          <AccordionMenuItem 
            value="world-needs-rooms" 
            title="WITH OUR PATENTED SYSTEM, THE WORLD NEEDS YOUR ROOMS"
          >
            <MenuItemText items={[
              "Because 40% of the Western population:",
              "- Lives alone or as a couple",
              "- Is semi-retired or retired",
              "- Works remotely",
              "- Is a student living away from home",
              "- Lives too far from work",
              "- Has a secure income",
              "And most of them:",
              "- Want to stop doing house chores",
              "- Feel too isolated",
              "- Have no family obligations",
              "- Want to expand their social life",
              "- Want to meet people who share their interests and mindset",
              "- Need the safety and comfort of hotel living — especially older or solo individuals"
            ]} />
          </AccordionMenuItem>
          
          <AccordionMenuItem 
            value="humanity-dream" 
            title="HUMANITY'S DREAM IS TO LIVE IN A HOTEL"
          >
            <MenuItemText items={[
              "Everything taken care of. Eternal vacation mode.",
              "So, why do we still have so many empty rooms?",
              "Because we're stuck in an outdated model from long ago."
            ]} />
          </AccordionMenuItem>
          
          <AccordionMenuItem 
            value="hospitality-revolution" 
            title="HOTEL LIVING IS A TRUE HOSPITALITY REVOLUTION"
          >
            <MenuItemText items={[
              "And the demand is so overwhelming, society needs us so badly, that 96 out of every 100 potential guests will miss out on their dream life. Simply, we don't have enough rooms for all them: only around 4% will get in."
            ]} />
          </AccordionMenuItem>
          
          <AccordionMenuItem 
            value="right-product" 
            title="ALL YOU NEED TO DO IS OFFER THE RIGHT PRODUCT"
          >
            <MenuItemText items={[
              "Each hotel should find its ideal setup and solve as many daily needs for guests as possible.",
              "If you have lots of empty rooms, offer long stays at affordable prices (maybe 16, 24, or 32 nights) to be sure you'll fill up and you'll earn huge profits.",
              "If you just have 20–30 available empty rooms, you should consider shorter stays (8 or 16 nights) and, if your category allows, to offer exclusive, themed programs (anything from hobbies to experiences) that justify higher rates.",
              "Your hotel, any hotel, whatever its category and services, just needs to offer the perfect product to stay full all year and truly multiply its profits."
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
