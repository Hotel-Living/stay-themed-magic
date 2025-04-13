
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";

export function ProfitSection() {
  return (
    <div className="space-y-0 pl-4 border-l-2 border-fuchsia-400/30">
      {/* Western hotels */}
      <CollapsibleMenuItem title="4.1 Western hotels. How much profit are we missing every year?" className="mb-2">
        <div className="space-y-2 text-left">
          <p className="text-base">- As a whole, around $75 billion. Every year.</p>
          <p className="text-base">- No sales: pure profit, before taxes</p>
          <p className="text-base">- Because our average yearly occupancy rate is 60%</p>
          <p className="text-base">- We usually generate enough revenue</p>
          <p className="text-base">- But the true gold mine remains untapped:</p>
          <p className="text-base ml-4">40% vacancy represents our highest profit potential</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Your hotel profit */}
      <CollapsibleMenuItem title="4.2 And how much profit is your hotel missing every year?" className="mb-2">
        <div className="space-y-2 text-left">
          <p className="text-base">- Just five vacant rooms per day = around $55,000 missed annually</p>
          <p className="text-base">- 20 vacant rooms daily = around $220,000 pure pre-tax profit</p>
          <p className="text-base">- A 200-room resort closing from October to May</p>
          <p className="text-base ml-4">not only misses $1 million in profit yearly,</p>
          <p className="text-base ml-4">but also racks up $420,000 in losses</p>
          <p className="text-base">- And a 500-room resort?</p>
          <p className="text-base ml-4">Over $3 million in lost profit every year.</p>
          <p className="text-base ml-4">And the losses? Let's not even look…</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Missing potential */}
      <CollapsibleMenuItem title="4.3 Yes. The vast majority of hotels are missing their true profit potential" className="mb-2">
        <div className="space-y-2 text-left">
          <p className="text-base">- Empty rooms are our untapped gold</p>
          <p className="text-base">- Few of us achieve 100% occupancy all year round</p>
          <p className="text-base">- It doesn't matter if we're 5 stars or 3:</p>
          <p className="text-base ml-4">we're all missing the point and a lot of money</p>
          <p className="text-base">- The pure-profit rooms we fail to sell</p>
          <p className="text-base">- And we're giving up our rightful place in society</p>
        </div>
      </CollapsibleMenuItem>
    </div>
  );
}
