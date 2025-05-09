
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AffinityAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-3"
      >
        {/* NEW MENU ITEM */}
        <AccordionItem value="item-0" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              What are Affinity Hotels?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              <p className="text-lg">Affinity Hotels are a registered concept created exclusively by hotel-living.com.</p>
              <p className="text-lg mt-2">This unique idea—protected by copyright—was designed by us to bring people together around shared interests.</p>
              <p className="text-lg mt-2">Affinity Hotels are a lot more than just travel: it's a new way for society to connect, for individuals to meet like-minded people, and for many to break through social isolation.</p>
              <p className="text-lg mt-2">Affinity Hotels make it easy to find common ground, community, and real human connection.</p>
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 1 */}
        <AccordionItem value="item-1" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Tired of traveling alone? Want to meet people who just get you?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Affinity Hotels by Hotel-Living.com are the perfect way to connect with others who share your passions—from astronomy to opera, from salsa dancing to stamp collecting. No awkward small talk—just real connection from day one.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 2 */}
        <AccordionItem value="item-2" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              What exactly is an Affinity Hotel?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              It's a Hotel-Living hotel where everyone staying shares a common interest. Whether it's jazz, gardening, philosophy, or photography, you'll find people who speak your language—no matter where you're from.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 3 */}
        <AccordionItem value="item-3" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Will I make friends?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Chances are, yes. When people gather around something they love, friendships happen naturally. Many guests leave with new friends—and some even return together.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Does the hotel organize activities?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Some do, especially for more hands-on interests like dance or hiking. But in most cases, the magic happens naturally. The hotel sets the theme—you and your fellow guests make the experience your own.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Is there always a group leader or host?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Not necessarily. Some hotels may offer a coordinator, others are more free-flow. It's up to the hotel and the affinity. But guests often organize spontaneous meetups, outings, or dinners.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Is the hotel decorated around the theme?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Not usually. This isn't a theme park—it's about real people, not themed decor. The focus is human connection through shared passion.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-7" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              How long are the stays?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Choose from fixed stays of 8, 16, 24, or 32 days. Just long enough to connect, unwind, and maybe even change your perspective.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Can I try different affinities in different hotels?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Absolutely. You can explore different passions in different locations, all within the Affinity Hotels by Hotel-Living.com network.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              What if I just want to relax?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              No pressure. Whether you join every dinner or simply enjoy the atmosphere, the experience is yours to shape.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Is this for solo travelers only?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Not at all. Come alone, with a friend, or as a couple—Affinity Hotels are for anyone who wants to share meaningful time with others who enjoy the same things.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              What if I don't find a theme that fits my interest yet?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Hotel-Living.com's Affinity Hotels are just getting started, and new themes will be added regularly as more hotels join the network. Even if your perfect theme isn't there yet, every stay is already designed for people who want to meet others and enjoy meaningful time together.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-12" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Are the affinity themes available at every hotel right now?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Not yet. Themes will grow gradually as more hotels join and define their own focus. But no matter the theme—or even without one—you'll find guests who are open, curious, and looking to connect. That's the spirit of Hotel Living.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger 
            className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
          >
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Can I still make connections even if there's no specific theme?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <p className="text-[#FFF9B0] text-sm md:text-base leading-relaxed">
              Absolutely. Everyone at a Hotel Living stay has chosen this experience because they want more than just a place to sleep. It's easy to meet people, share meals, talk, and build friendships—theme or no theme.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
