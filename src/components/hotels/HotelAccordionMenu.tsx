
import { Accordion } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";
import { hotelAccordionMenuItems } from "./accordion/accordionData";
import { comparisonItems } from "./accordion/comparisonData";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function HotelAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {/* First 5 individual menu items moved to the beginning */}
        <AccordionMenuItem 
          value="the-benefits" 
          title="THE BENEFITS"
        >
          <div className="space-y-6 pl-4 border-l-2 border-fuchsia-400/30">
            {/* First 5 menus from the beginning */}
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[0].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[0].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>WE ARE ZERO RISK</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={["Zero upfront cost", "Zero monthly fees", "You don't change a thing", "You don't have to do a thing", "You just make HUGE PROFITS from your typically vacant rooms"]} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[1].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[1].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[10].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[10].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[11].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[11].content} />
              </CollapsibleContent>
            </Collapsible>
            
            {/* Original benefit sections as collapsibles */}
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[2].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[2].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[3].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[3].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[4].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[4].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[5].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[5].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[6].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[6].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[7].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[7].content} />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>{hotelAccordionMenuItems[8].title}</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={hotelAccordionMenuItems[8].content} />
              </CollapsibleContent>
            </Collapsible>
          </div>
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
          <div className="space-y-6 pl-4 border-l-2 border-fuchsia-400/30">
            {/* Western hotels */}
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>WESTERN HOTELS. HOW MUCH PROFIT ARE WE MISSING EVERY YEAR?</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={[
                  "As a whole, around $75 billion. Every year.",
                  "No sales: pure profit, before taxes",
                  "Because our average yearly occupancy rate is 60%",
                  "That means we reach break-even, pay our costs, and make some earnings",
                  "But we don't capture the real profit: the remaining 40% of vacant rooms. Our pure profit"
                ]} />
              </CollapsibleContent>
            </Collapsible>
            
            {/* Your hotel profit */}
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>AND HOW MUCH PROFIT IS YOUR HOTEL MISSING EVERY YEAR?</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={[
                  "Just five vacant rooms per day = around $55,000 missed annually",
                  "20 vacant rooms daily = around $220,000 pure pre-tax profit",
                  "A 200-room resort closing from october to may not only misses $1 million in profit yearly, but also racks up $420,000 in losses",
                  "A 500-room resort? Over $3 million in lost profit every year. And the losses? Let's not even look…"
                ]} />
              </CollapsibleContent>
            </Collapsible>
            
            {/* Missing potential */}
            <Collapsible className="w-full mb-6">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200">
                <span>YES. THE VAST MAJORITY OF HOTELS ARE MISSING THEIR TRUE PROFIT POTENTIAL</span>
                <span className="text-sm ml-2">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-4">
                <MenuItemText items={[
                  "Empty rooms are our untapped gold",
                  "Few of us achieve 100% occupancy all year round",
                  "It doesn't matter if we're 5 stars or 3: we're all missing the point and a lot of money",
                  "The pure-profit rooms we fail to sell",
                  "And we're giving up our rightful place in society"
                ]} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </AccordionMenuItem>
        
        {/* Retain the five menu items with vertical spacing */}
        <div className="mt-24">
          <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
              <span>DOES YOUR HOTEL HAVE EMPTY ROOMS?</span>
              <span className="text-sm ml-2">+</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
              <MenuItemText items={[
                "For at least eight nights in a row? Those rooms are your gold mine.",
                "Because if your hotel COVER costs, they're pure profit.",
                "Because if your hotel DON'T COVER costs, they're your lifeline.",
                "Because if your hotel is CLOSED some months every year, those empty rooms are your treasure: stop accumulating losses and start generating real income."
              ]} />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
              <span>WITH OUR PATENTED SYSTEM, THE WORLD NEEDS YOUR ROOMS</span>
              <span className="text-sm ml-2">+</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
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
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
              <span>HUMANITY'S DREAM IS TO LIVE IN A HOTEL</span>
              <span className="text-sm ml-2">+</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
              <MenuItemText items={[
                "Everything taken care of. Eternal vacation mode.",
                "So, why do we still have so many empty rooms?",
                "Because we're stuck in an outdated model from long ago."
              ]} />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
              <span>HOTEL LIVING IS A TRUE HOSPITALITY REVOLUTION</span>
              <span className="text-sm ml-2">+</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
              <MenuItemText items={[
                "And the demand is so overwhelming, society needs us so badly, that 96 out of every 100 potential guests will miss out on their dream life. Simply, we don't have enough rooms for all them: only around 4% will get in."
              ]} />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
              <span>ALL YOU NEED TO DO IS OFFER THE RIGHT PRODUCT</span>
              <span className="text-sm ml-2">+</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
              <MenuItemText items={[
                "Each hotel should find its ideal setup and solve as many daily needs for guests as possible.",
                "If you have lots of empty rooms, offer long stays at affordable prices (maybe 16, 24, or 32 nights) to be sure you'll fill up and you'll earn huge profits.",
                "If you just have 20–30 available empty rooms, you should consider shorter stays (8 or 16 nights) and, if your category allows, to offer exclusive, themed programs (anything from hobbies to experiences) that justify higher rates.",
                "Your hotel, any hotel, whatever its category and services, just needs to offer the perfect product to stay full all year and truly multiply its profits."
              ]} />
            </CollapsibleContent>
          </Collapsible>
        </div>
        
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
