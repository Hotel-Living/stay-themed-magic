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
  return <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <Accordion type="single" collapsible className="w-full space-y-0">
        <AccordionMenuItem value="the-benefits" title="1-   The benefits" titleClassName="text-xl font-medium" className="hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md" preventScroll={true}>
          <BenefitsSection />
        </AccordionMenuItem>
        
        <AccordionMenuItem value="compare-systems" title="2-   Let's compare systems" className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md" titleClassName="text-xl font-medium" preventScroll={true}>
          <ComparisonTable items={comparisonItems} />
        </AccordionMenuItem>
        
        <AccordionMenuItem value="we-dont-just-fill-rooms" title="3-   We don't just fill rooms" className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md" titleClassName="text-xl font-medium" preventScroll={true}>
          <div className="space-y-6 text-left py-6">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> People grouped by affinities</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Zero randomness. 100% connections</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hotels to belong, not just to stay.</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> We reshape society.</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem value="how-much-profit-missing" title="4-   How much profit are we missing?" className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md" titleClassName="text-xl font-medium" preventScroll={true}>
          <ProfitSection />
        </AccordionMenuItem>
        
        <SpecialMenuItems startingNumber={5} preventScroll={true} />
        
        <AccordionMenuItem value="they-need-hotel" title="10-   They need your hotel" className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md" titleClassName="text-xl font-medium" preventScroll={true}>
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
            
            <p className="text-base mt-14 font-semibold uppercase py-[4px]">THEY NEED YOUR HOTEL BECAUSE:</p>
            <p className="text-base flex items-start mt-1 my-[10px]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Because people want to socialize. Make friends</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They want to stay longer in your hotel</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They want you to take care of their household chores</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They urgently need your empty rooms and services</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Just help them: give them both</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem value="themes-revolution" title="11-   Themes are the new social revolution" className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md" titleClassName="text-xl font-medium" preventScroll={true}>
          <div className="space-y-6 text-left py-6">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Just think on a theme and let the magic happen</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem value="seamless-integration" title="12-   We're seamless integration" className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md" titleClassName="text-xl font-medium" preventScroll={true}>
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
    </div>;
}