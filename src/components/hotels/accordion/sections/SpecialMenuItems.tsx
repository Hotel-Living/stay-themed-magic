
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface SpecialMenuItemsProps {
  startingNumber?: number;
}

export function SpecialMenuItems({ startingNumber = 1 }: SpecialMenuItemsProps) {
  return (
    <div className="mt-0">
      <Collapsible className="w-full mb-0 border-b border-fuchsia-400/30 pb-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-2xl font-bold text-white hover:text-[#FEF7CD] py-2">
          <span>{startingNumber}. Does your hotel have empty rooms?</span>
          <ChevronDown className="h-4 w-4 text-[#FEF7CD] transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 pl-4 text-white space-y-4">
          <div className="space-y-2 text-left">
            <p className="text-base">- For at least eight nights in a row? Those rooms are your gold mine.</p>
            <p className="text-base">- Because if your hotel COVER costs, they're pure profit.</p>
            <p className="text-base">- Because if your hotel DON'T COVER costs, they're your lifeline.</p>
            <p className="text-base">- Because if your hotel is CLOSED some months every year,</p>
            <p className="text-base ml-4">those empty rooms are your treasure:</p>
            <p className="text-base ml-4">stop accumulating losses and start generating real income.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-0 border-b border-fuchsia-400/30 pb-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-2xl font-bold text-white hover:text-[#FEF7CD] py-2">
          <span>{startingNumber + 1}. With Hotel-Living, so many people needs your rooms</span>
          <ChevronDown className="h-4 w-4 text-[#FEF7CD] transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 pl-4 text-white space-y-4">
          <div className="space-y-2 text-left">
            <p className="text-base font-semibold">40% of the western population, who:</p>
            <p className="text-base">- Lives alone or with a partner</p>
            <p className="text-base">- Is semi-retired or retired</p>
            <p className="text-base">- Works remotely</p>
            <p className="text-base">- Is a student living away from home</p>
            <p className="text-base">- Commutes long distances to work</p>
            <p className="text-base">- Has a stable, reliable income</p>
            
            <p className="text-base font-semibold mt-4">And most of them:</p>
            <p className="text-base">- Want to stop doing chores</p>
            <p className="text-base">- Feel too isolated</p>
            <p className="text-base">- Have no family ties holding them back</p>
            <p className="text-base">- Want to grow their social life</p>
            <p className="text-base">- Want to meet others with similar interests and outlooks</p>
            <p className="text-base">- Need the safety, ease, and comfort that hotel living offers</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-0 border-b border-fuchsia-400/30 pb-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-2xl font-bold text-white hover:text-[#FEF7CD] py-2">
          <span>{startingNumber + 2}. Everyone's dream is to live in a hotel</span>
          <ChevronDown className="h-4 w-4 text-[#FEF7CD] transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 pl-4 text-white space-y-4">
          <div className="space-y-2 text-left">
            <p className="text-base">- Everything taken care of. Eternal vacation mode.</p>
            <p className="text-base">- So, why do we still have so many empty rooms?</p>
            <p className="text-base">- Because we're stuck in an outdated model from long ago.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-0 border-b border-fuchsia-400/30 pb-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-2xl font-bold text-white hover:text-[#FEF7CD] py-2">
          <span>{startingNumber + 3}. Hotel living is a true hospitality revolution</span>
          <ChevronDown className="h-4 w-4 text-[#FEF7CD] transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 pl-4 text-white space-y-4">
          <div className="space-y-2 text-left">
            <p className="text-base">- And the demand is so overwhelming, society needs us so badly, that 96 out of every 100 potential guests will miss out on their dream life. Simply, we don't have enough rooms for all them: only around 4% will get in.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-0 border-b border-fuchsia-400/30 pb-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-2xl font-bold text-white hover:text-[#FEF7CD] py-2">
          <span>{startingNumber + 4}. All you need to do is offer the right product</span>
          <ChevronDown className="h-4 w-4 text-[#FEF7CD] transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 pl-4 text-white space-y-4">
          <div className="space-y-2 text-left">
            <p className="text-base">Each hotel should find its ideal setup and meet as many of its guests' daily needs as possible.</p>
            
            <p className="text-base mt-3">- If you have lots of vacant rooms, consider offering long stays at affordable rates (maybe 16, 24, or 32 nights) to ensure high occupancy and maximize profits</p>
            
            <p className="text-base mt-3">- If you have only 20–30 available rooms, you might consider shorter stays (8 or 16 nights). And if your category allows, you might offer exclusive experiences that can justify premium rates</p>
            
            <p className="text-base mt-3">Your hotel, any hotel, regardless of size or category, just needs to offer the right product to stay full year-round and truly boost profits.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
