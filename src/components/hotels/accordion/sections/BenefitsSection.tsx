
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";

export function BenefitsSection() {
  return (
    <div className="space-y-0 pl-4 border-l-2 border-fuchsia-400/30">
      {/* Benefit 1 - 100% Occupancy - Added dash and extra spaces after number */}
      <CollapsibleMenuItem title="1.1-   100% occupancy year-round" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Occupancy rates can reach 100% throughout the year</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Zero empty rooms means maximum profit</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Full occupancy even during traditionally slow periods</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Consistent revenue stream without seasonal lows</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 2 - Lower Costs - Corrected numbering and updated content */}
      <CollapsibleMenuItem title="1.2-   Lower operational costs" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Just one weekday for all check-ins/outs. Zero gaps between stays</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Reduced turnover rates mean lower cleaning costs</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Extended stays (8, 16, 24 and 32 days) cut operational expenses</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Streamlined check-in/out processes save staff time</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 3 - Better Staff Stability - Corrected numbering and updated content */}
      <CollapsibleMenuItem title="1.3-   Greater staff stability" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Consistent occupancy = year-round employment</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Lower staff turnover reduces hiring & training costs</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Higher employee satisfaction with stable schedules</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 4 - Additional Revenue - Corrected numbering and updated content */}
      <CollapsibleMenuItem title="1.4-   Added revenue from themed activities" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> New revenue streams through specialized events</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Merchandise opportunities tied to hotel themes</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Extended service offerings generate increased spend</p>
        </div>
      </CollapsibleMenuItem>
    </div>
  );
}
