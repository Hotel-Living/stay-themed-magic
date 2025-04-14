
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";
import { Circle } from "lucide-react";

interface SpecialMenuItemsProps {
  startingNumber?: number;
}

export function SpecialMenuItems({ startingNumber = 1 }: SpecialMenuItemsProps) {
  return (
    <div className="mt-0">
      <CollapsibleMenuItem 
        title={`${startingNumber}. Does your hotel have empty rooms?`}
        className="mb-1 border-b border-fuchsia-400/30 pb-2"
        titleClassName="text-[1.35rem]"
      >
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> For at least eight nights in a row? Those rooms are your gold mine.</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Because if your hotel COVER costs, they're pure profit.</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Because if your hotel DON'T COVER costs, they're your lifeline.</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Because if your hotel is CLOSED some months every year, those empty rooms are your treasure: stop accumulating losses and start generating real income.</p>
        </div>
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem 
        title={`${startingNumber + 1}. So many people need your rooms`}
        className="mb-1 border-b border-fuchsia-400/30 pb-2"
        titleClassName="text-[1.35rem]"
      >
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> <span className="font-semibold">40% of the Western population, who:</span></p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Lives alone or with a partner</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Is semi-retired or retired</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Works remotely</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Is a student living away from home</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Commutes long distances to work</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Has a stable, reliable income</p>
          
          <p className="text-base flex items-center mt-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> <span className="font-semibold">And most of them:</span></p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Want to stop doing chores</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Feel too isolated</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Have no family ties holding them back</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Want to grow their social life</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Want to meet others with similar interests and outlooks</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Need the safety, ease, and comfort that hotel living offers</p>
        </div>
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem 
        title={`${startingNumber + 2}. Everyone's dream is to live in a hotel`}
        className="mb-1 border-b border-fuchsia-400/30 pb-2"
        titleClassName="text-[1.35rem]"
      >
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Everything taken care of. Eternal vacation mode.</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> So, why do we still have so many empty rooms? Because we're stuck in an outdated model from long ago.</p>
        </div>
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem 
        title={`${startingNumber + 3}. Hotel living is a true hospitality revolution`}
        className="mb-1 border-b border-fuchsia-400/30 pb-2"
        titleClassName="text-[1.35rem]"
      >
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> And the demand is so overwhelming, society needs us so badly, that 96 out of every 100 potential guests will miss out on their dream life. Simply, we don't have enough rooms for all them: only around 4% will get in.</p>
        </div>
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem 
        title={`${startingNumber + 4}. All you need to do is offer the right product`}
        className="mb-1 border-b border-fuchsia-400/30 pb-2"
        titleClassName="text-[1.35rem]"
      >
        <div className="space-y-6 text-left py-4">
          <p className="text-base flex items-center mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Each hotel should find its ideal setup and meet as many of its guests' daily needs as possible.</p>
          
          <p className="text-base flex items-center mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> If you have lots of vacant rooms, consider offering long stays at affordable rates (maybe 16, 24, or 32 nights) to ensure high occupancy and maximize profits.</p>
          
          <p className="text-base flex items-center mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> If you have only 20–30 available rooms, you might consider shorter stays (8 or 16 nights). And if your category allows, you might offer exclusive experiences that can justify premium rates.</p>
          
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Your hotel, any hotel, regardless of size or category, just needs to offer the right product to stay full year-round and truly boost profits.</p>
        </div>
      </CollapsibleMenuItem>
    </div>
  );
}
