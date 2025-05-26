import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsList } from "@/components/faq/BenefitsList";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { benefitsList, faqCategories, faqsByCategory } from "@/components/faq/faqData";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordionTab, setActiveAccordionTab] = useState(""); // Changed to empty string for collapsed state
  const isMobile = useIsMobile();

  const accordionOptions = [
    { id: "still-renting", label: "STILL RENTING?" },
    { id: "retired", label: "RETIRED?" },
    { id: "online-worker", label: "ONLINE WORKER?" },
    { id: "commuter", label: "COMMUTER?" },
    { id: "free-soul", label: "A FREE SOUL?" },
    { id: "hotel", label: "Hotel?" },
    { id: "society", label: "Society?" }
  ];

  const handleAccordionTabChange = (value: string) => {
    // If clicking the same tab that's already active, collapse it
    if (value === activeAccordionTab) {
      setActiveAccordionTab("");
    } else {
      setActiveAccordionTab(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16 bg-gradient-to-b from-[#570366]/40 to-transparent">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="space-y-4 mb-16">
            <div className="flex justify-center">
              <h2 className={`text-center font-bold ${isMobile ? "text-2xl" : "text-4xl"} text-[#FFF9B0] tracking-tight uppercase bg-[#8017B0] py-2 px-6 rounded-lg inline-block mx-auto`}>
                Step Into a New World of Benefits
              </h2>
            </div>
            <div className={`space-y-3 max-w-3xl mx-auto flex flex-col items-center ${isMobile ? "mt-12" : ""}`}>
              {benefitsList.map((benefit, index) => (
                <div key={index} className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
                  <p className={`text-[#8017B0] ${isMobile ? "text-xl" : "text-base"} font-bold`}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* First title - WHY HOTEL-LIVING? */}
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <h1 className={`
                ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} 
                font-bold mb-4 text-[#eedbf7] glow 
                tracking-tight leading-tight
                bg-[#8017B0] py-2 px-8 rounded-lg inline-block
              `}>
                WHY HOTEL-LIVING?
              </h1>
            </div>
          </div>

          {/* First Horizontal Accordion Menu */}
          <div className="mb-96">
            <Tabs value={activeAccordionTab} onValueChange={handleAccordionTabChange} className="w-full">
              <div className="flex justify-center mb-4">
                <TabsList className={`flex flex-wrap justify-center gap-1 p-1 bg-[#8017B0] rounded-xl border border-fuchsia-500/30 backdrop-blur-md ${isMobile ? "grid grid-cols-2 gap-1" : "grid grid-cols-7"}`}>
                  {accordionOptions.map((option) => (
                    <TabsTrigger 
                      key={option.id} 
                      value={option.id}
                      className={`px-2 uppercase whitespace-nowrap bg-[#8017B0] text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 text-justify rounded-lg py-0 font-medium ${isMobile ? "text-xs px-2 py-2" : "text-sm px-3 py-2"}`}
                    >
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {accordionOptions.map((option) => (
                <TabsContent key={option.id} value={option.id} className="mt-4">
                  <div className="bg-[#8017B0]/10 p-6 rounded-lg border border-[#8017B0]/30">
                    {option.id === "still-renting" ? (
                      <div className="space-y-18 text-yellow-300">
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why Rent a Flat When You Can Have Room Service?</p>
                          <p className="text-lg leading-relaxed">Why apply with endless requirements — when you could just check in and feel at home, instantly?</p>
                          <p className="text-lg leading-relaxed">Why pay a deposit — when you could pay for comfort, connection, and care?</p>
                          <p className="text-lg leading-relaxed">Why lock yourself into a year — when freedom lives in themed weeks with people like you?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why clean — when someone else takes care of that, so you can enjoy your time with others?</p>
                          <p className="text-lg leading-relaxed">Why give up comfort — when Hotel Living includes cleaning, smiles, and maybe a dinner invite?</p>
                          <p className="text-lg leading-relaxed">Why live alone — when you can live connected?</p>
                          <p className="text-lg leading-relaxed">Why settle for isolation — when your affinities may bring you closer to your tribe?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why live under inspection — when you could live with service and be treated like a guest?</p>
                          <p className="text-lg leading-relaxed">Why be far from life — when hotels bring the world (and people) to your doorstep?</p>
                          <p className="text-lg leading-relaxed">Why rent — when you could be hosted, welcomed, and even befriended?</p>
                          <p className="text-lg leading-relaxed">Why carry furniture — when your room is ready, your neighbors are interesting, and dinner is downstairs?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why chase landlords — when Hotel Living welcomes you, feeds you, and introduces you to new friends?</p>
                          <p className="text-lg leading-relaxed">Why eat alone — when you can share a table with people who get you?</p>
                          <p className="text-lg leading-relaxed">Why scroll through food delivery apps — when you have a restaurant steps away?</p>
                          <p className="text-lg leading-relaxed">Why get ten bills a month — when Hotel Living wraps it all into one simple stay?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why rent like it's 1999 — when Hotel Living is the future of staying?</p>
                        </div>
                      </div>
                    ) : option.id === "hotel" ? (
                      <div className="space-y-18 text-yellow-300">
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why ignore your most profitable guests — the ones who stay longer, spend more, and ask for less?</p>
                          <p className="text-lg leading-relaxed">Why leave untapped earnings on the table — when they add up to thousands per year?</p>
                          <p className="text-lg leading-relaxed">Why settle for weekends — when your rooms could be booked for the whole month?</p>
                          <p className="text-lg leading-relaxed">Why lose thousands every year — when your rooms could be working full-time for you?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why block a daily stream of gold — when it's already knocking at your door?</p>
                          <p className="text-lg leading-relaxed">Why keep rooms empty — when your fixed costs are already paid?</p>
                          <p className="text-lg leading-relaxed">Why accept less — when your hotel is capable of much more?</p>
                          <p className="text-lg leading-relaxed">Why watch money slip away — when you already have the space to earn it?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why leave your most profitable option off the table — year after year?</p>
                          <p className="text-lg leading-relaxed">Why choose unpredictability — when Hotel Living offers reliable monthly income?</p>
                          <p className="text-lg leading-relaxed">Why avoid your highest-profit formula — when you already own the rooms?</p>
                          <p className="text-lg leading-relaxed">Why close the door to a daily profit that needs no extra effort?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why walk past easy income — when long stays bring cash and calm together?</p>
                          <p className="text-lg leading-relaxed">Why settle for seasonal peaks — when steady profit is possible all year long?</p>
                          <p className="text-lg leading-relaxed">Why sacrifice your margins — when long stays reduce costs and boost returns?</p>
                          <p className="text-lg leading-relaxed">Why refuse a second revenue line — that runs quietly, every single day?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why overlook what's nearly 100% margin — day after day, month after month?</p>
                          <p className="text-lg leading-relaxed">Why limit yourself to room rates — when every guest can multiply your revenue?</p>
                          <p className="text-lg leading-relaxed">Why leave money on the table — when every square meter can be monetized?</p>
                          <p className="text-lg leading-relaxed">Why rely on last-minute bookings — when predictable income is one decision away?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why let profitability depend on chance — when you can make it predictable?</p>
                          <p className="text-lg leading-relaxed">Why let potential walk away — when one decision could change your numbers forever?</p>
                          <p className="text-lg leading-relaxed">Why operate below capacity — when full capacity brings exponential gains?</p>
                          <p className="text-lg leading-relaxed">Why think short-term — when long-stay strategies build long-term profit?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why stay in survival mode — when you could thrive?</p>
                          <p className="text-lg leading-relaxed">Why call it "just a room" — when it can become a daily profit engine?</p>
                          <p className="text-lg leading-relaxed">It's not a booking. It's a daily deposit of pure gain.</p>
                          <p className="text-lg leading-relaxed">This isn't passive income. It's golden income. And it's already yours.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">It's not extra — it's essential. And it's growing quietly each day.</p>
                          <p className="text-lg leading-relaxed">It's not professional to leave profit behind. It's not smart to underuse your own business.</p>
                          <p className="text-lg leading-relaxed">Why suffer the ups and downs of seasons — when you could be full all year?</p>
                          <p className="text-lg leading-relaxed">Why build your life around peaks and valleys — when consistent income is within reach?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why endure uncertainty — when long-term stays mean secure, recurring revenue?</p>
                          <p className="text-lg leading-relaxed">Why be reactive — when smart planning leads to financial peace?</p>
                          <p className="text-lg leading-relaxed">Why struggle for guests — when one strategic choice could fill your rooms effortlessly?</p>
                          <p className="text-lg leading-relaxed">Why train and fire — when stable bookings mean stable staff?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why chase guests every day — when one guest could stay for weeks?</p>
                          <p className="text-lg leading-relaxed">Why multiply your workload — when one long stay replaces ten check-ins?</p>
                          <p className="text-lg leading-relaxed">Why accept chaos — when long stays bring calm and clarity?</p>
                          <p className="text-lg leading-relaxed">Why settle for stress — when peace comes with every extended stay?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why host strangers for a night — when long-stay guests become part of your hotel's rhythm?</p>
                          <p className="text-lg leading-relaxed">Why host short-term noise — when you could welcome long-term value?</p>
                          <p className="text-lg leading-relaxed">Why fill the rooms once — when one good guest fills them again and again?</p>
                          <p className="text-lg leading-relaxed">Why rent rooms — when you could create an ecosystem?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why let your hotel sleep — when people are ready to live in it?</p>
                          <p className="text-lg leading-relaxed">Why limit your hotel — when it could become something greater?</p>
                          <p className="text-lg leading-relaxed">Why sell silence — when you could sell activity, energy, and engagement?</p>
                          <p className="text-lg leading-relaxed">Why be invisible to society — when you could be a local pillar of community living?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why sell nights — when you could sell belonging?</p>
                          <p className="text-lg leading-relaxed">Why make your life depend on seasons — when it could depend on stability?</p>
                          <p className="text-lg leading-relaxed">Why aim for full rooms — when you could aim for full lives inside them?</p>
                        </div>
                      </div>
                    ) : option.id === "society" ? (
                      <div className="space-y-18 text-yellow-300">
                        {/* Questions Section */}
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why keep old housing models for big families that don't exist anymore?</p>
                          <p className="text-lg leading-relaxed">Why keep needs and resources apart — when Hotel Living brings them together?</p>
                          <p className="text-lg leading-relaxed">Why build more — when we haven't aligned what we already have?</p>
                          <p className="text-lg leading-relaxed">Why suffer housing pressure — when the solution is already made, cleaned, and waiting?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why let rooms sit empty — when people sit waiting?</p>
                          <p className="text-lg leading-relaxed">Why keep so many people alone, using so many resources, when they may live efficiently and happier in convenient stays in hotels?</p>
                          <p className="text-lg leading-relaxed">Why leave city-center flats underused — when families live far from where they work?</p>
                          <p className="text-lg leading-relaxed">Why hoard empty square meters — when cities are crying out for space?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why accept wasted housing — when homes are needed more than ever?</p>
                          <p className="text-lg leading-relaxed">Why allow loneliness — when connection is just a door away?</p>
                          <p className="text-lg leading-relaxed">Why isolate so many people in almost empty apartments — when they could live among others, cared for and connected?</p>
                          <p className="text-lg leading-relaxed">Why keep hotels as dead space — when they could be alive with purpose?</p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-yellow-300/30 my-8"></div>

                        {/* We Statements Section */}
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed font-semibold">We realign society with how people actually live.</p>
                          <p className="text-lg leading-relaxed">We recognize a changing world — and redesign housing to match.</p>
                          <p className="text-lg leading-relaxed">We structure a smarter system for living, traveling, and working.</p>
                          <p className="text-lg leading-relaxed">We rethink hospitality to rebuild society.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We link needs, spaces, and people — all in one solution.</p>
                          <p className="text-lg leading-relaxed">We revitalize society by reimagining how we live.</p>
                          <p className="text-lg leading-relaxed">We transform social gaps into growth opportunities.</p>
                          <p className="text-lg leading-relaxed">We build systems that thrive even in crisis.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We fuel prosperity by uniting needs with solutions.</p>
                          <p className="text-lg leading-relaxed">We create value by connecting what's already here.</p>
                          <p className="text-lg leading-relaxed">We merge real estate with real humanity.</p>
                          <p className="text-lg leading-relaxed">We rethink the need to build more — and use better.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We enhance what already exists.</p>
                          <p className="text-lg leading-relaxed">We activate what society already has.</p>
                          <p className="text-lg leading-relaxed">We coordinate existing assets with modern challenges.</p>
                          <p className="text-lg leading-relaxed">We align empty resources with real human needs.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We bring idle resources to life.</p>
                          <p className="text-lg leading-relaxed">We boost real estate by aligning existing resources and social needs.</p>
                          <p className="text-lg leading-relaxed">We redefine real estate through human-centered use.</p>
                          <p className="text-lg leading-relaxed">We revive real estate by giving it purpose.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We assign purpose to every square meter.</p>
                          <p className="text-lg leading-relaxed">We energize unused properties with life and people.</p>
                          <p className="text-lg leading-relaxed">We convert underused buildings into social engines.</p>
                          <p className="text-lg leading-relaxed">We reimagine what a hotel can be.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We evolve empty hotels into living ecosystems.</p>
                          <p className="text-lg leading-relaxed">We convert hotels into community hubs.</p>
                          <p className="text-lg leading-relaxed">We breathe new purpose into every property.</p>
                          <p className="text-lg leading-relaxed">We transform empty rooms into social opportunities.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We turn empty rooms into vibrant communities.</p>
                          <p className="text-lg leading-relaxed">We reconnect people with the places they truly need.</p>
                          <p className="text-lg leading-relaxed">We connect modern lifestyles with meaningful purpose.</p>
                          <p className="text-lg leading-relaxed">We transition from old-fashioned living to forward-thinking communities.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We modernize society by modernizing how and where we live.</p>
                          <p className="text-lg leading-relaxed">We rethink housing for a mobile world.</p>
                          <p className="text-lg leading-relaxed">We design living models that follow your lifestyle.</p>
                          <p className="text-lg leading-relaxed">We understand movement — and build homes that move with you.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We provide places that travel with you — and still feel like home.</p>
                          <p className="text-lg leading-relaxed">We leave static models behind to embrace dynamic living.</p>
                          <p className="text-lg leading-relaxed">We shape homes for modern living.</p>
                          <p className="text-lg leading-relaxed">We adapt spaces to today's social needs.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We fix outdated housing models that no longer serve us.</p>
                          <p className="text-lg leading-relaxed">We rebuild human bonds in a fragmented world.</p>
                          <p className="text-lg leading-relaxed">We improve safety through trust and connection.</p>
                          <p className="text-lg leading-relaxed">We build spaces that foster togetherness.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We design social environments for peace of mind.</p>
                          <p className="text-lg leading-relaxed">We connect society by affinities, multiplying forces.</p>
                          <p className="text-lg leading-relaxed">We empower youth through purpose.</p>
                          <p className="text-lg leading-relaxed">We uplift youth through real opportunities.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We support talent with purpose-driven roles.</p>
                          <p className="text-lg leading-relaxed">We launch careers for the new generation.</p>
                          <p className="text-lg leading-relaxed">We generate impact by investing in young professionals.</p>
                          <p className="text-lg leading-relaxed">We open thousands of doors for tomorrow's leaders.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">We train the next wave of social leaders.</p>
                          <p className="text-lg leading-relaxed">We build real jobs on human connection.</p>
                          <p className="text-lg leading-relaxed">We convert passion into meaningful employment.</p>
                          <p className="text-lg leading-relaxed font-semibold">We introduce the Group Organizer — a new role for a new era.</p>
                        </div>
                      </div>
                    ) : option.id === "commuter" ? (
                      <div className="space-y-18 text-yellow-300">
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why lose hours in traffic when you could gain them in a theater?</p>
                          <p className="text-lg leading-relaxed">Why waste money on gas instead of investing in your life?</p>
                          <p className="text-lg leading-relaxed">Why spend two hours a day on the road when you could live downtown?</p>
                          <p className="text-lg leading-relaxed">Why live for the commute, not the experience?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why be a second-class citizen in your own city?</p>
                          <p className="text-lg leading-relaxed">Why always be arriving late when you could already be there?</p>
                          <p className="text-lg leading-relaxed">Why live among cars when you could live among cafés and bookstores?</p>
                          <p className="text-lg leading-relaxed">Why settle for traffic when you could choose pleasure?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why let your life depend on the train schedule?</p>
                          <p className="text-lg leading-relaxed">Why live in the waiting?</p>
                          <p className="text-lg leading-relaxed">Why flee each night from the place that inspires you by day?</p>
                          <p className="text-lg leading-relaxed">Why keep going back and forth when you could simply arrive — and stay?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why live far from your own plans?</p>
                          <p className="text-lg leading-relaxed">Why wake up far just to arrive late?</p>
                          <p className="text-lg leading-relaxed">Why pay for two lives when you only have one?</p>
                          <p className="text-lg leading-relaxed">Why sleep outside the world when you could live inside it?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why distance yourself from culture, art, and life?</p>
                          <p className="text-lg leading-relaxed">Why live far from where everything happens?</p>
                          <p className="text-lg leading-relaxed">Why live on the outskirts if you work in the heart?</p>
                          <p className="text-lg leading-relaxed">Why remain a daily visitor in the city that feeds you?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why not live where you truly live?</p>
                          <p className="text-lg leading-relaxed">Why pay rent where you aren't, when you could pay to live where you are?</p>
                          <p className="text-lg leading-relaxed">Why leave your time on the shoulder of the highway?</p>
                          <p className="text-lg leading-relaxed">Why live between two worlds when you can have one that has it all?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why be a daily visitor when you could be a free resident?</p>
                          <p className="text-lg leading-relaxed">Why stay in motion when you could stay at home?</p>
                          <p className="text-lg leading-relaxed">Why keep distance between you and your dreams?</p>
                          <p className="text-lg leading-relaxed">Why accept discomfort when Hotel Living exists?</p>
                        </div>
                      </div>
                    ) : option.id === "online-worker" ? (
                      <div className="space-y-18 text-yellow-300">
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why stay stuck in one place — when you could live freely from city to city, on your terms?</p>
                          <p className="text-lg leading-relaxed">Why tie yourself to one address — when the world is full of places waiting to feel like home?</p>
                          <p className="text-lg leading-relaxed">Why rent forever in one city — when you could rotate between countries, cultures, and communities?</p>
                          <p className="text-lg leading-relaxed">Why live one fixed life — when every few weeks can bring a whole new chapter?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why plan months ahead — when flexibility means staying as long as it feels right?</p>
                          <p className="text-lg leading-relaxed">Why live surrounded by the same stories — when you could collect new ones every month?</p>
                          <p className="text-lg leading-relaxed">Why keep meeting the same neighbors — when you could connect with creatives, travelers, and thinkers from around the world?</p>
                          <p className="text-lg leading-relaxed">Why unpack your suitcase for good — when life feels more alive with motion, meaning, and new people?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why pay ten bills — when Hotel Living gives you one price, zero stress, and full comfort?</p>
                          <p className="text-lg leading-relaxed">Why pay a deposit — when you could invest in fast Wi-Fi, real people, and shared experiences?</p>
                          <p className="text-lg leading-relaxed">Why rent — when you could be hosted in a place full of people just like you?</p>
                          <p className="text-lg leading-relaxed">Why apply with endless requirements — when you could just check in and instantly belong?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why rent like it's 1999 — when your office, your friends, and your next adventure are one check-in away?</p>
                          <p className="text-lg leading-relaxed">Why lock yourself into a year — when freedom means moving from city to city with your tribe?</p>
                          <p className="text-lg leading-relaxed">Why carry furniture — when your suite already knows what a digital nomad needs?</p>
                          <p className="text-lg leading-relaxed">Why clean — when someone else takes care of it while you meet inspiring people downstairs?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why give up comfort — when your room is cleaned, your workspace is ready, and the vibe is yours?</p>
                          <p className="text-lg leading-relaxed">Why live under inspection — when you could live with support, service, and no pressure?</p>
                          <p className="text-lg leading-relaxed">Why chase landlords — when Hotel Living gives you check-in, coffee, and colleagues in minutes?</p>
                          <p className="text-lg leading-relaxed">Why drift from place to place — when you can land in a home for your lifestyle?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why be far from life — when Hotel Living brings life, work, and connection under one roof?</p>
                          <p className="text-lg leading-relaxed">Why feel like the only one working — when your neighbors are designers, developers, and dreamers too?</p>
                          <p className="text-lg leading-relaxed">Why eat alone — when dinners become conversations, and strangers become collaborators?</p>
                          <p className="text-lg leading-relaxed">Why scroll through delivery apps — when you can share a table and a story?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why stay in a hotel full of strangers — when you could live in one where everyone gets you?</p>
                          <p className="text-lg leading-relaxed">Why settle for isolation — when affinities in hotels bring people like you together?</p>
                          <p className="text-lg leading-relaxed">Why live alone — when every hallway holds a new connection?</p>
                          <p className="text-lg leading-relaxed">Why wake up invisible — when Hotel Living makes you part of something?</p>
                        </div>
                      </div>
                    ) : option.id === "retired" ? (
                      <div className="space-y-18 text-yellow-300">
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why limit your life — when the world is waiting?</p>
                          <p className="text-lg leading-relaxed">Why stay in one place — when living in many keeps you young?</p>
                          <p className="text-lg leading-relaxed">Why shrink your life — when retirement is the time to expand it?</p>
                          <p className="text-lg leading-relaxed">Why live in one home — when you could live across cities, countries, cultures?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why settle for stillness — when movement brings back vitality?</p>
                          <p className="text-lg leading-relaxed">Why wait to feel alive — when your next journey starts at your door?</p>
                          <p className="text-lg leading-relaxed">Why choose routine — when you can choose adventure, elegance, surprise?</p>
                          <p className="text-lg leading-relaxed">Why be surrounded by the past — when you could build a present worth remembering?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why see the same faces — when every trip brings new stories?</p>
                          <p className="text-lg leading-relaxed">Why cling to comfort zones — when discovery is the true comfort of life?</p>
                          <p className="text-lg leading-relaxed">Why grow old quietly — when you can age joyfully, boldly, beautifully?</p>
                          <p className="text-lg leading-relaxed">Why dress down — when Hotel Living gives you reasons to dress up again?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why isolate yourself — when a vibrant life waits just outside your room?</p>
                          <p className="text-lg leading-relaxed">Why eat alone — when your table can be filled with new friends?</p>
                          <p className="text-lg leading-relaxed">Why wait for visits — when every hallway holds a friendly face?</p>
                          <p className="text-lg leading-relaxed">Why be invisible in your own home — when people greet you by name every morning?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why handle repairs, noise, or neighbors — when Hotel Living handles it all for you?</p>
                          <p className="text-lg leading-relaxed">Why keep a house empty — when you could rent it and fill your life instead?</p>
                          <p className="text-lg leading-relaxed">Why sleep behind a door — when Hotel Living offers 24/7 care and presence?</p>
                          <p className="text-lg leading-relaxed">Why risk silence — when help is just a knock away?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why worry about who's at your door — when hotel security already knows?</p>
                          <p className="text-lg leading-relaxed">Why stay behind closed doors — when safety, warmth, and care are built into Hotel Living?</p>
                          <p className="text-lg leading-relaxed">Why face emergencies alone — when trained staff are always nearby?</p>
                          <p className="text-lg leading-relaxed">Why worry about falls, breaks, or nights alone — when you're never truly alone again?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why live in fear — when someone always knows you're there, and cares that you are?</p>
                        </div>
                      </div>
                    ) : option.id === "free-soul" ? (
                      <div className="space-y-18 text-yellow-300">
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why stay stuck in one place — when you could live freely from city to city, on your terms?</p>
                          <p className="text-lg leading-relaxed">Why tie yourself to one address — when the world is full of places waiting to feel like home?</p>
                          <p className="text-lg leading-relaxed">Why live one fixed life — when every few weeks can bring a whole new chapter?</p>
                          <p className="text-lg leading-relaxed">Why rent forever in one city — when you could rotate between countries, cultures, and communities?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why plan months ahead — when flexibility means staying as long as it feels right?</p>
                          <p className="text-lg leading-relaxed">Why unpack your suitcase for good — when life feels more alive with motion, meaning, and new people?</p>
                          <p className="text-lg leading-relaxed">Why live surrounded by the same stories — when you could collect new ones every month?</p>
                          <p className="text-lg leading-relaxed">Why keep meeting the same neighbors — when you could connect with creatives, travelers, and thinkers from around the world?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why shrink your life — when retirement is the time to expand it?</p>
                          <p className="text-lg leading-relaxed">Why grow old quietly — when you can age joyfully, boldly, beautifully?</p>
                          <p className="text-lg leading-relaxed">Why limit your life — when the world is waiting?</p>
                          <p className="text-lg leading-relaxed">Why stay in one place — when living in many keeps you young?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why live in one home — when you could live across cities, countries, cultures?</p>
                          <p className="text-lg leading-relaxed">Why settle for stillness — when movement brings back vitality?</p>
                          <p className="text-lg leading-relaxed">Why wake up invisible — when Hotel Living makes you part of something?</p>
                          <p className="text-lg leading-relaxed">Why cling to comfort zones — when discovery is the true comfort of life?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why be surrounded by the past — when you could build a present worth remembering?</p>
                          <p className="text-lg leading-relaxed">Why choose routine — when you can choose adventure, elegance, surprise?</p>
                          <p className="text-lg leading-relaxed">Why dress down — when Hotel Living gives you reasons to dress up again?</p>
                          <p className="text-lg leading-relaxed">Why drift from place to place — when you can land in a home for your lifestyle?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why be far from life — when hotels bring the world (and people) to your doorstep?</p>
                          <p className="text-lg leading-relaxed">Why rent — when you could be hosted, welcomed, and even befriended?</p>
                          <p className="text-lg leading-relaxed">Why stay in a hotel full of strangers — when you could live in one where everyone gets you?</p>
                          <p className="text-lg leading-relaxed">Why settle for isolation — when your affinities may bring you closer to your tribe?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why live alone — when every hallway holds a new connection?</p>
                          <p className="text-lg leading-relaxed">Why wait to feel alive — when your next journey starts at your door?</p>
                          <p className="text-lg leading-relaxed">Why eat alone — when your table can be filled with new friends?</p>
                          <p className="text-lg leading-relaxed">Why scroll through delivery apps — when you can share a table and a story?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg leading-relaxed">Why feel like the only one working — when your neighbors are designers, developers, and dreamers too?</p>
                          <p className="text-lg leading-relaxed">This is not just accommodation — it's a lifestyle for those who live by inspiration, not by obligation.</p>
                          <p className="text-lg leading-relaxed">This is Hotel Living. Where the world is home. And freedom is the only address.</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-white text-center">
                        Content for {option.label} will be populated later.
                      </p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Second title - Frequently Asked Questions */}
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <h1 className={`
                ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} 
                font-bold mb-4 text-[#eedbf7] glow 
                tracking-tight leading-tight
                bg-[#8017B0] py-2 px-8 rounded-lg inline-block
              `}>
                Frequently Asked Questions
              </h1>
            </div>
            <p className={`${isMobile ? "text-xl" : "text-base"} font-medium text-[#e3d6e9] mb-6`}>
              Find answers to common questions
            </p>
            
            <FaqSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search all FAQs..." />
          </div>

          <FaqTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            faqCategories={faqCategories} 
            faqsByCategory={faqsByCategory} 
            numbered={true} 
            searchQuery={searchQuery} 
            textSizeClass="text-base md:text-lg" 
            answerTextSizeClass="text-sm md:text-base" 
            marginBottom={isMobile ? "mb-10" : "mb-20"} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
