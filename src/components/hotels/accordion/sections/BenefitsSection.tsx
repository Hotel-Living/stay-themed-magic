
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";
import { hotelAccordionMenuItems } from "../accordionData";

export function BenefitsSection() {
  return (
    <div className="space-y-6 pl-4 border-l-2 border-fuchsia-400/30">
      {/* First 5 menus from the beginning */}
      <CollapsibleMenuItem title="Let's boost our profits">
        <MenuItemText items={hotelAccordionMenuItems[0].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Some facts">
        <MenuItemText items={hotelAccordionMenuItems[2].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Take the market back">
        <MenuItemText items={hotelAccordionMenuItems[3].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Let's reduce expenses">
        <MenuItemText items={hotelAccordionMenuItems[4].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Workflow optimization">
        <MenuItemText items={hotelAccordionMenuItems[5].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Stability of staff">
        <MenuItemText items={hotelAccordionMenuItems[6].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Boost hotel atmosphere">
        <MenuItemText items={hotelAccordionMenuItems[7].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Stronger identity and differentiation">
        <MenuItemText items={hotelAccordionMenuItems[8].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Happier, more loyal guests">
        <MenuItemText items={hotelAccordionMenuItems[9].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="We fill your hotel">
        <MenuItemText items={hotelAccordionMenuItems[10].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="Themes">
        <MenuItemText items={hotelAccordionMenuItems[11].content} />
      </CollapsibleMenuItem>
    </div>
  );
}
