
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";

export function ProfitSection() {
  return (
    <div className="space-y-0 pl-4 border-l-2 border-fuchsia-400/30">
      {/* Western hotels - Added extra spaces after number */}
      <CollapsibleMenuItem title="4.1   Western hotels. How much profit are we missing every year?" className="mb-1" titleClassName="text-base">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> As a whole, around $75 billion. Every year.</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> No sales: pure profit, before taxes</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Because our average yearly occupancy rate is 60%</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> That means we reach break-even, pay our costs, and just make some earnings</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> But we don't capture the real profit: the remaining 40% of vacant rooms. Our pure profit</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Your hotel profit - Added extra spaces after number */}
      <CollapsibleMenuItem title="4.2   And how much profit is your hotel missing every year?" className="mb-1" titleClassName="text-base">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Just five vacant rooms per day = around $55,000 missed annually</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> 20 vacant rooms daily = around $220,000 pure pre-tax profit</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> A 200-room resort closing from October to May not only misses $1 million in profit yearly, but also racks up $420,000 in losses</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> And a 500-room resort? Over $3 million in lost profit every year. And the losses? Let's not even look…</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Missing potential - Added extra spaces after number */}
      <CollapsibleMenuItem title="4.3   Yes. The vast majority of hotels are missing their true profit potential" className="mb-1" titleClassName="text-base">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Empty rooms are our untapped gold</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Few of us achieve 100% occupancy all year round</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> It doesn't matter if we're 5 stars or 3: we're all missing the point and a lot of money</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> The pure-profit rooms we fail to sell</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> And we're giving up our rightful place in society</p>
        </div>
      </CollapsibleMenuItem>
    </div>
  );
}
