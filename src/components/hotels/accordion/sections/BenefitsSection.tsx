
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";

export function BenefitsSection() {
  return (
    <div className="space-y-0 pl-4 border-l-2 border-fuchsia-400/30">
      {/* Benefit 1 - 100% Occupancy */}
      <CollapsibleMenuItem title="1.1 100% occupancy year-round" className="mb-1">
        <div className="space-y-3 text-left">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Occupancy rates can reach 100% throughout the year</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Zero empty rooms means maximum profit</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Full occupancy even during traditionally slow periods</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Consistent revenue stream without seasonal lows</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 2 - Higher Rates */}
      <CollapsibleMenuItem title="1.2 Higher average daily rate (ADR)" className="mb-1">
        <div className="space-y-3 text-left">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Through theme-based experiences, ADR increases by 15-30%</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Guests pay premium rates for curated community experiences</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Value-based pricing versus commodity-based pricing</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 3 - Lower Costs */}
      <CollapsibleMenuItem title="1.3 Lower operational costs" className="mb-1">
        <div className="space-y-3 text-left">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Reduced turnover rates mean lower cleaning costs</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Extended stays (8+ days) cut operational expenses</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Streamlined check-in/out processes save staff time</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Less marketing spend needed with consistent bookings</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 4 - Better Staff Stability */}
      <CollapsibleMenuItem title="1.4 Greater staff stability" className="mb-1">
        <div className="space-y-3 text-left">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Consistent occupancy = year-round employment</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Lower staff turnover reduces hiring & training costs</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Specialized staff can develop expertise for specific themes</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Higher employee satisfaction with stable schedules</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 5 - Additional Revenue */}
      <CollapsibleMenuItem title="1.5 Added revenue from themed activities" className="mb-1">
        <div className="space-y-3 text-left">
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> New revenue streams through specialized events</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Higher F&B consumption with theme-related offerings</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Merchandise opportunities tied to hotel themes</p>
          <p className="text-base flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2"></span> Extended service offerings generate increased spend</p>
        </div>
      </CollapsibleMenuItem>
    </div>
  );
}
