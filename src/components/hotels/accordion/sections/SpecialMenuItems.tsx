
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MenuItemText } from "../MenuItemText";

export function SpecialMenuItems() {
  return (
    <div className="mt-24">
      <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
          <span>DOES YOUR HOTEL HAVE EMPTY ROOMS?</span>
          <span className="text-sm ml-2">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
          <MenuItemText items={[
            "For at least eight nights in a row? Those rooms are your gold mine.",
            "Because if your hotel COVER costs, they're pure profit.",
            "Because if your hotel DON'T COVER costs, they're your lifeline.",
            "Because if your hotel is CLOSED some months every year, those empty rooms are your treasure: stop accumulating losses and start generating real income."
          ]} />
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
          <span>WITH OUR PATENTED SYSTEM, THE WORLD NEEDS YOUR ROOMS</span>
          <span className="text-sm ml-2">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
          <MenuItemText items={[
            "Because 40% of the Western population:",
            "- Lives alone or as a couple",
            "- Is semi-retired or retired",
            "- Works remotely",
            "- Is a student living away from home",
            "- Lives too far from work",
            "- Has a secure income",
            "And most of them:",
            "- Want to stop doing house chores",
            "- Feel too isolated",
            "- Have no family obligations",
            "- Want to expand their social life",
            "- Want to meet people who share their interests and mindset",
            "- Need the safety and comfort of hotel living — especially older or solo individuals"
          ]} />
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
          <span>HUMANITY'S DREAM IS TO LIVE IN A HOTEL</span>
          <span className="text-sm ml-2">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
          <MenuItemText items={[
            "Everything taken care of. Eternal vacation mode.",
            "So, why do we still have so many empty rooms?",
            "Because we're stuck in an outdated model from long ago."
          ]} />
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
          <span>HOTEL LIVING IS A TRUE HOSPITALITY REVOLUTION</span>
          <span className="text-sm ml-2">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
          <MenuItemText items={[
            "And the demand is so overwhelming, society needs us so badly, that 96 out of every 100 potential guests will miss out on their dream life. Simply, we don't have enough rooms for all them: only around 4% will get in."
          ]} />
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="w-full mb-6 border-b border-fuchsia-400/30 pb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xl font-bold text-white hover:text-yellow-300 py-4">
          <span>ALL YOU NEED TO DO IS OFFER THE RIGHT PRODUCT</span>
          <span className="text-sm ml-2">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 pl-4 text-white space-y-2">
          <MenuItemText items={[
            "Each hotel should find its ideal setup and solve as many daily needs for guests as possible.",
            "If you have lots of empty rooms, offer long stays at affordable prices (maybe 16, 24, or 32 nights) to be sure you'll fill up and you'll earn huge profits.",
            "If you just have 20–30 available empty rooms, you should consider shorter stays (8 or 16 nights) and, if your category allows, to offer exclusive, themed programs (anything from hobbies to experiences) that justify higher rates.",
            "Your hotel, any hotel, whatever its category and services, just needs to offer the perfect product to stay full all year and truly multiply its profits."
          ]} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
