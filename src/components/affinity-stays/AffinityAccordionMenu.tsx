
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AffinityAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {/* MENU 1 */}
        <AccordionItem value="item-1" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            TIRED OF TRAVELING ALONE? WANT TO MEET PEOPLE WHO JUST GET YOU?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Affinity Hotels by Hotel Diving are the perfect way to connect with others who share your passions—from astronomy to opera, from salsa dancing to stamp collecting. No awkward small talk—just real connection from day one.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 2 */}
        <AccordionItem value="item-2" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WHAT EXACTLY IS AN AFFINITY HOTEL?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">It's a hotel where everyone staying shares a common interest. Whether it's jazz, gardening, philosophy, or photography, you'll find people who speak your language—no matter where you're from.</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 3 */}
        <AccordionItem value="item-3" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WILL I MAKE FRIENDS?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Chances are, yes. When people gather around something they love, friendships happen naturally. Many guests leave with new friends—and some even return together.</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 4 */}
        <AccordionItem value="item-4" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            DOES THE HOTEL ORGANIZE ACTIVITIES?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Some do, especially for more hands-on interests like dance or hiking. But in most cases, the magic happens naturally. The hotel sets the theme—you and your fellow guests make the experience your own.</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 5 */}
        <AccordionItem value="item-5" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            IS THERE ALWAYS A GROUP LEADER OR HOST?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not necessarily. Some hotels may offer a coordinator, others are more free-flow. It's up to the hotel and the affinity. But guests often organize spontaneous meetups, outings, or dinners.</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 6 */}
        <AccordionItem value="item-6" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            IS THE HOTEL DECORATED AROUND THE THEME?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not usually. This isn't a theme park—it's about real people, not themed decor. The focus is human connection through shared passion.</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 7 */}
        <AccordionItem value="item-7" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            HOW LONG ARE THE STAYS?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Choose from fixed stays of 8, 16, 24, or 32 days. Just long enough to connect, unwind, and maybe even change your perspective.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 8 */}
        <AccordionItem value="item-8" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            CAN I TRY DIFFERENT AFFINITIES IN DIFFERENT HOTELS?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Absolutely. You can explore different passions in different locations, all within the Affinity Hotels by Hotel Diving network.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 9 */}
        <AccordionItem value="item-9" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WHAT IF I JUST WANT TO RELAX?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">No pressure. Whether you join every dinner or simply enjoy the atmosphere, the experience is yours to shape.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 10 */}
        <AccordionItem value="item-10" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            IS THIS FOR SOLO TRAVELERS ONLY?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not at all. Come alone, with a friend, or as a couple—Affinity Hotels are for anyone who wants to share meaningful time with others who enjoy the same things.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 11 */}
        <AccordionItem value="item-11" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            WHAT IF I DON'T FIND A THEME THAT FITS MY INTEREST YET?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Hotel Diving's Affinity Hotels are just getting started, and new themes will be added regularly as more hotels join the network. Even if your perfect theme isn't there yet, every stay is already designed for people who want to meet others and enjoy meaningful time together.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 12 */}
        <AccordionItem value="item-12" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            ARE THE AFFINITY THEMES AVAILABLE AT EVERY HOTEL RIGHT NOW?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not yet. Themes will grow gradually as more hotels join and define their own focus. But no matter the theme—or even without one—you'll find guests who are open, curious, and looking to connect. That's the spirit of Hotel Living.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 13 */}
        <AccordionItem value="item-13" className="border-b border-fuchsia-400/30">
          <AccordionTrigger className="text-xl font-bold text-white hover:text-yellow-300 py-4">
            CAN I STILL MAKE CONNECTIONS EVEN IF THERE'S NO SPECIFIC THEME?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Absolutely. Everyone at a Hotel Living stay has chosen this experience because they want more than just a place to sleep. It's easy to meet people, share meals, talk, and build friendships—theme or no theme.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
