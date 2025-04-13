
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";
import { hotelAccordionMenuItems } from "../accordionData";

export function BenefitsSection() {
  return (
    <div className="space-y-6 pl-4 border-l-2 border-fuchsia-400/30">
      {/* First 5 menus from the beginning */}
      <CollapsibleMenuItem title={hotelAccordionMenuItems[0].title}>
        <MenuItemText items={hotelAccordionMenuItems[0].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title="WE ARE ZERO RISK">
        <MenuItemText items={["Zero upfront cost", "Zero monthly fees", "You don't change a thing", "You don't have to do a thing", "You just make HUGE PROFITS from your typically vacant rooms"]} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[1].title}>
        <MenuItemText items={hotelAccordionMenuItems[1].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[10].title}>
        <MenuItemText items={hotelAccordionMenuItems[10].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[11].title}>
        <MenuItemText items={hotelAccordionMenuItems[11].content} />
      </CollapsibleMenuItem>
      
      {/* Original benefit sections as collapsibles */}
      <CollapsibleMenuItem title={hotelAccordionMenuItems[2].title}>
        <MenuItemText items={hotelAccordionMenuItems[2].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[3].title}>
        <MenuItemText items={hotelAccordionMenuItems[3].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[4].title}>
        <MenuItemText items={hotelAccordionMenuItems[4].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[5].title}>
        <MenuItemText items={hotelAccordionMenuItems[5].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[6].title}>
        <MenuItemText items={hotelAccordionMenuItems[6].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[7].title}>
        <MenuItemText items={hotelAccordionMenuItems[7].content} />
      </CollapsibleMenuItem>
      
      <CollapsibleMenuItem title={hotelAccordionMenuItems[8].title}>
        <MenuItemText items={hotelAccordionMenuItems[8].content} />
      </CollapsibleMenuItem>
    </div>
  );
}
