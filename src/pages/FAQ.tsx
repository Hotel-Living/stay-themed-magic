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
  const [activeAccordionTab, setActiveAccordionTab] = useState("still-renting");
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

  return (
    <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16 bg-gradient-to-b from-[#570366]/40 to-transparent">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="space-y-4 mb-16">
            <div className="flex justify-center">
              <h2 className={`text-center font-bold ${isMobile ? "text-2xl" : "text-4xl mb-10"} text-[#FFF9B0] tracking-tight uppercase bg-[#8017B0] py-2 px-6 rounded-lg inline-block mx-auto`}>
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
          <div className="mb-8">
            <Tabs value={activeAccordionTab} onValueChange={setActiveAccordionTab} className="w-full">
              <div className="flex justify-center mb-4">
                <TabsList className={`flex flex-wrap justify-center gap-1 p-1 bg-[#996515]/50 rounded-xl border border-fuchsia-500/30 backdrop-blur-md ${isMobile ? "grid grid-cols-2 gap-1" : "grid grid-cols-7"}`}>
                  {accordionOptions.map((option) => (
                    <TabsTrigger 
                      key={option.id} 
                      value={option.id}
                      className={`px-2 uppercase whitespace-nowrap bg-gradient-to-r from-[#996515] to-[#996515] text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 text-justify rounded-lg py-0 font-medium ${isMobile ? "text-xs px-2 py-2" : "text-sm px-3 py-2"}`}
                    >
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {accordionOptions.map((option) => (
                <TabsContent key={option.id} value={option.id} className="mt-4">
                  <div className="bg-[#8017B0]/10 p-6 rounded-lg border border-[#8017B0]/30">
                    {option.id === "society" ? (
                      <div className="space-y-6 text-[#FFF9B0]">
                        {/* Questions Section */}
                        <div className="space-y-3">
                          <p className="text-lg leading-relaxed">Why keep old housing models for big families that don't exist anymore?</p>
                          <p className="text-lg leading-relaxed">Why keep needs and resources apart — when Hotel Living brings them together?</p>
                          <p className="text-lg leading-relaxed">Why build more — when we haven't aligned what we already have?</p>
                          <p className="text-lg leading-relaxed">Why suffer housing pressure — when the solution is already made, cleaned, and waiting?</p>
                          <p className="text-lg leading-relaxed">Why let rooms sit empty — when people sit waiting?</p>
                          <p className="text-lg leading-relaxed">Why keep so many people alone, using so many resources, when they may live efficiently and happier in convenient stays in hotels?</p>
                          <p className="text-lg leading-relaxed">Why leave city-center flats underused — when families live far from where they work?</p>
                          <p className="text-lg leading-relaxed">Why hoard empty square meters — when cities are crying out for space?</p>
                          <p className="text-lg leading-relaxed">Why accept wasted housing — when homes are needed more than ever?</p>
                          <p className="text-lg leading-relaxed">Why allow loneliness — when connection is just a door away?</p>
                          <p className="text-lg leading-relaxed">Why isolate so many people in almost empty apartments — when they could live among others, cared for and connected?</p>
                          <p className="text-lg leading-relaxed">Why keep hotels as dead space — when they could be alive with purpose?</p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#FFF9B0]/30 my-8"></div>

                        {/* We Statements Section */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-3">
                            <p className="text-lg leading-relaxed font-semibold">We realign society with how people actually live.</p>
                            <p className="text-lg leading-relaxed">We recognize a changing world — and redesign housing to match.</p>
                            <p className="text-lg leading-relaxed">We structure a smarter system for living, traveling, and working.</p>
                            <p className="text-lg leading-relaxed">We rethink hospitality to rebuild society.</p>
                            <p className="text-lg leading-relaxed">We link needs, spaces, and people — all in one solution.</p>
                            <p className="text-lg leading-relaxed">We revitalize society by reimagining how we live.</p>
                            <p className="text-lg leading-relaxed">We transform social gaps into growth opportunities.</p>
                            <p className="text-lg leading-relaxed">We build systems that thrive even in crisis.</p>
                            <p className="text-lg leading-relaxed">We fuel prosperity by uniting needs with solutions.</p>
                            <p className="text-lg leading-relaxed">We create value by connecting what's already here.</p>
                            <p className="text-lg leading-relaxed">We merge real estate with real humanity.</p>
                            <p className="text-lg leading-relaxed">We rethink the need to build more — and use better.</p>
                            <p className="text-lg leading-relaxed">We enhance what already exists.</p>
                            <p className="text-lg leading-relaxed">We activate what society already has.</p>
                            <p className="text-lg leading-relaxed">We coordinate existing assets with modern challenges.</p>
                            <p className="text-lg leading-relaxed">We align empty resources with real human needs.</p>
                            <p className="text-lg leading-relaxed">We bring idle resources to life.</p>
                            <p className="text-lg leading-relaxed">We boost real estate by aligning existing resources and social needs.</p>
                            <p className="text-lg leading-relaxed">We redefine real estate through human-centered use.</p>
                            <p className="text-lg leading-relaxed">We revive real estate by giving it purpose.</p>
                            <p className="text-lg leading-relaxed">We assign purpose to every square meter.</p>
                            <p className="text-lg leading-relaxed">We energize unused properties with life and people.</p>
                            <p className="text-lg leading-relaxed">We convert underused buildings into social engines.</p>
                            <p className="text-lg leading-relaxed">We reimagine what a hotel can be.</p>
                            <p className="text-lg leading-relaxed">We evolve empty hotels into living ecosystems.</p>
                            <p className="text-lg leading-relaxed">We convert hotels into community hubs.</p>
                            <p className="text-lg leading-relaxed">We breathe new purpose into every property.</p>
                            <p className="text-lg leading-relaxed">We transform empty rooms into social opportunities.</p>
                            <p className="text-lg leading-relaxed">We turn empty rooms into vibrant communities.</p>
                            <p className="text-lg leading-relaxed">We reconnect people with the places they truly need.</p>
                            <p className="text-lg leading-relaxed">We connect modern lifestyles with meaningful purpose.</p>
                            <p className="text-lg leading-relaxed">We transition from old-fashioned living to forward-thinking communities.</p>
                            <p className="text-lg leading-relaxed">We modernize society by modernizing how and where we live.</p>
                            <p className="text-lg leading-relaxed">We rethink housing for a mobile world.</p>
                            <p className="text-lg leading-relaxed">We design living models that follow your lifestyle.</p>
                            <p className="text-lg leading-relaxed">We understand movement — and build homes that move with you.</p>
                            <p className="text-lg leading-relaxed">We provide places that travel with you — and still feel like home.</p>
                            <p className="text-lg leading-relaxed">We leave static models behind to embrace dynamic living.</p>
                            <p className="text-lg leading-relaxed">We shape homes for modern living.</p>
                            <p className="text-lg leading-relaxed">We adapt spaces to today's social needs.</p>
                            <p className="text-lg leading-relaxed">We fix outdated housing models that no longer serve us.</p>
                            <p className="text-lg leading-relaxed">We rebuild human bonds in a fragmented world.</p>
                            <p className="text-lg leading-relaxed">We improve safety through trust and connection.</p>
                            <p className="text-lg leading-relaxed">We build spaces that foster togetherness.</p>
                            <p className="text-lg leading-relaxed">We design social environments for peace of mind.</p>
                            <p className="text-lg leading-relaxed">We connect society by affinities, multiplying forces.</p>
                            <p className="text-lg leading-relaxed">We empower youth through purpose.</p>
                            <p className="text-lg leading-relaxed">We uplift youth through real opportunities.</p>
                            <p className="text-lg leading-relaxed">We support talent with purpose-driven roles.</p>
                            <p className="text-lg leading-relaxed">We launch careers for the new generation.</p>
                            <p className="text-lg leading-relaxed">We generate impact by investing in young professionals.</p>
                            <p className="text-lg leading-relaxed">We open thousands of doors for tomorrow's leaders.</p>
                            <p className="text-lg leading-relaxed">We train the next wave of social leaders.</p>
                            <p className="text-lg leading-relaxed">We build real jobs on human connection.</p>
                            <p className="text-lg leading-relaxed">We convert passion into meaningful employment.</p>
                            <p className="text-lg leading-relaxed font-semibold">We introduce the Group Organizer — a new role for a new era.</p>
                          </div>
                        </div>
                      </div>
                    ) : option.id === "commuter" ? (
                      <div className="space-y-4 text-[#FFF9B0]">
                        <p className="text-lg leading-relaxed">Why lose hours in traffic when you could gain them in a theater?</p>
                        <p className="text-lg leading-relaxed">Why waste money on gas instead of investing in your life?</p>
                        <p className="text-lg leading-relaxed">Why spend two hours a day on the road when you could live downtown?</p>
                        <p className="text-lg leading-relaxed">Why live for the commute, not the experience?</p>
                        <p className="text-lg leading-relaxed">Why be a second-class citizen in your own city?</p>
                        <p className="text-lg leading-relaxed">Why always be arriving late when you could already be there?</p>
                        <p className="text-lg leading-relaxed">Why live among cars when you could live among cafés and bookstores?</p>
                        <p className="text-lg leading-relaxed">Why settle for traffic when you could choose pleasure?</p>
                        <p className="text-lg leading-relaxed">Why let your life depend on the train schedule?</p>
                        <p className="text-lg leading-relaxed">Why live in the waiting?</p>
                        <p className="text-lg leading-relaxed">Why flee each night from the place that inspires you by day?</p>
                        <p className="text-lg leading-relaxed">Why keep going back and forth when you could simply arrive — and stay?</p>
                        <p className="text-lg leading-relaxed">Why live far from your own plans?</p>
                        <p className="text-lg leading-relaxed">Why wake up far just to arrive late?</p>
                        <p className="text-lg leading-relaxed">Why pay for two lives when you only have one?</p>
                        <p className="text-lg leading-relaxed">Why sleep outside the world when you could live inside it?</p>
                        <p className="text-lg leading-relaxed">Why distance yourself from culture, art, and life?</p>
                        <p className="text-lg leading-relaxed">Why live far from where everything happens?</p>
                        <p className="text-lg leading-relaxed">Why live on the outskirts if you work in the heart?</p>
                        <p className="text-lg leading-relaxed">Why remain a daily visitor in the city that feeds you?</p>
                        <p className="text-lg leading-relaxed">Why not live where you truly live?</p>
                        <p className="text-lg leading-relaxed">Why pay rent where you aren't, when you could pay to live where you are?</p>
                        <p className="text-lg leading-relaxed">Why leave your time on the shoulder of the highway?</p>
                        <p className="text-lg leading-relaxed">Why live between two worlds when you can have one that has it all?</p>
                        <p className="text-lg leading-relaxed">Why be a daily visitor when you could be a free resident?</p>
                        <p className="text-lg leading-relaxed">Why stay in motion when you could stay at home?</p>
                        <p className="text-lg leading-relaxed">Why keep distance between you and your dreams?</p>
                        <p className="text-lg leading-relaxed">Why accept discomfort when Hotel Living exists?</p>
                      </div>
                    ) : option.id === "online-worker" ? (
                      <div className="space-y-4 text-[#FFF9B0]">
                        <p className="text-lg leading-relaxed">Why stay stuck in one place — when you could live freely from city to city, on your terms?</p>
                        <p className="text-lg leading-relaxed">Why tie yourself to one address — when the world is full of places waiting to feel like home?</p>
                        <p className="text-lg leading-relaxed">Why rent forever in one city — when you could rotate between countries, cultures, and communities?</p>
                        <p className="text-lg leading-relaxed">Why live one fixed life — when every few weeks can bring a whole new chapter?</p>
                        <p className="text-lg leading-relaxed">Why plan months ahead — when flexibility means staying as long as it feels right?</p>
                        <p className="text-lg leading-relaxed">Why live surrounded by the same stories — when you could collect new ones every month?</p>
                        <p className="text-lg leading-relaxed">Why keep meeting the same neighbors — when you could connect with creatives, travelers, and thinkers from around the world?</p>
                        <p className="text-lg leading-relaxed">Why unpack your suitcase for good — when life feels more alive with motion, meaning, and new people?</p>
                        <p className="text-lg leading-relaxed">Why pay ten bills — when Hotel Living gives you one price, zero stress, and full comfort?</p>
                        <p className="text-lg leading-relaxed">Why pay a deposit — when you could invest in fast Wi-Fi, real people, and shared experiences?</p>
                        <p className="text-lg leading-relaxed">Why rent — when you could be hosted in a place full of people just like you?</p>
                        <p className="text-lg leading-relaxed">Why apply with endless requirements — when you could just check in and instantly belong?</p>
                        <p className="text-lg leading-relaxed">Why rent like it's 1999 — when your office, your friends, and your next adventure are one check-in away?</p>
                        <p className="text-lg leading-relaxed">Why lock yourself into a year — when freedom means moving from city to city with your tribe?</p>
                        <p className="text-lg leading-relaxed">Why carry furniture — when your suite already knows what a digital nomad needs?</p>
                        <p className="text-lg leading-relaxed">Why clean — when someone else takes care of it while you meet inspiring people downstairs?</p>
                        <p className="text-lg leading-relaxed">Why give up comfort — when your room is cleaned, your workspace is ready, and the vibe is yours?</p>
                        <p className="text-lg leading-relaxed">Why live under inspection — when you could live with support, service, and no pressure?</p>
                        <p className="text-lg leading-relaxed">Why chase landlords — when Hotel Living gives you check-in, coffee, and colleagues in minutes?</p>
                        <p className="text-lg leading-relaxed">Why drift from place to place — when you can land in a home for your lifestyle?</p>
                        <p className="text-lg leading-relaxed">Why be far from life — when Hotel Living brings life, work, and connection under one roof?</p>
                        <p className="text-lg leading-relaxed">Why feel like the only one working — when your neighbors are designers, developers, and dreamers too?</p>
                        <p className="text-lg leading-relaxed">Why eat alone — when dinners become conversations, and strangers become collaborators?</p>
                        <p className="text-lg leading-relaxed">Why scroll through delivery apps — when you can share a table and a story?</p>
                        <p className="text-lg leading-relaxed">Why stay in a hotel full of strangers — when you could live in one where everyone gets you?</p>
                        <p className="text-lg leading-relaxed">Why settle for isolation — when affinities in hotels bring people like you together?</p>
                        <p className="text-lg leading-relaxed">Why live alone — when every hallway holds a new connection?</p>
                        <p className="text-lg leading-relaxed">Why wake up invisible — when Hotel Living makes you part of something?</p>
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
