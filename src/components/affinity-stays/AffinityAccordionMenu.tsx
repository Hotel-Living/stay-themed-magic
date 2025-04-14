import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AffinityAccordionMenu() {
  return (
    <div className="pt-6 mb-12 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6">
      <Accordion 
        type="single" 
        collapsible 
        className="w-full"
      >
        {/* NEW MENU ITEM */}
        <AccordionItem value="item-0" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            What are Affinity Hotels?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Affinity Hotels are a registered concept created exclusively by hotel-living.com.</p>
            <p className="text-lg mt-2">This unique idea—protected by copyright—was designed by us to bring people together around shared interests.</p>
            <p className="text-lg mt-2">Affinity Hotels are a lot more than just travel: it's a new way for society to connect, for individuals to meet like-minded people, and for many to break through social isolation.</p>
            <p className="text-lg mt-2">Affinity Hotels make it easy to find common ground, community, and real human connection.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 1 */}
        <AccordionItem value="item-1" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Tired of traveling alone? Want to meet people who just get you?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Affinity Hotels by Hotel-Living.com are the perfect way to connect with others who share your passions—from astronomy to opera, from salsa dancing to stamp collecting. No awkward small talk—just real connection from day one.</p>
          </AccordionContent>
        </AccordionItem>

        {/* MENU 2 */}
        <AccordionItem value="item-2" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            What exactly is an Affinity Hotel?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">It's a Hotel-Living hotel where everyone staying shares a common interest. Whether it's jazz, gardening, philosophy, or photography, you'll find people who speak your language—no matter where you're from.</p>
          </AccordionContent>
        </AccordionItem>
        
        {/* MENU 3 */}
        <AccordionItem value="item-3" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Will I make friends?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Chances are, yes. When people gather around something they love, friendships happen naturally. Many guests leave with new friends—and some even return together.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Does the hotel organize activities?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Some do, especially for more hands-on interests like dance or hiking. But in most cases, the magic happens naturally. The hotel sets the theme—you and your fellow guests make the experience your own.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Is there always a group leader or host?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not necessarily. Some hotels may offer a coordinator, others are more free-flow. It's up to the hotel and the affinity. But guests often organize spontaneous meetups, outings, or dinners.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Is the hotel decorated around the theme?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not usually. This isn't a theme park—it's about real people, not themed decor. The focus is human connection through shared passion.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-7" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            How long are the stays?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Choose from fixed stays of 8, 16, 24, or 32 days. Just long enough to connect, unwind, and maybe even change your perspective.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Can I try different affinities in different hotels?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Absolutely. You can explore different passions in different locations, all within the Affinity Hotels by Hotel-Living.com network.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            What if I just want to relax?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">No pressure. Whether you join every dinner or simply enjoy the atmosphere, the experience is yours to shape.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Is this for solo travelers only?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not at all. Come alone, with a friend, or as a couple—Affinity Hotels are for anyone who wants to share meaningful time with others who enjoy the same things.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            What if I don't find a theme that fits my interest yet?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Hotel-Living.com's Affinity Hotels are just getting started, and new themes will be added regularly as more hotels join the network. Even if your perfect theme isn't there yet, every stay is already designed for people who want to meet others and enjoy meaningful time together.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-12" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Are the affinity themes available at every hotel right now?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Not yet. Themes will grow gradually as more hotels join and define their own focus. But no matter the theme—or even without one—you'll find guests who are open, curious, and looking to connect. That's the spirit of Hotel Living.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13" className="border-b border-fuchsia-400/30">
          <AccordionTrigger 
            className="text-xl font-bold text-white hover:text-yellow-100 py-4"
          >
            Can I still make connections even if there's no specific theme?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <p className="text-lg">Absolutely. Everyone at a Hotel Living stay has chosen this experience because they want more than just a place to sleep. It's easy to meet people, share meals, talk, and build friendships—theme or no theme.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
