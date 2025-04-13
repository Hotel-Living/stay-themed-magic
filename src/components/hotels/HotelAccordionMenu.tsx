
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

export function HotelAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {/* NEW MENU - LET'S BOOST OUR PROFITS (changed from BOOST YOUR PROFITS) */}
        <AccordionItem value="boost-profits" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            LET'S BOOST OUR PROFITS
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Full occupancy, real profits</p>
            <p className="text-lg">Sell the silence. Fill the hotel</p>
            <p className="text-lg">Unlock hidden profits</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 2 - SOME FACTS (moved after LET'S BOOST OUR PROFITS) */}
        <AccordionItem value="item-2" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            SOME FACTS
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <ul className="space-y-2">
              <li className="text-lg">100% occupancy year-round is the secret</li>
              <li className="text-lg">After break-even, empty rooms are the goldmine</li>
              <li className="text-lg">10 empty rooms on average per day? = 3,600 lost profits every year</li>
              <li className="text-lg">Selling them off at a reduced price make a fortune</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* NEW MENU - TAKE THE MARKET BACK */}
        <AccordionItem value="take-market-back" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            TAKE THE MARKET BACK
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Take back full revenue</p>
            <p className="text-lg">Apartment rentals stole our guests</p>
            <p className="text-lg">Stole our bookings. Our profits</p>
            <p className="text-lg">And we provide jobs, pay taxes, build community</p>
            <p className="text-lg">They filled their spaces by emptying our rooms</p>
            <p className="text-lg">Enough is enough. Hotel living is our comeback</p>
            <p className="text-lg">Longer stays. Lower prices. Higher profits</p>
            <p className="text-lg">Hotel living and our invincible weapon:</p>
            <p className="text-lg">Our nearly 100%-profit rooms after break-even</p>
            <p className="text-lg">Beat them at their own game: full service</p>
            <p className="text-lg">Smarter stays. Apartment prices. Hotel services</p>
            <p className="text-lg">Safety. Warmth. Great atmosphere</p>
            <p className="text-lg">Everything guests miss. Everything they crave</p>
            <p className="text-lg">Let's bring them back — and boost our profits</p>
            <p className="text-lg">Let's reclaim our place and our future</p>
          </AccordionContent>
        </AccordionItem>

        {/* NEW MENU - LET'S REDUCE EXPENSES */}
        <AccordionItem value="reduce-expenses" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            LET'S REDUCE EXPENSES
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Reduced operating costs</p>
            <p className="text-lg">Fewer cleanings, less laundry</p>
            <p className="text-lg">Fewer Check-ins/outs = Front desk Dream</p>
            <p className="text-lg">Less wear and tear on rooms and furniture</p>
            <p className="text-lg">Lower food costs (mature, predictable guests)</p>
            <p className="text-lg">Stable hiring = less training and lower turnover costs</p>
          </AccordionContent>
        </AccordionItem>

        {/* NEW MENU - WORKFLOW OPTIMIZATION */}
        <AccordionItem value="workflow-optimization" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WORKFLOW OPTIMIZATION
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Fully predictable check-in/check-out calendar</p>
            <p className="text-lg">Better planning for supplies and purchasing</p>
            <p className="text-lg">Fewer last-minute surprises</p>
            <p className="text-lg">Stronger team culture</p>
            <p className="text-lg">Stable year-round staff</p>
          </AccordionContent>
        </AccordionItem>

        {/* NEW MENU - STABILITY OF STAFF */}
        <AccordionItem value="stability-staff" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            STABILITY OF STAFF
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Yes. Same team, all year</p>
            <p className="text-lg">No high season. No low season</p>
            <p className="text-lg">Stability. Professionalism</p>
            <p className="text-lg">Stronger loyalty. Deeper commitment</p>
            <p className="text-lg">Fewer headaches. Happier employees</p>
          </AccordionContent>
        </AccordionItem>

        {/* NEW MENU - BOOST HOTEL ATMOSPHERE */}
        <AccordionItem value="boost-atmosphere" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            BOOST HOTEL ATMOSPHERE
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">No dead seasons, no empty lobbies</p>
            <p className="text-lg">A vibrant community. A living hotel</p>
            <p className="text-lg">No more lifeless halls</p>
            <p className="text-lg">Guests connect. Energy flows</p>
            <p className="text-lg">Atmosphere attracts. Staff thrives</p>
            <p className="text-lg">An active community creates authentic vibes</p>
          </AccordionContent>
        </AccordionItem>

        {/* NEW MENU - STRONGER IDENTITY AND DIFFERENTIATION */}
        <AccordionItem value="stronger-identity" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            STRONGER IDENTITY AND DIFFERENTIATION
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Clear market positioning</p>
            <p className="text-lg">Unique offer vs ¨old-fashioned¨ hotels</p>
            <p className="text-lg">Modern, human, coherent brand image</p>
            <p className="text-lg">Easier to build emotional marketing campaigns</p>
            <p className="text-lg">Opportunity to create themed micro-brands within the hotel</p>
          </AccordionContent>
        </AccordionItem>

        {/* NEW MENU - HAPPIER, MORE LOYAL GUESTS */}
        <AccordionItem value="happier-guests" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            HAPPIER, MORE LOYAL GUESTS
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Guests aren't just visitors: they belong</p>
            <p className="text-lg">They feel seen. Part of something real</p>
            <p className="text-lg">More at home. More likely to return</p>
            <p className="text-lg">The power of word-of-mouth: fully amplified</p>
            <p className="text-lg">Higher ratings thanks to a memorable experience</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 1 - WE ARE ZERO RISK (moved after HAPPIER, MORE LOYAL GUESTS) */}
        <AccordionItem value="item-1" className="border-b border-fuchsia-400/30 mt-24">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WE ARE ZERO RISK
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">Zero upfront cost</p>
            <p className="text-lg">Zero monthly fees</p>
            <p className="text-lg">You don't change a thing</p>
            <p className="text-lg">You don't have to do a thing</p>
            <p className="text-lg">You just make HUGE PROFITS from your typically vacant rooms</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 3 */}
        <AccordionItem value="item-3" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WE FILL YOUR HOTEL
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-2">
            <p className="text-lg">On the smart way</p>
            <p className="text-lg">Longer stays + Fewer check-ins = Bigger Returns</p>
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
