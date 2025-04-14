
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
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <Accordion type="single" collapsible className="w-full space-y-0">
        {/* Main sections - Added extra spaces after numbers */}
        <AccordionMenuItem 
          value="the-benefits" 
          title="1.   The benefits"
          titleClassName="text-xl font-medium" 
          className="hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
        >
          <BenefitsSection />
        </AccordionMenuItem>
        
        {/* 1.2 LET'S COMPARE SYSTEMS section - Added extra spaces after numbers */}
        <AccordionMenuItem
          value="compare-systems"
          title="2.   Let's compare systems"
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <ComparisonTable items={comparisonItems} />
        </AccordionMenuItem>
        
        {/* 1.3 WE DON'T JUST FILL ROOMS section - Added extra spaces after numbers */}
        <AccordionMenuItem
          value="we-dont-just-fill-rooms"
          title="3.   We don't just fill rooms"
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-6 text-left py-6">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> We reshape society.</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> People grouped by affinities</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Zero randomness. 100% connections</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hotels to belong, not just to stay.</p>
          </div>
        </AccordionMenuItem>
        
        {/* 1.4 HOW MUCH PROFIT ARE WE MISSING section - Added extra spaces after numbers */}
        <AccordionMenuItem
          value="how-much-profit-missing"
          title="4.   How much profit are we missing?"
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <ProfitSection />
        </AccordionMenuItem>
        
        {/* Special menu items - will be numbered 5-9 with proper alignment */}
        <SpecialMenuItems startingNumber={5} />
        
        {/* They need your hotel section - renumbered from 11 to 10 */}
        <AccordionMenuItem 
          value="they-need-hotel" 
          title="10.   They need your hotel"
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-6 text-left py-6">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Because people want to socialize. Make friends</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They want to stay longer in your hotel</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They want you to take care of their household chores</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They urgently need your empty rooms and services</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Just help them: give them both</p>
          </div>
        </AccordionMenuItem>
        
        {/* The last two items - renumbered from 12 and 13 to 11 and 12 */}
        <AccordionMenuItem 
          value="themes-revolution" 
          title="11.   Themes are the new social revolution" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-6 text-left py-6">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Just think on a theme and let the magic happen</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem 
          value="seamless-integration" 
          title="12.   We're seamless integration" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
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
        </AccordionMenuItem>
      </Accordion>
    </div>
  );
}
