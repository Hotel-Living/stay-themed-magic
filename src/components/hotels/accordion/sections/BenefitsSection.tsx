
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";
import { hotelAccordionMenuItems } from "../accordionData";

interface BenefitsSectionProps {
  startingNumber?: number;
}

export function BenefitsSection({ startingNumber = 1 }: BenefitsSectionProps) {
  return (
    <div className="space-y-0 pl-4 border-l-2 border-fuchsia-400/30">
      {/* First menus from the beginning */}
      <CollapsibleMenuItem title={`${startingNumber}.1 Let's boost our profits`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[0].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.2 The Secret`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[1].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.3 Take the market back`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[2].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.4 Let's reduce expenses`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[3].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.5 Workflow optimization`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[4].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.6 Stability of staff`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[5].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.7 Boost hotel atmosphere`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[6].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.8 Stronger identity and differentiation`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[7].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.9 Happier, more loyal guests`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[8].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.10 We are zero risk`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[9].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.11 We fill your hotel`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[10].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={`${startingNumber}.12 Themes`} className="mb-4">
        <MenuItemText items={hotelAccordionMenuItems[11].content} />
      </CollapsibleMenuItem>
    </div>
  );
}
