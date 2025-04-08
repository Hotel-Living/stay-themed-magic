
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {/* MENU 1 */}
        <AccordionItem value="item-1" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WE ARE ZERO RISK
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Zero upfront cost</p>
            <p className="text-lg">Zero monthly fees</p>
            <p className="text-lg">You don't change a thing</p>
            <p className="text-lg">You don't have to do a thing</p>
            <p className="text-lg">You just sell your empty rooms</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 2 */}
        <AccordionItem value="item-2" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            SOME FACTS
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-lg">100% occupancy year-round is the secret</li>
              <li className="text-lg">After break-even, empty rooms are the goldmine</li>
              <li className="text-lg">10 empty rooms on average per day? = 3,600 lost profits every year</li>
              <li className="text-lg">Selling them off at a reduced price make a fortune</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 3 */}
        <AccordionItem value="item-3" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WE FILL YOUR HOTEL
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">On the smart way: longer stays</p>
            <p className="text-lg">Fewer check-ins. Bigger returns</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 4 */}
        <AccordionItem value="item-4" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            THEMES
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">You may even attract your ideal guests</p>
            <p className="text-lg">Just pick a theme and let people come together</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 5 */}
        <AccordionItem value="item-5" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            THEY NEED YOUR HOTEL
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Because people want to socialize. Make friends</p>
            <p className="text-lg">They want to stay longer in your hotel</p>
            <p className="text-lg">They want you to take care of their household chores</p>
            <p className="text-lg">They urgently need your empty rooms and services</p>
            <p className="text-lg">Just help them: give them both</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 6 */}
        <AccordionItem value="item-6" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            THEMES ARE THE NEW SOCIAL REVOLUTION
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Just think on a theme and let the magic happen</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 7 */}
        <AccordionItem value="item-7" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WE'RE SEAMLESS INTEGRATION
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">We're your bridge to professional, year-round staffing</p>
            <p className="text-lg">We're steady and high-value monthly revenue</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
