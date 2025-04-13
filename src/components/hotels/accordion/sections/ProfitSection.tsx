
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";

export function ProfitSection() {
  return (
    <div className="space-y-0 pl-4 border-l-2 border-fuchsia-400/30">
      {/* Western hotels */}
      <CollapsibleMenuItem title="4.1 Western hotels. How much profit are we missing every year?">
        <MenuItemText items={[
          "As a whole, around $75 billion. Every year.",
          "No sales: pure profit, before taxes",
          "Because our average yearly occupancy rate is 60%",
          "That means we reach break-even, pay our costs, and make some earnings",
          "But we don't capture the real profit: the remaining 40% of vacant rooms. Our pure profit"
        ]} />
      </CollapsibleMenuItem>
      
      {/* Your hotel profit */}
      <CollapsibleMenuItem title="4.2 And how much profit is your hotel missing every year?">
        <MenuItemText items={[
          "Just five vacant rooms per day = around $55,000 missed annually",
          "20 vacant rooms daily = around $220,000 pure pre-tax profit",
          "A 200-room resort closing from october to may not only misses $1 million in profit yearly, but also racks up $420,000 in losses",
          "A 500-room resort? Over $3 million in lost profit every year. And the losses? Let's not even look…"
        ]} />
      </CollapsibleMenuItem>
      
      {/* Missing potential */}
      <CollapsibleMenuItem title="4.3 Yes. The vast majority of hotels are missing their true profit potential">
        <MenuItemText items={[
          "Empty rooms are our untapped gold",
          "Few of us achieve 100% occupancy all year round",
          "It doesn't matter if we're 5 stars or 3: we're all missing the point and a lot of money",
          "The pure-profit rooms we fail to sell",
          "And we're giving up our rightful place in society"
        ]} />
      </CollapsibleMenuItem>
    </div>
  );
}
